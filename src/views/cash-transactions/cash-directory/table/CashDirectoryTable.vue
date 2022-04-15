<template>
  <div class="cash-directory-table">
    <BaseTable
      :columns="columns"
      :data-for-table="filteredData || dataForTable"
      :loading="isLoading"
      :total="shopsTotal"
      @change-page="onChangePage"
      @change-page-size="onShowSizeChange"
    >
      <template v-slot:action="scopedProps">
        <a-icon type="edit" @click="edit(scopedProps.row.key)" />
        <a-icon type="delete" @click="deleteShop(scopedProps.row.key)" />
      </template>
    </BaseTable>
    <CashDirectoryModal
      :visible="visible"
      :type="type"
      @cancel="cancelEdit"
      @submit="submit"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { BaseTable } from "@/components";
import CashDirectoryModal from "../modal/CashDirectoryModal.vue";
import { PropColumnTable } from "@/store/types";
import DirectoryShopsHelper from "@/helpers/directory/DirectoryShopsHelper";
import {
  DirectoryShopsQueryParams,
  DirectoryShopsState,
} from "@/store/directory/types";

@Component({
  components: { BaseTable, CashDirectoryModal },
})
export default class CashDirectoryTable extends Vue {
  @Prop({ default: "shops" }) readonly type: "shops" | "orangedata";
  visible = false;
  query: DirectoryShopsQueryParams | undefined = undefined;
  baseColumns: PropColumnTable<{
    shop_id: string;
    shopcode: string;
    timezone: string;
  }>[] = [
    {
      dataIndex: "shop_id",
      key: "shop_id",
      title: "ID ГУ Orangedata",
      sorter: (a, b) => {
        return a.shop_id > b.shop_id ? 1 : -1;
      },
    },
    {
      dataIndex: "shopcode",
      key: "shopcode",
      title: "Корпоративный код магазина",
      sorter: (a, b) => {
        return a.timezone > b.timezone ? 1 : -1;
      },
    },
    {
      dataIndex: "timezone",
      key: "timezone",
      title: "Часовой пояс",
      sorter: (a, b) => {
        return a.shopcode > b.shopcode ? 1 : -1;
      },
    },
    {
      key: "action",
      title: "Действия",
      scopedSlots: { customRender: "action" },
    },
  ];

  filteredData: null | any[] = null;

  async created(): Promise<void> {
    await DirectoryShopsHelper.fetchShopsDirectory(this.query);
  }

  get columns(): PropColumnTable[] {
    const results: PropColumnTable[] = [...this.baseColumns];
    // if (this.type === "shops") {
    //   results.push({
    //     dataIndex: "status",
    //     key: "status",
    //     title: "Статус отправки",
    //     sorter: true,
    //   });
    // }
    // results.push({
    //   dataIndex: '',
    //   key: "action",
    //   title: "Действия",
    //   sorter: false,
    //   scopedSlots: { customRender: "action" },
    // });
    return results;
  }

  get isLoading(): boolean {
    return DirectoryShopsHelper.isLoading;
  }

  get dataForTable() {
    const shops = DirectoryShopsHelper.shops;
    let result = [];
    if (shops) {
      for (let shop of shops.values()) {
        result.push({
          key: shop.id,
          shop_id: shop.id,
          shopcode: shop.shop_code,
          timezone: "+3",
        });
      }
    }
    return result;
  }

  get shopsTotal(): DirectoryShopsState["totalShops"] {
    return DirectoryShopsHelper.totalShops;
  }

  search(str: string): void {
    if (str.length >= 2) {
      this.filteredData = this.dataForTable.filter((item) => {
        return (
          item.shopcode.toString().includes(str) ||
          item.shop_id.toString().includes(str) ||
          item.timezone.toString().includes(str)
        );
      });
    } else this.filteredData = null;
  }

  edit(shopId: string): void {
    this.visible = true;
    DirectoryShopsHelper.selectedShopId = shopId;
  }

  cancelEdit(): void {
    this.visible = false;
    DirectoryShopsHelper.selectedShopId = null;
  }

  deleteShop(shopId: string): void {
    DirectoryShopsHelper.selectedShopId = shopId;
    this.$confirm({
      title: `Вы уверены, что хотите удалить ${shopId}`,
      onOk: async () => {
        await DirectoryShopsHelper.deleteShop();
      },
    });
  }

  async onChangePage(query: DirectoryShopsQueryParams): Promise<void> {
    this.query = query;
    await DirectoryShopsHelper.fetchShopsDirectory({ ...query });
  }

  async onShowSizeChange(query: DirectoryShopsQueryParams): Promise<void> {
    this.query = query;
    await DirectoryShopsHelper.fetchShopsDirectory({ ...query });
  }

  async submit(form: any): Promise<void> {
    this.visible = false;
    await DirectoryShopsHelper.saveShopDirectory(form);
  }
}
</script>

<style lang="scss" scoped></style>
<style lang="scss">
.anticon.anticon-delete,
.anticon.anticon-edit {
  color: #bdbdbd;
  cursor: pointer;
  font-size: 20px;
  margin-left: 8px;
  &:hover {
    color: #1890ff;
  }
}
</style>
`
