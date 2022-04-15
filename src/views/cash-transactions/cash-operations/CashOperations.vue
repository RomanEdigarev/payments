<template>
  <div class="cash-operations">
    <div class="cash-operations__header">
      <span class="cash-operations__title">Операции</span>
      <div class="cash-operations__actions">
        <a-button type="primary" disabled> Создать операцию </a-button>
      </div>
    </div>
    <div class="cash-operations__body">
      <div class="cash-operations__table">
        <div class="cash-operations__table__sorter">
          <BaseTable
            :sorter-items="sorterItems"
            :columns="columns"
            :data-for-table="filteredData || dataForTable"
            :loading="isLoading"
            :total="total"
            :page-size-options="['10', '20', '30', '40', '50']"
            @filter="onFilter"
            @change-page="onChangePage"
            @change-page-size="onShowSizeChange"
            @search="search"
          >
            <template v-slot:action="scopedProps">
              <a-icon @click="showDetails(scopedProps.row.key)" type="eye" />
            </template>
            <template v-slot:paymentStatus="scopedProps">
              <a-badge
                :color="scopedProps.row.paymentStatus.color"
                :text="scopedProps.row.paymentStatus.text"
              />
            </template>
            <template v-slot:fiscalizationStatus="scopedProps">
              <a-badge
                :color="scopedProps.row.fiscalizationStatus.color"
                :text="scopedProps.row.fiscalizationStatus.text"
              />
            </template>
            <template v-slot:operationStatus="scopedProps">
              <a-badge
                :color="scopedProps.row.operationStatus.color"
                :text="scopedProps.row.operationStatus.text"
              />
            </template>
          </BaseTable>
        </div>
      </div>
    </div>
    <CashOperationsModal :visible="visibleDetails" @cancel="closeDetails" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { TableSorter, BaseTable } from "@/components";
import PaymentsHelper from "@/helpers/payments/PaymentsHelper";
import CashOperationsModal from "./modal/CashOperationsModal.vue";
import { PaymentsState } from "@/store/payments/types";
import { getDate } from "@/utils/getDate";

@Component({
  name: "CashOperations",
  components: { TableSorter, BaseTable, CashOperationsModal },
})
export default class CashOperations extends Vue {
  sorterItems = [
    {
      type: "range-picker",
      queryName: "fromTo",
      placeholder: ["С даты", "По дату"],
    },
    {
      type: "select",
      queryName: "paymentState",
      placeholder: "Статус платежа",
      options: [
          { value: "unknown", text: "Неизвестно" },
          { value: "error", text: "Ошибка" },
          { value: "created", text: "Создан" },
          { value: "on_hold", text: "Захолдировано" },
          { value: "partial_confirm", text: "Частично захолдировано" },
          { value: "confirmed", text: "Оплачено" },
          { value: "cancelled", text: "Отменено" },
          { value: "partial_refund", text: "Частичный возврат" },
          { value: "refund", text: "Полный возврат" },
      ],
    },
    {
      type: "select",
      queryName: "fiscalizationStatus",
      placeholder: "Статус фискализации",
      options: [
        { value: "new", text: "Новый" },
        { value: "pending", text: "Запрос на создание ФД отправлен" },
        { value: "error", text: "Ошибка" },
        { value: "success", text: "ФД Создан" },
      ],
    },
    {
      type: "select",
      queryName: "transferStatus",
      placeholder: "Статус операции",
      options: [
        { value: "created", text: "Создается" },
        { value: "new", text: "Добавлена в очередь на отправку" },
        { value: "sent", text: "Отправлена" },
      ],
    },
    {
      type: "input",
      placeholder: "Поиск",
    },
  ];
  columns = [
    {
      dataIndex: "number",
      key: "number",
      title: "Номер заказа",
      sorter: (a: any, b: any) => {
        return a.number > b.number ? -1 : 1;
      },
    },
    {
      dataIndex: "date",
      key: "date",
      title: "Дата заказа",
      sorter: (a: any, b: any) => {
        return getDate(a.date) > getDate(b.date) ? -1 : 1;
      }
    },
    {
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      title: "Статус платежа",
      sorter: (a: any, b: any) => {
        return a.paymentStatus.text > b.paymentStatus.text ? -1 : 1;
      },
      scopedSlots: { customRender: "paymentStatus" },
    },
    {
      dataIndex: "fiscalizationStatus",
      key: "fiscalizationStatus",
      title: "Статус фискализации",
      sorter: (a: any, b: any) => {
        return a.fiscalizationStatus.text > b.fiscalizationStatus.text ? -1 : 1;
      },
      scopedSlots: { customRender: "fiscalizationStatus" },
    },
    {
      dataIndex: "operationStatus",
      key: "operationStatus",
      title: "Статус операции",
      sorter: (a: any, b: any) => {
        return a.operationStatus.text > b.operationStatus.text ? -1 : 1;
      },
      scopedSlots: { customRender: "operationStatus" },
    },
    {
      key: "action",
      title: "Действия",
      scopedSlots: { customRender: "action" },
    },
  ];
  visibleDetails = false;
  filteredData: any = null

  async mounted(): Promise<void> {
    await PaymentsHelper.fetchPayments();
  }

  get isLoading(): boolean {
    return PaymentsHelper.isLoading;
  }

  get total(): PaymentsState['total'] {
    return PaymentsHelper.total
  }

  get dataForTable() {
    const payments = PaymentsHelper.payments;
    let result = [];
    if (payments) {
      for (let payment of payments.values()) {
        result.push({
          key: payment.id,
          number: payment.order_number,
          date: getDate(payment.created_at, "numeric"),
          paymentStatus: PaymentsHelper.getOperationStatusType(payment.state),
          fiscalizationStatus: payment.cheques
            ? PaymentsHelper.getOperationStatusType(
                payment.cheques[payment.cheques.length - 1].state
              )
            : { color: "red", text: "Статус неизвестен" },
          operationStatus: payment.transfer
            ? PaymentsHelper.getOperationStatusType(payment.transfer.state)
            : { color: "red", text: "Статус неизвестен" },
        });
      }
    }
    return result;
  }

  showDetails(paymentId: string): void {
    this.visibleDetails = true;
    PaymentsHelper.selectedPaymentId = paymentId;
  }
  closeDetails(): void {
    this.visibleDetails = false;
    PaymentsHelper.selectedPaymentId = null;
  }

  search(str: string): void {
    if (str.length >=3) {
      this.filteredData = this.dataForTable.filter((item) => {
        return item.paymentStatus.text.toString().toLowerCase().includes(str.toLowerCase()) ||
            item.date.toString().toLowerCase().includes(str.toLowerCase()) ||
            item.number.toString().toLowerCase().includes(str.toLowerCase()) ||
            item.operationStatus.text.toString().toLowerCase().includes(str.toLowerCase()) ||
            item.fiscalizationStatus.text.toString().toLowerCase().includes(str.toLowerCase())
      })
    } else {
      this.filteredData = null
    }
  }

  onFilter(value: any): void {
    PaymentsHelper.fetchPayments(value)
  }

  async onChangePage(query: {limit: number, offset: number}): Promise<void> {
    await PaymentsHelper.fetchPayments({ ...query });
  }

  async onShowSizeChange(query: {limit: number, offset: number}): Promise<void> {
    await PaymentsHelper.fetchPayments({ ...query });
  }
}
</script>

<style lang="scss" scoped>
.cash-operations {
  &__header {
    padding: 20px 24px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__title {
    display: inline-block;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
  }
  &__body {
    height: 100%;
    margin: 16px 23px;
    background-color: white;
  }
  &__table {
    padding: 16px;
  }
  &__details-modal {
    width: 100%;
    max-width: 100px;
    ::v-deep .ant-modal {
      &-content {
        max-width: 1372px;
        margin: 0 auto;
      }
    }
  }
}
</style>
<style lang="scss">
.anticon.anticon-eye {
  cursor: pointer;
  font-size: 20px;
  &:hover {
    color: #1890ff;
  }
}
</style>
