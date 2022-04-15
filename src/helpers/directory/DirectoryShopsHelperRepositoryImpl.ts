import { DirectoryShopsHelperRepository } from "@/helpers/directory/DirectoryShopsHelperRepository";
import {DirectoryShop, DirectoryShopsQueryParams, DirectoryShopsState} from "@/store/directory/types";
import Store from "@/store/store";
import { useStore } from "vuex-simple";
import _store from "@/store";
import DirectoryService from "@/api/services/directory/DirectoryShopsService";

class DirectoryShopsHelperRepositoryImpl implements DirectoryShopsHelperRepository {
  store: Store = useStore(_store);
  get isLoading(): boolean {
    return this.store.directoryShops.state.isLoading;
  }
  set isLoading(islLoading) {
    this.store.directoryShops.toggleLoading(islLoading)
  }

  get shops(): DirectoryShopsState["shops"] {
    return this.store.directoryShops.state.shops;
  }
  set shops(shops) {
    this.store.directoryShops.setShops(shops);
  }

  get totalShops(): DirectoryShopsState['totalShops'] {
    return this.store.directoryShops.state.totalShops
  }
  set totalShops(total) {
    this.store.directoryShops.setTotalShops(total)
  }

  get selectedShopId(): DirectoryShopsState['selectedShopId'] {
    return this.store.directoryShops.state.selectedShopId
  }
  set selectedShopId(id) {
    this.store.directoryShops.setSelectedShopId(id)
  }

  get selectedShop(): DirectoryShop | undefined {
    if (this.shops && this.selectedShopId) {
      return this.shops.get(this.selectedShopId)
    } else return undefined
  }

  get fiscalDeviceGroupIds(): string[] | null {
    if (this.shops) {
      const setIds = new Set<string>()
      for (const [_, value] of this.shops) {{
        setIds.add(value.fiscal_device_group_id)
      }}
      return Array.from(setIds)
    } else return null
  }

  async fetchShopsDirectory(params?: DirectoryShopsQueryParams): Promise<void> {
    this.isLoading = true
    const shops = await DirectoryService.fetchShopsDirectory(params);
    const shopsMap: Map<string, DirectoryShop> = new Map();
    if (shops && shops.list.length > 0) {
      shops.list.forEach((shop) => shopsMap.set(shop.id, shop));
    }
    this.shops = shopsMap;
    this.isLoading = false
  }

  async saveShopDirectory(form: {fiscal_device_group_id: string, shop_code: string}): Promise<void> {
    this.isLoading = true
    if (this.selectedShopId) {
      await DirectoryService.saveShopDirectory(this.selectedShopId, form)
    }
    await this.fetchShopsDirectory()
  }

  async fetchAddDirectory(form: {fiscal_device_group_id: string, shop_code: string}): Promise<void> {
    this.isLoading = true
    await DirectoryService.fetchAddDirectory(form)
    await this.fetchShopsDirectory()
  }

  async deleteShop() {
    this.isLoading = true
    if (this.selectedShopId) {
      await DirectoryService.deleteShop(this.selectedShopId)
    }
    await this.fetchShopsDirectory()
  }
}

export const directoryHelperRepo = new DirectoryShopsHelperRepositoryImpl()
