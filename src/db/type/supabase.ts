import { Database } from "../utils";

export default class LocalDb extends Database {
  public findAll(table: string): Promise<Array<unknown>> {
    throw new Error("Method not implemented.");
  }
  public findOne(table: string, id: string): Promise<unknown> {
    throw new Error("Method not implemented.");
  }
  public insert(table: string, data: unknown): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public update(table: string, data: unknown): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public delete(table: string, id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
