export interface IRepository<T> {
  create(data: Partial<T>): Promise<T>
  findAll(): Promise<T[]>
  findById(id: string): Promise<T | null>
  delete(id: string): Promise<void>
}
