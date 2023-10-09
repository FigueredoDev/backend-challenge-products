export interface DeleteProductUseCaseInterface {
  execute(id: string): Promise<void>;
}
