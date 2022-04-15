import {DirectoryShopApi, DirectoryShopQueryParamsApi, DirectoryShopsApi} from "@/api/services/directory/models";

export interface DirectoryShopsServiceRepository {
    fetchShopsDirectory(params?: DirectoryShopQueryParamsApi): Promise<DirectoryShopsApi>
    saveShopDirectory(shopId: string, form: {fiscal_device_group_id: string, shop_code: string}): Promise<void>
    fetchAddDirectory(form: {fiscal_device_group_id: string, shop_code: string}): Promise<void>
    deleteShop(id: DirectoryShopApi['id']): Promise<void>
}
