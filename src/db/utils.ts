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

  insert(data: T): Promise<void> {
    return this.db.insert(this.table, data);
  }

  update(data: unknown): Promise<void> {
    return this.db.update(this.table, data);
  }

  delete(id: string): Promise<void> {
    return this.db.delete(this.table, id);
  }
}
