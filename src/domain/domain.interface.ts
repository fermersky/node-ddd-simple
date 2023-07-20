export interface IRepository<T> {
  getAll(): Promise<T[]>;
  // ...other generic repository methods
}
