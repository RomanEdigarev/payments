<template>
  <div class="table-sorter">
    <div
      v-for="(sorterItem, index) in sorterItems"
      :key="index"
    >
      <a-range-picker
        v-if="sorterItem.type === 'range-picker'"
        :show-time="formatTime"
        :placeholder="sorterItem.placeholder"
        format="YYYY-MM-DD"
        class="range-picker"
        @change="onDateChange"
        @ok="$emit('filter', queryParams)"
      />
      <a-select
        :filterOption="true"
        v-else-if="sorterItem.type === 'select'"
       :style="{
          minWidth: '100px',
          width: '100%',
       }"
        :allowClear="true"
        :placeholder="sorterItem.placeholder"
        @change="onFilter($event, sorterItem.queryName)"
      >
        <a-select-option
          v-for="option in sorterItem.options"
          :value="option.value"
          :key="sorterItem.queryName + '=' + option.value"
        >
          {{ option.text }}
        </a-select-option>
      </a-select>
      <a-input-search
        v-if="sorterItem.type === 'input'"
        :placeholder="sorterItem.placeholder"
        @input="onSearch"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "TableSorter",
})
export default class TableSorter extends Vue {
  @Prop(Array) readonly sorterItems!: {
    type: string;
    queryName?: string;
    placeholder: string;
    options?: { value: string; text: string };
  }[];
  formatTime = {
    format: "HH:mm",
  };
  queryParams: { [key: string]: string } = {};

  onSearch(event: any): void {
    this.$emit("search", event.currentTarget.value);
  }

  onFilter(value: string, queryName: string): void {
    if (value && queryName) {
      this.queryParams[queryName] = value;
    } else {
      delete this.queryParams[queryName];
    }
    this.$emit("filter", this.queryParams);
  }

  onDateChange(_: unknown, arrayDate: string[]) {
    if (arrayDate[0] && arrayDate[1]) {
      this.queryParams.from = arrayDate[0];
      this.queryParams.to = arrayDate[1];
    } else {
      delete this.queryParams.from;
      delete this.queryParams.to;
      this.$emit("filter", this.queryParams);
    }
  }
}
</script>

<style lang="scss" scoped>
.table-sorter {
  display: flex;
  & > div {
    margin-right: 8px;
  }
  & > div:not(:first-child) {
    max-width: 186px;
    width: 100%;
  }
}
</style>
