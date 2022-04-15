import { ShiftsServiceRepository } from "@/api/services/shifts/ShiftsServiceRepository";
import { ShiftApi, ShiftsApi, ShiftsQueryParamsApi } from "@/api/services/shifts/models";
import { client } from "@/api/services/client";
import { ApiError } from "@/apiError/ApiError";

class ShiftsServiceRepositoryImpl implements ShiftsServiceRepository {
  async fetchClosingsShifts(params?: ShiftsQueryParamsApi): Promise<ShiftsApi> {
    try {
      let response = null;
      if (params) {
        response = await client.get("shift/closings", { params });
      } else {
        response = await client.get("shift/closings");
      }
      return response.data;
    } catch (e) {
      new ApiError(e);
      return null;
    }
  }

  async fetchOpeningsShifts(params?: ShiftsQueryParamsApi): Promise<ShiftsApi> {
    try {
      let response = null;
      if (params) {
        response = await client.get("shift/openings", { params });
      } else {
        response = await client.get("shift/openings");
      }
      return response.data;
    } catch (e) {
      new ApiError(e);
      return null;
    }
  }

  async resendClosingsShift(shiftId: ShiftApi["data_id"]): Promise<void> {
    try {
      await client.post(`shift/closings/${shiftId}/resend`);
    } catch (e) {
      new ApiError(e);
    }
  }
}

export const shiftsRepo = new ShiftsServiceRepositoryImpl();
