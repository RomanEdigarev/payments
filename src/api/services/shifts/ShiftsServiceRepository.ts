import {ShiftApi, ShiftsApi, ShiftsQueryParamsApi} from "@/api/services/shifts/models";

export interface ShiftsServiceRepository {
    fetchOpeningsShifts(params?: ShiftsQueryParamsApi): Promise<ShiftsApi>
    fetchClosingsShifts(params?: ShiftsQueryParamsApi): Promise<ShiftsApi>
    resendClosingsShift(shiftId: ShiftApi['data_id']): Promise<void>
}
