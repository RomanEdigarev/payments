import { DirectoryShopsServiceRepository } from "./DirectoryShopsServiceRepository";
import {DirectoryShopApi, DirectoryShopQueryParamsApi, DirectoryShopsApi} from "./models";
import { directoryRepo } from "./DirectoryShopsServiceRepositoryImpl";

class DirectoryShopsService {
  private readonly repository: DirectoryShopsServiceRepository;

  constructor(repository: DirectoryShopsServiceRepository) {
    this.repository = repository;
  }

  async fetchShopsDirectory(params?: DirectoryShopQueryParamsApi): Promise<DirectoryShopsApi> {
    return this.repository.fetchShopsDirectory(params);
  }

  async saveShopDirectory(shopId: string, form: {fiscal_device_group_id: string, shop_code: string}): Promise<void> {
    return this.repository.saveShopDirectory(shopId, form)
  }

  async fetchAddDirectory(form: {fiscal_device_group_id: string, shop_code: string}): Promise<void> {
    await this.repository.fetchAddDirectory(form)
  }

  async deleteShop(id: DirectoryShopApi['id']) {
    return this.repository.deleteShop(id)
  }
}

export default new DirectoryShopsService(directoryRepo);
