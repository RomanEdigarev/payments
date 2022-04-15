import { Module } from 'vuex-simple';

import ModulePaymentsStore from "@/store/payments/payments";
import ModuleShiftsStore from "@/store/shifts/shifts";
import ModuleDirectoryShopsStore from "@/store/directory/shops";
import ModuleDirectoryOrangeStore from "@/store/directory/orange";
import ModuleConstantsStore from "@/store/constants/constants";
import ModuleErrorStore from "@/store/error/error";

export default class {
  @Module()
  payments = new ModulePaymentsStore()
  @Module()
  directoryShops = new ModuleDirectoryShopsStore()
  @Module()
  directoryOrange = new ModuleDirectoryOrangeStore()
  @Module()
  constants = new ModuleConstantsStore()
  @Module()
  shifts = new ModuleShiftsStore()
  @Module()
  error = new ModuleErrorStore()
}
