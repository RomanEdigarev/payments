<template>
  <a-modal
    v-if="dataShift.selectedShift"
    class="cash-shifts-modal"
    :visible="visible"
    :title="dataShift.title"
    width="95%"
    @cancel="cancel"
  >
    <div v-if="type === 'closings'" class="cash-shifts-modal__btn">
      <a-button @click="resendShift">Отправить повторно</a-button>
    </div>
    <div class="cash-shifts-modal__attributes-container">
      <template v-for="entry in entries">
        <div class="cash-shifts-modal__attributes" :key="entry[0]">
          <div class="cash-shifts-modal__attributes__name">{{ entry[1] }}</div>
          <div class="cash-shifts-modal__attributes__value">
            {{ dataShift.selectedShift[entry[0]] || "&nbsp;" }}
          </div>
        </div>
      </template>
    </div>
    <template v-if="incomeEntries">
      <div class="cash-shifts-modal__subtitle">Приходные операции</div>
      <div class="cash-shifts-modal__attributes-container">
        <template v-for="entry in incomeEntries">
          <div class="cash-shifts-modal__attributes" :key="entry[0]">
            <div class="cash-shifts-modal__attributes__name">
              {{ entry[1] }}
            </div>
            <div class="cash-shifts-modal__attributes__value">
              {{ dataShift.selectedShift.incomeRefundStats[entry[0]] }}
            </div>
          </div>
        </template>
      </div>
    </template>
    <template v-if="outcomeEntries">
      <div class="cash-shifts-modal__subtitle">Расходные операции</div>
      <div class="cash-shifts-modal__attributes-container">
        <template v-for="entry in outcomeEntries">
          <div class="cash-shifts-modal__attributes" :key="entry[0]">
            <div class="cash-shifts-modal__attributes__name">
              {{ entry[1] }}
            </div>
            <div class="cash-shifts-modal__attributes__value">
              {{ dataShift.selectedShift.outcomeRefundStats[entry[0]] }}
            </div>
          </div>
        </template>
      </div>
    </template>
    <template slot="footer">
      <a-button key="back" @click="cancel"> Закрыть </a-button>
    </template>
  </a-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Payment } from "@/store/payments/types";
import ShiftsHelper from "@/helpers/shifts/ShiftsHelper";
import {
  ClosingsShiftsAttributes,
  ClosingsShiftsIncomeRefund,
  ClosingsShiftsOutcomeRefund,
  OpeningsShiftsAttributes,
  Shift,
} from "@/store/shifts/types";

@Component({
  name: "CashOperationsModal",
})
export default class CashOperationsModal extends Vue {
  @Prop() visible: boolean;
  @Prop() readonly type: "openings" | "closings";
  activeKey = "1";

  get dataShift(): { title: string; selectedShift: Shift | null } {
    const map = {
      closings: {
        title: "Атрибуты закрытия смены",
        selectedShift: ShiftsHelper.selectedClosingShift,
      },
      openings: {
        title: "Атрибуты открытия смены",
        selectedShift: ShiftsHelper.selectedOpeningShift,
      },
    };

    return map[this.type]!;
  }

  get entries(): [key: string, value: string][] {
    if (this.type === "closings") {
      return Object.entries(ClosingsShiftsAttributes);
    } else {
      return Object.entries(OpeningsShiftsAttributes);
    }
  }

  get incomeEntries(): [key: string, value: string][] | null {
    return this.type === "closings"
      ? Object.entries(ClosingsShiftsIncomeRefund)
      : null;
  }

  get outcomeEntries(): [key: string, value: string][] | null {
    return this.type === "closings"
      ? Object.entries(ClosingsShiftsOutcomeRefund)
      : null;
  }

  cancel(): void {
    this.$emit("cancel");
  }

  change(activeKey: string): void {
    this.activeKey = activeKey;
  }

  async resendShift(): Promise<void> {
    await ShiftsHelper.resendClosingsShift()
  }
}
</script>

<style lang="scss" scoped>
.cash-shifts-modal {
  max-height: 200px;
  &__extra-content {
    button:first-child {
      margin-right: 8px;
    }
  }

  &__attributes {
    &-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    display: grid;
    grid-template-columns: 250px 316px;
    align-items: center;
    row-gap: 24px;
    margin-bottom: 10px;
    & :nth-child(2n - 1) {
      justify-self: end;
    }

    &__name {
      text-align: end;
    }

    &__value {
      padding: 5px 12px;
      margin-left: 8px;
      border: 1px solid #d9d9d9;
    }
  }

  &__subtitle {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    margin: 8px;
  }

  &__btn {
    text-align: right;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid lightgray;
  }

  ::v-deep .ant-tabs-tabpane {
    max-height: 538px;
    overflow-y: auto;
  }
}
</style>
