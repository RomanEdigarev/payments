<template>
  <div class="base-table">
    <TableSorter
      class="base-table__sorter"
      v-if="sorterItems"
      :sorter-items="sorterItems"
      @search="$emit('search', $event)"
      @filter="$emit('filter', $event)"
    />
    <a-table
      class="base-table"
      :columns="columns"
      :data-source="dataForTable"
      :loading="loading"
      :pagination="false"
    >
      <div
        v-for="slot in slots"
        :slot="slot"
        slot-scope="text, record"
        :key="slot"
      >
        <slot
          :name="slot"
          :row="record"
        ></slot>
      </div>
    </a-table>
    <a-pagination
      show-size-changer
      :total="total || 500"
      :pageSizeOptions="pageSizeOptions"
      :defaultPageSize="50"
      @change="onChangePage"
      @showSizeChange="onShowSizeChange"
    >
      <template
        slot="buildOptionText"
        slot-scope="props"
      >
        <span>{{ props.value }}/на странице</span>
      </template>
    </a-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { TableSorter } from "@/components";

@Component({
  name: "BaseTable",
  components: { TableSorter },
})
export default class CashOperations extends Vue {
  @Prop(Array) readonly sorterItems: {
    type: string;
    placeholder: string;
    options?: { value: string; text: string };
  }[];
  @Prop(Array) readonly columns: [];
  @Prop(Array) readonly dataForTable: [];
  @Prop(Boolean) readonly loading: boolean;
  @Prop(Array) readonly pageSizeOptions: string[];
  @Prop(Number) readonly total: number;
  query = {
    limit: 50,
    offset: 0,
  };

  get slots(): string[] {
    return this.columns
      .map(
        (item: { scopedSlots: { customRender: string } }) =>
          item.scopedSlots?.customRender
      )
      .filter((i: unknown) => i);
  }

  onChangePage(value: number): void {
    this.query.offset = (value - 1) * 10;
    this.$emit("change-page", this.query);
  }
  onShowSizeChange(_: unknown, v2: number): void {
    this.query.limit = v2;
    this.$emit("change-page-size", this.query);
  }
}
</script>

<style lang="scss" scoped>
.base-table {
  padding-bottom: 16px;
  &__sorter {
    margin-bottom: 16px;
    padding: 16px;
  }
}
</style>
