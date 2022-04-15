import { DirectoryShopsServiceRepository } from "./DirectoryShopsServiceRepository";
import { DirectoryShopApi, DirectoryShopQueryParamsApi, DirectoryShopsApi } from "./models";
import { client } from "@/api/services/client";
import { ApiError } from "@/apiError/ApiError";

class DirectoryShopsServiceRepositoryImpl implements DirectoryShopsServiceRepository {
  async fetchShopsDirectory(params?: DirectoryShopQueryParamsApi): Promise<DirectoryShopsApi> {
    try {
      let response = null;
      if (params) {
        response = await client.get(`shops_to_fiscal_device_groups`, { params });
      } else {
        response = await client.get(`shops_to_fiscal_device_groups`, { params: { limit: 50 } });
      }
      return response.data;
    } catch (e) {
      new ApiError(e);
      return null;
    }
  }

  async saveShopDirectory(shopId: string, form: { fiscal_device_group_id: string; shop_code: string }): Promise<void> {
    try {
      await client.put(`shops_to_fiscal_device_group/${shopId}`, form);
    } catch (e) {
      new ApiError(e);
    }
  }

  async fetchAddDirectory(form: { fiscal_device_group_id: string; shop_code: string }): Promise<void> {
    try {
      await client.post(`shops_to_fiscal_device_group`, form);
    } catch (e) {
      new ApiError(e);
    }
  }

  async deleteShop(id: DirectoryShopApi["id"]): Promise<void> {
    try {
      await client.delete(`shops_to_fiscal_device_group/${id}`);
    } catch (e) {
      new ApiError(e);
    }
  }
}

export const directoryRepo = new DirectoryShopsServiceRepositoryImpl();
