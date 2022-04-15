import _store from "@/store";
import { useStore } from "vuex-simple";
import Store from "@/store/store";
import { ShiftsHelperRepository } from "@/helpers/shifts/ShiftsHelperRepository";
import ShiftsService from "@/api/services/shifts/ShiftsService";
import {Shift, ShiftsQueryParams, ShiftsState} from "@/store/shifts/types";

class ShiftsHelperRepositoryImpl implements ShiftsHelperRepository {
  store: Store = useStore(_store);

  get isLoading(): ShiftsState['isLoading'] {
    return this.store.shifts.state.isLoading
  }

  get openingsShifts(): ShiftsState["openingsShifts"]["items"] {
    return this.store.shifts.state.openingsShifts.items;
  }
  set openingsShifts(shifts) {
    this.store.shifts.setOpeningsShifts(shifts);
  }

  get closingsShifts(): ShiftsState["closingsShifts"]["items"] {
    return this.store.shifts.state.closingsShifts.items;
  }
  set closingsShifts(shifts) {
    this.store.shifts.setClosingsShifts(shifts);
  }

  get selectedOpeningShiftId(): ShiftsState['openingsShifts']['selectedOpeningShiftId'] {
    return this.store.shifts.state.openingsShifts.selectedOpeningShiftId
  }
  set selectedOpeningShiftId(shiftId: ShiftsState['openingsShifts']['selectedOpeningShiftId']) {
    this.store.shifts.setSelectedOpeningsShiftId(shiftId)
  }

  get selectedClosingShiftId(): ShiftsState['closingsShifts']['selectedClosingsShiftId'] {
    return this.store.shifts.state.closingsShifts.selectedClosingsShiftId
  }
  set selectedClosingShiftId(shiftId: ShiftsState['closingsShifts']['selectedClosingsShiftId']) {
    this.store.shifts.setSelectedClosingsShiftId(shiftId)
  }

  get selectedOpeningShift(): Shift | null {
    if ( this.store.shifts.state.openingsShifts.items && this.selectedOpeningShiftId) {
      return this.store.shifts.state.openingsShifts.items.get(this.selectedOpeningShiftId) || null
    } else {
      return null
    }
  }

  get selectedClosingShift(): Shift | null {
    if ( this.store.shifts.state.closingsShifts.items && this.selectedClosingShiftId) {
      return this.store.shifts.state.closingsShifts.items.get(this.selectedClosingShiftId) || null
    } else {
      return null
    }
  }

  async fetchClosingsShifts(params?: ShiftsQueryParams): Promise<void> {
    this.store.shifts.toggleLoading(true);
    const response = await ShiftsService.fetchClosingsShifts(params);
    const closingShiftsMap: Map<string, Shift> = new Map();
    if (response) {
      response.list.forEach((shift) => {
        closingShiftsMap.set(shift.data_id.toString(), shift);
      });
    }
    this.closingsShifts = closingShiftsMap;
    this.store.shifts.toggleLoading(false);
  }

  async fetchOpeningsShifts(params?: ShiftsQueryParams): Promise<void> {
    this.store.shifts.toggleLoading(true);
    const response = await ShiftsService.fetchOpeningsShifts(params);
    const openingsShiftsMap: Map<string, Shift> = new Map();
    if (response) {
      response.list.forEach((shift) => {
        openingsShiftsMap.set(shift.data_id.toString(), shift);
      });
    }
    this.openingsShifts = openingsShiftsMap;
    this.store.shifts.toggleLoading(false);
  }

  async resendClosingsShift(): Promise<void> {
    this.store.shifts.toggleLoading(true);
    if (this.selectedClosingShiftId) {
      await ShiftsService.resendClosingsShift(this.selectedClosingShiftId)
    }
    await this.fetchClosingsShifts()
  }
}

export const shiftsHelper = new ShiftsHelperRepositoryImpl();
