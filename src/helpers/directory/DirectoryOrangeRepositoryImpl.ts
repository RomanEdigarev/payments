import { DirectoryOrangeHelperRepository } from "@/helpers/directory/DirectoryOrangeHelperRepository";
import Store from "@/store/store";
import { useStore } from "vuex-simple";
import _store from "@/store";
import { DirectoryOrange, DirectoryOrangeState } from "@/store/directory/types";
import { DirectoryOrangeCreateParamsApi, DirectoryShopQueryParamsApi } from "@/api/services/directory/models";
import DirectoryOrangeService from "@/api/services/directory/DirectoryOrangeService";

class DirectoryOrangeHelperRepositoryImpl implements DirectoryOrangeHelperRepository {
  store: Store = useStore(_store);

  get isLoading(): boolean {
    return this.store.directoryOrange.state.isLoading;
  }
  set isLoading(islLoading) {
    this.store.directoryOrange.toggleLoading(islLoading);
  }

  get orange(): DirectoryOrangeState["orange"] {
    return this.store.directoryOrange.state.orange;
  }
  set orange(orange) {
    this.store.directoryOrange.setOrange(orange);
  }

  get selectedOrange(): DirectoryOrange | undefined {
    if (this.selectedOrangeId && this.store.directoryOrange.state.orange) {
      return this.store.directoryOrange.state.orange.get(this.selectedOrangeId);
    } else return undefined;
  }

  get selectedOrangeId(): DirectoryOrangeState["selectedOrangeId"] {
    return this.store.directoryOrange.state.selectedOrangeId;
  }
  set selectedOrangeId(value: DirectoryOrangeState["selectedOrangeId"]) {
    this.store.directoryOrange.setSelectedOrangeId(value);
  }

  get totalOrange(): DirectoryOrangeState["totalOrange"] {
    return this.store.directoryOrange.state.totalOrange;
  }
  set totalOrange(value: DirectoryOrangeState["totalOrange"]) {
    this.store.directoryOrange.setTotalOrange(value);
  }

  async fetchData(params?: DirectoryShopQueryParamsApi): Promise<void> {
    this.isLoading = true
    const orange = await DirectoryOrangeService.fetchData(params);
    const orangeMap = new Map<string, DirectoryOrange>();
    if (orange && orange.list.length > 0) {
      orange.list.forEach((item) => {
        orangeMap.set(item.id, item);
      });
    }
    this.orange = orangeMap;
    this.isLoading = false
  }

  async fetchCreateItem(params: DirectoryOrangeCreateParamsApi): Promise<void> {
    this.isLoading = true
    await DirectoryOrangeService.fetchCreateItem(params);
    await this.fetchData();
  }

  async fetchDeleteItem(): Promise<void> {
    this.isLoading = true
    if (this.selectedOrangeId) {
      await DirectoryOrangeService.fetchDeleteItem(this.selectedOrangeId);
      await this.fetchData();
    } else {
      this.isLoading = false
    }

  }

  async fetchItemById(): Promise<void> {
    //TODO
  }

  async fetchUpdateItem(params: DirectoryOrangeCreateParamsApi): Promise<void> {
    this.isLoading = true
    if (this.selectedOrangeId) {
      await DirectoryOrangeService.fetchUpdateItem(this.selectedOrangeId, params);
      await this.fetchData();
    } else {
      this.isLoading = false
    }
  }
}

export const directoryOrangeHelperRepo = new DirectoryOrangeHelperRepositoryImpl();
