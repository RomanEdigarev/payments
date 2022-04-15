import { ShiftsServiceRepository } from "@/api/services/shifts/ShiftsServiceRepository";
import { shiftsRepo } from "@/api/services/shifts/ShiftsServiceRepositoryImpl";
import {ShiftApi, ShiftsApi, ShiftsQueryParamsApi} from "@/api/services/shifts/models";
import {ShiftsQueryParams} from "@/store/shifts/types";

class ShiftsService {
  private readonly repository: ShiftsServiceRepository;

  constructor(repository: ShiftsServiceRepository) {
    this.repository = repository;
  }

  async fetchClosingsShifts(params?: ShiftsQueryParamsApi): Promise<ShiftsApi> {
    return await this.repository.fetchClosingsShifts(params)
  }

  async fetchOpeningsShifts(params?: ShiftsQueryParamsApi): Promise<ShiftsApi> {
    return await this.repository.fetchOpeningsShifts(params)
  }

  async resendClosingsShift(shiftId: ShiftApi['data_id']): Promise<void> {
    return await this.repository.resendClosingsShift(shiftId)
  }
}

export default new ShiftsService(shiftsRepo);
