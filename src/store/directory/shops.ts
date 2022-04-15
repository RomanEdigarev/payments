import { Mutation, State } from "vuex-simple";
import { DirectoryShopsState } from "@/store/directory/types";

export default class ModuleDirectoryShopsStore {
  @State()
  state: DirectoryShopsState = {
    isLoading: false,
    shops: null,
    selectedShopId: null,
    totalShops: null,
  };

  @Mutation()
  toggleLoading(payload: DirectoryShopsState["isLoading"]): void {
    this.state.isLoading = payload;
  }

  @Mutation()
  setShops(shops: DirectoryShopsState["shops"]): void {
    this.state.shops = shops;
  }

  @Mutation()
  setSelectedShopId(shopId: DirectoryShopsState["selectedShopId"]): void {
    this.state.selectedShopId = shopId;
  }

  @Mutation()
  setTotalShops(total: DirectoryShopsState["totalShops"]): void {
    this.state.totalShops = total;
  }
}
