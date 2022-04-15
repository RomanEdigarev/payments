<template>
  <div class="cash-directory">
    <div class="cash-directory__header">
      <span class="cash-directory__title">Справочники</span>
      <div class="cash-directory__actions">
        <a-input-search
            placeholder="Поиск"
            style="width: 200px"
            @search="onSearch"
        />
        <a-button type="primary" disabled> Импорт </a-button>
        <a-button type="primary" @click="onAddDirectory"> Добавить запись </a-button>
      </div>
      <a-tabs class="cash-directory__navigation" default-active-key="shops" @change="changeTab">
        <a-tab-pane key="orangedata" tab="Группы устройств Orangedata"> </a-tab-pane>
        <a-tab-pane key="shops" tab="Магазины"> </a-tab-pane>
      </a-tabs>
    </div>
    <div class="cash-directory__body">
      <div class="cash-directory__table">
        <CashDirectoryOrangeTable v-if="type === 'orangedata'" />
        <CashDirectoryTable v-else ref="table" :type="'shops'"/>
      </div>
    </div>
      <CashAddDirectoryModal :visible="visible" @cancel="cancelEdit" @ok="submit"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CashDirectoryTable from "./table/CashDirectoryTable.vue";
import CashAddDirectoryModal from "./modal/CashAddDirectoryModal.vue";
import DirectoryShopsHelper from "@/helpers/directory/DirectoryShopsHelper";
import CashDirectoryOrangeTable from "./table/CashDirectoryOrangeTable.vue";

@Component({
  name: "CashDirectory",
  components: { CashDirectoryTable, CashAddDirectoryModal, CashDirectoryOrangeTable },
})
export default class CashDirectory extends Vue {
  visible = false
  type = 'shops'

  onSearch(value: string): void {
    console.log(value);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    console.log(this.$refs.table.search(value))
  }

  changeTab(key: string): void {
    this.type = key
    console.log(this.type)
  }

  onAddDirectory(): void {
    this.visible = true
  }

  cancelEdit(): void {
    console.log('cancel add directory')
    this.visible = false
  }

  async submit(form: any): Promise<void> {
    this.visible = false
    await DirectoryShopsHelper.fetchAddDirectory(form)
  }
}
</script>

<style lang="scss" scoped>
.cash-directory {
  &__header {
    padding: 20px 24px 0 20px;
    background-color: white;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  &__actions {
    margin-bottom: 30px;
    & > * {
      margin-left: 8px;
    }
  }
  &__navigation {
    width: 100%;
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

.cash-directory {
  .ant-tabs-bar {
    margin-bottom: 0;
  }
}

</style>
