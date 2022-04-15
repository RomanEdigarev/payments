import { Mutation, State } from "vuex-simple";
import { ErrorState } from "@/store/error/types";

export default class ModuleErrorStore {
  @State()
  state: ErrorState = {
    error: null
  };

  @Mutation()
  setError(payload: ErrorState["error"]): void {
    this.state.error = payload;
  }
}
