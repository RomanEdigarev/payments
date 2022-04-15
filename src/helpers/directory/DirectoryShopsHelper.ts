import { DirectoryShopsHelperRepository } from "@/helpers/directory/DirectoryShopsHelperRepository";
import {DirectoryShop, DirectoryShopsQueryParams, DirectoryShopsState} from "@/store/directory/types";
import { directoryHelperRepo } from "@/helpers/directory/DirectoryShopsHelperRepositoryImpl";
import {PaymentQueryParams} from "@/store/payments/types";

class DirectoryShopsHelper {
  private repository: DirectoryShopsHelperRepository;

  constructor(repository: DirectoryShopsHelperRepository) {
    this.repository = repository;
  }

  get isLoading(): boolean {
    return this.repository.isLoading;
  }

  get shops(): DirectoryShopsState["shops"] {
    return this.repository.shops;
  }

  get totalShops(): DirectoryShopsState["totalShops"] {
    return this.repository.totalShops;
  }

  get selectedShopId(): DirectoryShopsState["selectedShopId"] {
    return this.repository.selectedShopId;
  }
  set selectedShopId(id) {
    this.repository.selectedShopId = id;
  }

  get fiscalDeviceGroupIds(): string[] | null {
    return this.repository.fiscalDeviceGroupIds
  }

  get selectedShop(): DirectoryShop | undefined {
    return this.repository.selectedShop
  }

  async fetchShopsDirectory(params?: DirectoryShopsQueryParams): Promise<void> {
    await this.repository.fetchShopsDirectory(params);
  }

  async saveShopDirectory(form: {fiscal_device_group_id: string, shop_code: string}): Promise<void> {
    await this.repository.saveShopDirectory(form)
  }

  async fetchAddDirectory(form: {fiscal_device_group_id: string, shop_code: string}): Promise<void> {
    await this.repository.fetchAddDirectory(form)
  }

  async deleteShop(): Promise<void> {
    await this.repository.deleteShop()
  }
}

export default new DirectoryShopsHelper(directoryHelperRepo);
