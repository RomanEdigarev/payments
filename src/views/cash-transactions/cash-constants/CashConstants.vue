<template>
  <div class="cash-constants">
    <div class="cash-constants__header">
      <span class="cash-constants__title">Константы</span>
      <div class="cash-constants__actions">
        <a-button @click="cancel"> Отменить </a-button>
        <a-button type="primary" @click="save"> Сохранить </a-button>
      </div>
    </div>

    <div class="cash-constants__body" v-if="constants">
      <a-form-model ref="form" :model="form" :label-col="{ span: 10 }" :wrapper-col="{ span: 10 }">
        <a-form-model-item
          v-for="(value, name) in form"
          :ref="name"
          :label="name"
          :prop="name"
          :key="name"
          :rules="{ required: true, message: 'Обязательное поле', trigger: 'blur' }"
        >
          <a-input v-if="name" v-model="form[name]" />
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import CashConstantsHelper from "@/helpers/constants/CashConstantsHelper";
import { CashConstantState } from "@/store/constants/types";

@Component({
  name: "CashConstants",
})
export default class CashConstants extends Vue {
  form: {[key: string]: string} = {};

  @Watch("constants")
  watchConstants(): void {
    if (this.constants) {
      for (let [key, item] of this.constants) {
        this.form[key] = item.value;
        this.form = { ...this.form };
      }
    }
  }

  async created(): Promise<void> {
    await CashConstantsHelper.fetchConstants();
  }

  get constants(): CashConstantState["items"] {
    return CashConstantsHelper.constants;
  }

  async cancel(): Promise<void> {
    await CashConstantsHelper.fetchConstants();
  }

  save(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$refs.form.validate((valid) => {
      if (valid) {
        CashConstantsHelper.saveConstants(this.form);
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.cash-constants {
  height: 100%;
  display: flex;
  flex-direction: column;
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
  &__title {
    display: inline-block;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
  }
  &__body {
    display: flex;
    padding: 20px;
    height: 100%;
    margin: 16px 23px;
    background-color: white;
  }
}
</style>
