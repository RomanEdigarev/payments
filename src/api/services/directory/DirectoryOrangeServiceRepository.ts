import { DirectoryOrangeApi, DirectoryOrangeCreateParamsApi, DirectoryOrangesApi, DirectoryShopQueryParamsApi } from "./models";

export interface DirectoryOrangeServiceRepository {
  fetchData(params?: DirectoryShopQueryParamsApi): Promise<DirectoryOrangesApi>;
  fetchItemById(itemId: DirectoryOrangeApi["id"]): Promise<DirectoryOrangeApi | null>;
  fetchCreateItem(params: DirectoryOrangeCreateParamsApi): Promise<DirectoryOrangeApi | null>;
  fetchUpdateItem(itemId: DirectoryOrangeApi["id"], params: DirectoryOrangeCreateParamsApi): Promise<DirectoryOrangeApi | null>;
  fetchDeleteItem(itemId: DirectoryOrangeApi["id"]): Promise<void>;
}
