import { DirectoryOrangeServiceRepository } from "@/api/services/directory/DirectoryOrangeServiceRepository";
import {
  DirectoryOrangeApi,
  DirectoryOrangeCreateParamsApi,
  DirectoryOrangesApi,
  DirectoryShopQueryParamsApi,
} from "@/api/services/directory/models";
import { directoryOrangeRepo } from "@/api/services/directory/DirectoryOrangeServiceRepositoryImpl";

class DirectoryOrangeService {
  repository: DirectoryOrangeServiceRepository;

  constructor(repository: DirectoryOrangeServiceRepository) {
    this.repository = repository;
  }

  async fetchData(params?: DirectoryShopQueryParamsApi): Promise<DirectoryOrangesApi> {
    return await this.repository.fetchData(params);
  }
  async fetchItemById(itemId: DirectoryOrangeApi["id"]): Promise<DirectoryOrangeApi | null> {
    return await this.repository.fetchItemById(itemId);
  }
  async fetchCreateItem(params: DirectoryOrangeCreateParamsApi): Promise<DirectoryOrangeApi | null> {
    return await this.repository.fetchCreateItem(params);
  }
  async fetchUpdateItem(
    itemId: DirectoryOrangeApi["id"],
    params: DirectoryOrangeCreateParamsApi
  ): Promise<DirectoryOrangeApi | null> {
    return await this.repository.fetchUpdateItem(itemId, params);
  }
  async fetchDeleteItem(itemId: DirectoryOrangeApi["id"]): Promise<void> {
    await this.repository.fetchDeleteItem(itemId);
  }
}

export default new DirectoryOrangeService(directoryOrangeRepo);
