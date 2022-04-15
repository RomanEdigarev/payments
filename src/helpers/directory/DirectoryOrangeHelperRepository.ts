import { DirectoryOrange, DirectoryOrangeState } from "@/store/directory/types";
import { DirectoryOrangeCreateParamsApi, DirectoryShopQueryParamsApi } from "@/api/services/directory/models";

export interface DirectoryOrangeHelperRepository {
  isLoading: DirectoryOrangeState["isLoading"];
  readonly orange: DirectoryOrangeState["orange"];
  readonly totalOrange: DirectoryOrangeState["totalOrange"];
  readonly selectedOrange: DirectoryOrange | undefined;
  selectedOrangeId: DirectoryOrangeState["selectedOrangeId"];
  fetchData(params?: DirectoryShopQueryParamsApi): Promise<void>;
  fetchItemById(): Promise<void>;
  fetchCreateItem(params: DirectoryOrangeCreateParamsApi): Promise<void>;
  fetchUpdateItem(params: DirectoryOrangeCreateParamsApi): Promise<void>;
  fetchDeleteItem(): Promise<void>;
}
