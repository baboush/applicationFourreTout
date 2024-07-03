export interface BaseService<T> {
  deleteEntity(id: number): Promise<boolean>;
}
