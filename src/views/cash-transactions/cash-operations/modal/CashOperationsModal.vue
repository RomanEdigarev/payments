<template>
  <a-modal
    v-if="selectedPayment"
    class="cash-operations-modal"
    :visible="visible"
    title="Детали операции"
    width="95%"
    @cancel="cancel"
  >
    <div>
      <a-tabs default-active-key="1" @change="change">
        <a-tab-pane key="1" tab="Эквайринг">
          <div class="cash-operations-modal__payment-method">
            <template
              class="cash-operations-modal__payment-method__item"
              v-for="(value, index) in Object.keys(
                selectedPayment.payment_method
              )"
            >
              <template v-if="selectedPayment.payment_method[value]">
                <div
                  class="cash-operations-modal__payment-method__name"
                  :key="selectedPayment.id + rusNameForValues[value]"
                >
                  {{ rusNameForValues[value] }}
                </div>
                <div
                  class="cash-operations-modal__payment-method__value"
                  :key="selectedPayment.id + value + index"
                >
                  {{ selectedPayment.payment_method[value] }}
                </div>
              </template>
            </template>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Фискализация" force-render>
          <div v-if="selectedPayment.cheques && selectedPayment.cheques.length > 0">
            <a-collapse>
              <a-collapse-panel
                v-for="item in selectedPayment.cheques"
                :key="item.id"
                :header="item.cheque_type"
              >
                <pre>
                  {{ JSON.stringify(item, null, 4) }}
                </pre>
              </a-collapse-panel>
            </a-collapse>
          </div>
          <div v-else>
            <h2>Чеки отсуствуют</h2>
          </div>
        </a-tab-pane>
        <a-tab-pane key="3" tab="Трансфер">
          <pre>
             {{ JSON.stringify(selectedPayment.transfer, null, 4) }}
          </pre>
        </a-tab-pane>
        <div
          v-if="activeKey === '1'"
          class="cash-operations-modal__extra-content"
          slot="tabBarExtraContent"
        >
          <a-button @click="cancelHold">
            Отменить холдирование
          </a-button>
          <a-button type="primary" @click="confirmHold">
            Подтвердить холдирование/списать
          </a-button>
        </div>
      </a-tabs>
    </div>
    <template slot="footer">
      <a-button key="back" @click="cancel"> Закрыть </a-button>
    </template>
  </a-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PaymentsHelper from "@/helpers/payments/PaymentsHelper";
import { Payment } from "@/store/payments/types";

@Component({
  name: "CashOperationsModal",
})
export default class CashOperationsModal extends Vue {
  @Prop() visible: boolean;
  activeKey = "1";
  rusNameForValues: { [key in keyof Payment["payment_method"]]: string } = {
    card: "card",
    client_id: "client_id",
    created_at: "Дата формирования документа",
    id: "ID",
    method: "Метод",
    payload: "payload",
    updated_at: "updated_at",
  };

  cancel(): void {
    this.$emit("cancel");
  }

  change(activeKey: string): void {
    this.activeKey = activeKey;
  }

  async confirmHold(): Promise<void> {
    this.$confirm({
      title: 'Вы уверены, что хотите подтвердить холдирование/списать?',
      cancelText: 'Отмена',
      onOk: async () => {
        await PaymentsHelper.fetchConfirmHold();
      },
    })
  }

  async cancelHold(): Promise<void> {
    this.$confirm({
      title: 'Вы уверены, что хотите отменить холдирование?',
      cancelText: 'Отмена',
      onOk: async () => {
        await PaymentsHelper.fetchCancelHold();
      },
    })
  }

  get selectedPayment(): Payment | undefined {
    return PaymentsHelper.selectedPayment;
  }
}
</script>

<style lang="scss" scoped>
.cash-operations-modal {
  max-height: 200px;
  &__extra-content {
    button:first-child {
      margin-right: 8px;
    }
  }

  &__payment-method {
    display: grid;
    grid-template-columns: max-content 316px;
    align-items: center;
    row-gap: 24px;
    & :nth-child(2n - 1) {
      justify-self: end;
    }

    &__value {
      padding: 5px 12px;
      margin-left: 8px;
      border: 1px solid #d9d9d9;
    }
  }

  ::v-deep .ant-tabs-tabpane {
    max-height: 538px;
    overflow-y: auto;
  }
}
</style>
