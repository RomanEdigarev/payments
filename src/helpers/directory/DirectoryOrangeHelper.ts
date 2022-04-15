import { DirectoryOrangeHelperRepository } from "@/helpers/directory/DirectoryOrangeHelperRepository";
import { DirectoryOrange, DirectoryOrangeState } from "@/store/directory/types";
import { DirectoryOrangeCreateParamsApi, DirectoryShopQueryParamsApi } from "@/api/services/directory/models";
import { directoryOrangeHelperRepo } from "@/helpers/directory/DirectoryOrangeRepositoryImpl";

class DirectoryOrangeHelper {
  repository: DirectoryOrangeHelperRepository;

  constructor(repository: DirectoryOrangeHelperRepository) {
    this.repository = repository;
  }

  get isLoading(): DirectoryOrangeState["isLoading"] {
    return this.repository.isLoading;
  }
  get orange(): DirectoryOrangeState["orange"] {
    return this.repository.orange;
  }
  get totalOrange(): DirectoryOrangeState["totalOrange"] {
    return this.repository.totalOrange;
  }
  get selectedOrange(): DirectoryOrange | undefined {
    return this.repository.selectedOrange;
  }
  get selectedOrangeId(): DirectoryOrangeState["selectedOrangeId"] {
    return this.repository.selectedOrangeId;
  }
  set selectedOrangeId(value: DirectoryOrangeState["selectedOrangeId"]) {
    this.repository.selectedOrangeId = value;
  }
  async fetchData(params?: DirectoryShopQueryParamsApi): Promise<void> {
    await this.repository.fetchData(params);
  }
  async fetchItemById(): Promise<void> {
    await this.repository.fetchItemById();
  }
  async fetchCreateItem(params: DirectoryOrangeCreateParamsApi): Promise<void> {
    await this.repository.fetchCreateItem(params);
  }
  async fetchUpdateItem(params: DirectoryOrangeCreateParamsApi): Promise<void> {
    await this.repository.fetchUpdateItem(params);
  }
  async fetchDeleteItem(): Promise<void> {
    await this.repository.fetchDeleteItem();
  }
}

export default new DirectoryOrangeHelper(directoryOrangeHelperRepo);
