import { Mutation, State } from "vuex-simple";
import { DirectoryOrangeState, DirectoryShopsState } from "@/store/directory/types";

export default class ModuleDirectoryOrangeStore {
  @State()
  state: DirectoryOrangeState = {
    isLoading: false,
    orange: null,
    selectedOrangeId: null,
    totalOrange: null,
  };

  @Mutation()
  toggleLoading(payload: DirectoryOrangeState["isLoading"]): void {
    this.state.isLoading = payload;
  }

  @Mutation()
  setOrange(orange: DirectoryOrangeState["orange"]): void {
    this.state.orange = orange;
  }

  @Mutation()
  setSelectedOrangeId(orangeId: DirectoryOrangeState["selectedOrangeId"]): void {
    this.state.selectedOrangeId = orangeId;
  }

  @Mutation()
  setTotalOrange(total: DirectoryOrangeState["totalOrange"]): void {
    this.state.totalOrange = total;
  }
}
