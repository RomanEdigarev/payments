import {
  DirectoryOrangeApi,
  DirectoryOrangesApi,
  DirectoryShopApi,
  DirectoryShopQueryParamsApi,
  DirectoryShopsApi,
} from "@/api/services/directory/models";

export type DirectoryShop = DirectoryShopApi;
export type DirectoryShops = DirectoryShopsApi;
export type DirectoryShopsQueryParams = DirectoryShopQueryParamsApi;
export type DirectoryShopsState = {
  isLoading: boolean;
  shops: Map<string, DirectoryShop> | null;
  selectedShopId: string | null;
  totalShops: number | null;
};

export type DirectoryOrange = DirectoryOrangeApi;
export type DirectoryOranges = DirectoryOrangesApi;
export type DirectoryOrangeState = {
  isLoading: boolean;
  orange: Map<string, DirectoryOrange> | null;
  selectedOrangeId: string | null;
  totalOrange: number | null;
};
