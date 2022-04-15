import { Mutation, State } from "vuex-simple";
import { CashConstantState } from "@/store/constants/types";

export default class ModuleConstantsStore {
  @State()
  state: CashConstantState = {
    isLoading: false,
    items: null,
  };

  @Mutation()
  toggleLoading(payload: CashConstantState["isLoading"]): void {
    this.state.isLoading = payload;
  }

  @Mutation()
  setConstants(payload: CashConstantState['items']): void {
    this.state.items = payload
  }
}
