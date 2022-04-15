import {Shift, ShiftsQueryParams, ShiftsState} from "@/store/shifts/types";
import {ShiftApi} from "@/api/services/shifts/models";

export interface ShiftsHelperRepository {
    isLoading: ShiftsState['isLoading']
    openingsShifts: ShiftsState['openingsShifts']['items']
    closingsShifts: ShiftsState['closingsShifts']['items']
    selectedOpeningShiftId: ShiftsState['openingsShifts']['selectedOpeningShiftId']
    selectedClosingShiftId: ShiftsState['closingsShifts']['selectedClosingsShiftId']
    selectedOpeningShift: Shift | null
    selectedClosingShift: Shift | null
    fetchClosingsShifts(params?: ShiftsQueryParams): Promise<void>
    fetchOpeningsShifts(params?: ShiftsQueryParams): Promise<void>
    resendClosingsShift(): Promise<void>
}
