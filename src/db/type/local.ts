import AsyncStorage from "@react-native-async-storage/async-storage";
import { Database } from "../utils";

interface RecordType {
  id: string;
  [key: string]: any;
}

export default class LocalDb extends Database {
  constructor() {
    super();
  }

  private async getTableData(table: string): Promise<RecordType[]> {
    const data = await AsyncStorage.getItem(table);
    return data ? JSON.parse(data) : [];
  }

  private async setTableData(table: string, data: RecordType[]): Promise<void> {
    await AsyncStorage.setItem(table, JSON.stringify(data));
  }

  public async findAll(table: string): Promise<RecordType[]> {
    return this.getTableData(table);
  }

  public async findOne(
    table: string,
    id: string
  ): Promise<RecordType | undefined> {
    const records = await this.getTableData(table);
    return records.find((record) => record.id === id);
  }

  public async insert(table: string, data: RecordType): Promise<void> {
    const records = await this.getTableData(table);
    records.push(data);
    await this.setTableData(table, records);
  }

  public async update(table: string, data: RecordType): Promise<void> {
    const records = await this.getTableData(table);
    const index = records.findIndex((record) => record.id === data.id);

    if (index !== -1) {
      records[index] = { ...records[index], ...data };
      await this.setTableData(table, records);
    } else {
      throw new Error(`Record with id ${data.id} not found.`);
    }
  }

  public async delete(table: string, id: string): Promise<void> {
    const records = await this.getTableData(table);
    const filteredRecords = records.filter((record) => record.id !== id);
    await this.setTableData(table, filteredRecords);
  }
}
