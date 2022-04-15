<template>
  <div class="cash-directory-table">
    <BaseTable
      :columns="columns"
      :data-for-table="filteredData || dataForTable"
      :loading="isLoading"
      :total="total"
      @change-page="onChangePage"
      @change-page-size="onShowSizeChange"
    >
      <template v-slot:action="scopedProps">
        <a-icon type="edit" @click="edit(scopedProps.row.key)" />
        <a-icon type="delete" @click="deleteShop(scopedProps.row.key)" />
      </template>
    </BaseTable>
    <CashDirectoryOrangeEdit :visible="visible" type="orangedata" @cancel="cancelEdit" @submit="submit" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { BaseTable } from "@/components";
import { PropColumnTable } from "@/store/types";
import { DirectoryOrangeState, DirectoryShopsQueryParams } from "@/store/directory/types";
import DirectoryOrangeHelper from "@/helpers/directory/DirectoryOrangeHelper";
import CashDirectoryOrangeEdit from "../modal/CashDirectoryOrangeEdit.vue";

@Component({
  components: { BaseTable, CashDirectoryOrangeEdit },
})
export default class CashDirectoryOrangeTable extends Vue {
  visible = false;
  query: DirectoryShopsQueryParams | undefined = undefined;
  baseColumns: PropColumnTable<{
    id: string;
    online_group_name: string;
    offline_group_name: string;
    timezone_name: string;
  }>[] = [
    {
      dataIndex: "id",
      key: "id",
      title: "ID",
      sorter: (a, b) => {
        return a.id > b.id ? 1 : -1;
      },
    },
    {
      dataIndex: "online_group_name",
      key: "online_group_name",
      title: "Наименование группы для онлайн оплат",
      sorter: (a, b) => {
        return a.online_group_name > b.online_group_name ? 1 : -1;
      },
    },
    {
      dataIndex: "offline_group_name",
      key: "offline_group_name",
      title: "Наименование группы для оплаты на месте",
      sorter: (a, b) => {
        return a.offline_group_name > b.offline_group_name ? 1 : -1;
      },
    },
    {
      dataIndex: "timezone_name",
      key: "timezone_name",
      title: "Часовой пояс",
      sorter: (a, b) => {
        return a.timezone_name > b.timezone_name ? 1 : -1;
      }
    },
    {
      key: "action",
      title: "Действия",
      scopedSlots: { customRender: "action" },
    },
  ];

  filteredData: null | any[] = null;

  async created(): Promise<void> {
    await DirectoryOrangeHelper.fetchData(this.query);
  }

  get columns(): PropColumnTable[] {
    const results: PropColumnTable[] = [...this.baseColumns];
    return results;
  }

  get isLoading(): boolean {
    return DirectoryOrangeHelper.isLoading;
  }

  get dataForTable() {
    const oranges = DirectoryOrangeHelper.orange;
    let result = [];
    if (oranges) {
      for (let orange of oranges.values()) {
        result.push({
          key: orange.id,
          id: orange.id,
          online_group_name: orange.online_group_name,
          offline_group_name: orange.offline_group_name,
          timezone_name: orange.timezone_name,
        });
      }
    }
    return result;
  }

  get total(): DirectoryOrangeState["totalOrange"] {
    return DirectoryOrangeHelper.totalOrange;
  }

  search(str: string): void {
    if (str.length >= 2) {
      this.filteredData = this.dataForTable.filter((item) => {
        return (
          item.id.toString().includes(str) ||
          item.online_group_name.toString().includes(str) ||
          item.offline_group_name.toString().includes(str)
        );
      });
    } else this.filteredData = null;
  }

  edit(id: string): void {
    this.visible = true;
    DirectoryOrangeHelper.selectedOrangeId = id;
  }

  cancelEdit(): void {
    this.visible = false;
    DirectoryOrangeHelper.selectedOrangeId = null;
  }

  deleteShop(id: string): void {
    DirectoryOrangeHelper.selectedOrangeId = id;
    this.$confirm({
      title: `Вы уверены, что хотите удалить ${id}`,
      onOk: async () => {
        await DirectoryOrangeHelper.fetchDeleteItem();
      },
    });
  }

  async onChangePage(query: DirectoryShopsQueryParams): Promise<void> {
    this.query = query;
    await DirectoryOrangeHelper.fetchData({ ...query });
  }

  async onShowSizeChange(query: DirectoryShopsQueryParams): Promise<void> {
    this.query = query;
    await DirectoryOrangeHelper.fetchData({ ...query });
  }

  async submit(form: any): Promise<void> {
    this.visible = false;
    await DirectoryOrangeHelper.fetchUpdateItem(form);
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
