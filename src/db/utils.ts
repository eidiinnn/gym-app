import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";

export abstract class Database {
  constructor() {}

  public abstract findAll(table: string): Promise<Array<unknown>>;
  public abstract findOne(table: string, id: string): Promise<unknown>;
  public abstract insert(table: string, data: unknown): Promise<void>;
  public abstract update(table: string, data: unknown): Promise<void>;
  public abstract delete(table: string, id: string): Promise<void>;
}

export class Table<T extends Object> {
  private db: Database;
  private table: string;

  constructor(table: string, db: Database) {
    this.table = table;
    this.db = db;
  }

  async findAll(): Promise<Array<T>> {
    return (await this.db.findAll(this.table)) as Array<T>;
  }

  async findOne(id: string): Promise<T> {
    return (await this.db.findOne(this.table, id)) as T;
  }

  async insert(data: Omit<T, "id">): Promise<T> {
    const dataWithId = { id: uuidv4(), ...data } as unknown as T;
    await this.db.insert(this.table, dataWithId);
    return dataWithId;
  }

  update(data: unknown): Promise<void> {
    return this.db.update(this.table, data);
  }

  delete(id: string): Promise<void> {
    return this.db.delete(this.table, id);
  }
}
