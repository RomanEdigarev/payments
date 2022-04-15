`
<template>
  <div class="cash-shifts-table">
    <BaseTable
      :sorter-items="sorterItems"
      :columns="columns"
      :data-for-table="filteredData || dataForTable"
      :loading="isLoading"
      @search="search"
      @filter="$emit('filter', $event)"
      @change-page="$emit('change-page', $event)"
      @change-page-size="$emit('change-page-size', $event)"
    >
      <template v-slot:action="scopedProps">
        <a-icon @click="showDetails(scopedProps.row.key)" type="eye" />
      </template>
    </BaseTable>
    <CashShiftsModal :visible="visible" :type="type" @cancel="hideModal"/>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import ShiftsHelper from "@/helpers/shifts/ShiftsHelper";
import {Shift, ShiftForTableItem} from "@/store/shifts/types";
import { BaseTable } from "@/components";
import CashShiftsModal from '../modal/CashShiftsModal.vue'
import { PropColumnTable } from "@/store/types";
import { getDate } from "@/utils/getDate";

@Component({
  components: { BaseTable, CashShiftsModal },
})
export default class CashShiftsTable extends Vue {
  @Prop({default: 'openings'}) readonly type: "openings" | "closings";
  visible = false
  baseColumns: PropColumnTable<ShiftForTableItem>[] = [
    {
      dataIndex: "fsNumber",
      key: "fsNumber",
      title: "Фискальный накопитель",
      sorter: (a, b) => {
        return a.fsNumber > b.fsNumber ? 1 : -1
      },
    },
    {
      dataIndex: "rgNumber",
      key: "rgNumber",
      title: "Регистрационный номер",
      sorter: (a, b) => {
        return a.rgNumber > b.rgNumber ? 1 : -1
      },
    },
    {
      dataIndex: "shiftNumber",
      key: "shiftNumber",
      title: "Номер смены",
      sorter: (a, b) => {
        return a.shiftNumber > b.shiftNumber ? 1 : -1
      },
    },
    {
      dataIndex: "date",
      key: "date",
      title: "Дата поступления документа",
      sorter: (a, b) => {
        return a.date > b.date ? 1 : -1
      },
    },
  ];

  filteredData: null | any[] = null;

  get sorterItems() {
    const result = []
    result.push({ type: "range-picker", placeholder: ["С даты", "По дату"] })
    if (this.type === 'closings') {
      result.push({
        type: "select",
        queryName: "status",
        placeholder: "Статус",
        options: [
          { value: "unknown", text: "Неизвестно" },
          { value: "error", text: "Ошибка" },
          { value: "created", text: "Создан" },
          { value: "on_hold", text: "Захолдировано" },
        ],
      },)
    }
    result.push({ type: "input", placeholder: "Поиск" })
    return result
  }

  get columns(): PropColumnTable<ShiftForTableItem>[] {
    const results: PropColumnTable<ShiftForTableItem>[] = [...this.baseColumns];
    if (this.type === "closings") {
      results.push({
        dataIndex: "status",
        key: "status",
        title: "Статус отправки",
        sorter: (a, b) => {
          if (a.status && b.status) {
            return a.status > b.status ? 1 : -1
          } else return 0
        },
      });
    }
    results.push({
      dataIndex: '',
      key: "action",
      title: "Действия",
      sorter: false,
      scopedSlots: { customRender: "action" },
    });
    return results
  }

  get isLoading(): boolean {
    return ShiftsHelper.isLoading;
  }

  get dataForTable(): {[key: string]: string | number}[] {
    const key = `${this.type}Shifts` as 'openingsShifts' | 'closingsShifts'
    const shifts: Map<string, Shift> | null = ShiftsHelper[key];
    let result: {[key: string]: string | number}[] = [];
    if (shifts) {
      for (let shift of shifts.values()) {
        result.push({
          key: shift.data_id,
          fsNumber: shift.fsNumber,
          rgNumber: shift.deviceRN,
          shiftNumber: shift.shiftNumber,
          date: getDate(shift.createdAt, "numeric"),
          status: shift.status
        });
      }
    }
    return result;
  }

  @Watch('type')
  watchType(): void {
    this.filteredData = null
  }

  showDetails(value: string): void {
    if (this.type === 'closings') {
      ShiftsHelper.selectedClosingShiftId = value
    } else if (this.type === 'openings') {
      ShiftsHelper.selectedOpeningShiftId = value
    } else {
      ShiftsHelper.selectedOpeningShiftId = null
      ShiftsHelper.selectedClosingShiftId = null
    }
    this.visible = true
  }


  hideModal(): void {
    ShiftsHelper.selectedOpeningShiftId = null
    ShiftsHelper.selectedClosingShiftId = null
    this.visible = false
  }

  search(str: string): void {
    if (str.length >= 2) {
      this.filteredData = this.dataForTable.filter((item) => {
        return (
          item.fsNumber.toString().includes(str) ||
          item.rgNumber.toString().includes(str) ||
          item.shiftNumber.toString().includes(str)
        );
      });
    } else this.filteredData = null;
  }
}
</script>

<style lang="scss" scoped></style>
<style lang="scss">
.anticon.anticon-eye {
  cursor: pointer;
  font-size: 20px;
  &:hover {
    color: #1890ff;
  }
}
</style>
`
