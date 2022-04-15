import { CashConstantsServiceRepository } from "@/api/services/constants/CashConstantsServiceRepository";
import { CashConstantApi, CashConstantsApi } from "@/api/services/constants/models";
import { client } from "@/api/services/client";
import { ApiError } from "@/apiError/ApiError";

class CashConstantsServiceRepositoryImpl implements CashConstantsServiceRepository {
  async fetchData(): Promise<CashConstantsApi> {
    try {
      const response = await client.get("global_values");
      return response.data;
    } catch (e) {
      new ApiError(e);
      return null
    }
  }

  async fetchUpdateItem(data: CashConstantApi): Promise<void> {
    try {
      const response = await client.put(`global_values/key_code`, data );
      return response.data;
    } catch (e) {
      new ApiError(e);
    }
  }
}

export const cashConstantRepo = new CashConstantsServiceRepositoryImpl();
