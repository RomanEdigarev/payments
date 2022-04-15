import { Mutation, State } from "vuex-simple";
import { ShiftsState } from "@/store/shifts/types";

export default class ModuleShiftsStore {
  @State()
  state: ShiftsState = {
    isLoading: false,
    closingsShifts: { items: null, selectedClosingsShiftId: null },
    openingsShifts: { items: null, selectedOpeningShiftId: null },
  };

  @Mutation()
  toggleLoading(payload: ShiftsState["isLoading"]): void {
    this.state.isLoading = payload;
  }

  @Mutation()
  setOpeningsShifts(shifts: ShiftsState["openingsShifts"]["items"]): void {
    this.state.openingsShifts.items = shifts;
  }

  @Mutation()
  setClosingsShifts(shifts: ShiftsState["closingsShifts"]["items"]): void {
    this.state.closingsShifts.items = shifts;
  }

  @Mutation()
  setSelectedOpeningsShiftId(shiftId: ShiftsState['openingsShifts']['selectedOpeningShiftId']): void {
    this.state.openingsShifts.selectedOpeningShiftId = shiftId
  }

  @Mutation()
  setSelectedClosingsShiftId(shiftId: ShiftsState['closingsShifts']['selectedClosingsShiftId']): void {
    this.state.closingsShifts.selectedClosingsShiftId = shiftId
  }
}
