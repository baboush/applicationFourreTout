export interface BaseCudService {
  create(data: unknown): Promise<unknown>;
  delete(id: number): Promise<unknown>;
  update(id: number): Promise<unknown>;
}
