import { ShiftsHelperRepository } from "@/helpers/shifts/ShiftsHelperRepository";
import { shiftsHelper } from "@/helpers/shifts/ShiftsHelperRepositoryImpl";
import {Shift, ShiftsQueryParams, ShiftsState} from "@/store/shifts/types";
import {ShiftsQueryParamsApi} from "@/api/services/shifts/models";

class ShiftsHelper {
  private readonly repository;

  constructor(repository: ShiftsHelperRepository) {
    this.repository = repository;
  }

  get isLoading(): ShiftsState['isLoading'] {
    return this.repository.isLoading
  }

  get openingsShifts(): ShiftsState["openingsShifts"]["items"] {
    return this.repository.openingsShifts;
  }
  set openingsShifts(shifts) {
    this.repository.openingsShifts = shifts;
  }

  get closingsShifts(): ShiftsState["closingsShifts"]["items"] {
    return this.repository.closingsShifts;
  }
  set closingsShifts(shifts) {
    this.repository.closingsShifts = shifts;
  }

  get selectedOpeningShiftId(): ShiftsState['openingsShifts']['selectedOpeningShiftId'] {
    return this.repository.selectedOpeningShiftId
  }
  set selectedOpeningShiftId(shiftId: ShiftsState['openingsShifts']['selectedOpeningShiftId']) {
    this.repository.selectedOpeningShiftId = shiftId
  }

  get selectedClosingShiftId(): ShiftsState['closingsShifts']['selectedClosingsShiftId'] {
    return this.repository.selectedClosingShiftId
  }
  set selectedClosingShiftId(shiftId: ShiftsState['closingsShifts']['selectedClosingsShiftId']) {
    this.repository.selectedClosingShiftId = shiftId
  }

  get selectedOpeningShift(): Shift | null {
    return this.repository.selectedOpeningShift
  }

  get selectedClosingShift(): Shift | null {
    return this.repository.selectedClosingShift
  }


  async fetchClosingsShifts(params?: ShiftsQueryParams): Promise<void> {
    await this.repository.fetchClosingsShifts(params);
  }

  async fetchOpeningsShifts(params?: ShiftsQueryParams): Promise<void> {
    await this.repository.fetchOpeningsShifts(params);
  }

  async resendClosingsShift(): Promise<void> {
    await this.repository.resendClosingsShift()
  }
}

export default new ShiftsHelper(shiftsHelper);
