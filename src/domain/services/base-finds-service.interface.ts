export interface BaseFindsService {
  findAll(): Promise<unknown>;
  findByOne(data: unknown): Promise<unknown>;
  findOrderByDate(): Promise<unknown>;
}
