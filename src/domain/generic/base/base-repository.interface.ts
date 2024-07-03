export interface BaseRepository<T> {
  deleteEntity(id: number): Promise<boolean>;
}
