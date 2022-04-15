import { DirectoryOrangeServiceRepository } from "@/api/services/directory/DirectoryOrangeServiceRepository";
import {
  DirectoryOrangeApi,
  DirectoryOrangeCreateParamsApi,
  DirectoryOrangesApi,
  DirectoryShopQueryParamsApi,
} from "@/api/services/directory/models";
import { client } from "@/api/services/client";
import { AxiosResponse } from "axios";
import { ApiError } from "@/apiError/ApiError";

class DirectoryShopsServiceRepositoryImpl implements DirectoryOrangeServiceRepository {
  async fetchData(params?: DirectoryShopQueryParamsApi): Promise<DirectoryOrangesApi> {
    try {
      let response: AxiosResponse<DirectoryOrangesApi>;
      if (params) {
        response = await client.get("fiscal_device_groups", { params });
      } else {
        response = await client.get("fiscal_device_groups");
      }
      return response.data;
    } catch (e) {
      new ApiError(e);
      return null;
    }
  }

  async fetchItemById(itemId: DirectoryOrangeApi["id"]): Promise<DirectoryOrangeApi | null> {
    try {
      const response = await client.get(`fiscal_device_groups/${itemId}`);
      return response.data;
    } catch (e) {
      new ApiError(e);
      return null;
    }
  }

  async fetchCreateItem(params: DirectoryOrangeCreateParamsApi): Promise<DirectoryOrangeApi | null> {
    try {
      const response = await client.post("fiscal_device_groups", { params });
      return response.data;
    } catch (e) {
      new ApiError(e);
      return null;
    }
  }

  async fetchUpdateItem(
    itemId: DirectoryOrangeApi["id"],
    params: DirectoryOrangeCreateParamsApi
  ): Promise<DirectoryOrangeApi | null> {
    try {
      const response = await client.post(`fiscal_device_groups/${itemId}`, params);
      return response.data;
    } catch (e) {
      new ApiError(e);
      return null;
    }
  }

  async fetchDeleteItem(itemId: DirectoryOrangeApi["id"]): Promise<void> {
    try {
      await client.delete(`fiscal_device_groups/${itemId}`);
    } catch (e) {
      new ApiError(e);
    }
  }
}

export const directoryOrangeRepo = new DirectoryShopsServiceRepositoryImpl();
