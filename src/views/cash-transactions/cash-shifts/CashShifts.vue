<template>
  <div class="cash-shifts">
    <div class="cash-shifts__header">
      <span class="cash-shifts__title">Смены</span>
      <a-tabs
        class="cash-shifts__navigation"
        default-active-key="openings"
        @change="changeTab"
      >
        <a-tab-pane key="openings" tab="Открытие смены"> </a-tab-pane>
        <a-tab-pane key="closings" tab="Закрытие смены"> </a-tab-pane>
      </a-tabs>
    </div>
    <div class="cash-shifts__body">
      <CashShiftsTable
        :type="currentTab"
        @filter="filter"
        @change-page="filter"
        @change-page-size="filter"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ShiftsHelper from "@/helpers/shifts/ShiftsHelper";
import CashShiftsTable from "./table/CashShiftsTable.vue";
import CashShiftsModal from "./modal/CashShiftsModal.vue";
import { ShiftsQueryParams } from "@/store/shifts/types";

@Component({
  name: "CashShifts",
  components: { CashShiftsTable, CashShiftsModal },
})
export default class CashShifts extends Vue {
  currentTab = "openings";
  visible = false;
  query: ShiftsQueryParams | undefined = undefined;


  async created(): Promise<void> {
   await this.fetchData()
  }

  async fetchData(): Promise<void> {
    if (this.currentTab === 'closings') {
      await ShiftsHelper.fetchClosingsShifts(this.query);
    } else {
      await ShiftsHelper.fetchOpeningsShifts(this.query);
    }
  }

  async changeTab(key: string): Promise<void> {
    this.currentTab = key;
    this.query = undefined
    await this.fetchData()
  }

  async filter(query: ShiftsQueryParams): Promise<void> {
    this.query = query;
    await this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
.cash-shifts {
  &__header {
    padding: 20px 24px 0 20px;
    background-color: white;
  }
  &__navigation {
    ::v-deep .ant-tabs-bar {
      margin-bottom: 0;
    }
  }
  &__title {
    display: inline-block;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 30px;
  }
  &__body {
    height: 100%;
    margin: 16px 23px;
    background-color: white;
  }
  &__table {
    padding: 16px;
  }
}
</style>
