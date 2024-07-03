export interface BaseController<T> {
  deleteEntity(id: number): Promise<boolean>;
}
