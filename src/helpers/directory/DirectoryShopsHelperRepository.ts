import {DirectoryShop, DirectoryShopsQueryParams, DirectoryShopsState} from "@/store/directory/types";

export interface DirectoryShopsHelperRepository {
  readonly isLoading: DirectoryShopsState["isLoading"];
  readonly shops: DirectoryShopsState["shops"];
  readonly totalShops: DirectoryShopsState['totalShops']
  readonly selectedShop: DirectoryShop | undefined
  readonly fiscalDeviceGroupIds: string[] | null;
  selectedShopId: DirectoryShopsState["selectedShopId"];
  fetchShopsDirectory(params?: DirectoryShopsQueryParams): Promise<void>;
  fetchAddDirectory(form: {fiscal_device_group_id: string, shop_code: string}): Promise<void>
  saveShopDirectory(form: {fiscal_device_group_id: string, shop_code: string}): Promise<void>
  deleteShop(): Promise<void>
}
