<template>
  <a-modal
    ref="modal"
    class="cash-directory-orange-edit-modal"
    :visible="visible"
    title="Детали операции"
    width="535px"
    @cancel="cancel"
    @ok="submit"
  >
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: 10 }"
      :wrapper-col="{ span: 10 }"
    >
      <a-form-model-item ref="id" label="ID" prop="id">
        <a-input
          disabled
          :value="form.id"
          @blur="() => $refs.online_group_name.onFieldBlur()"
        />
      </a-form-model-item>
      <a-form-model-item ref="online_group_name" label="Наименование группы для онлайн оплат" prop="online_group_name">
        <a-input
          v-model="form.online_group_name"
          @blur="() => $refs.online_group_name.onFieldBlur()"
        />
      </a-form-model-item>
      <a-form-model-item ref="offline_group_name" label="Наименование группы для оплаты на месте" prop="offline_group_name">
        <a-input
          v-model="form.offline_group_name"
          @blur="() => $refs.offline_group_name.onFieldBlur()"
        />
      </a-form-model-item>
      <a-form-model-item ref="timezone_name" label="Часовой пояс" prop="timezone_name">
        <a-select
          v-model="form.timezone_name"
          @blur="() => $refs.timezone_name.onFieldBlur()"
        >
          <a-select-option value="Europe/Moscow">
            Europe/Moscow
          </a-select-option>
        </a-select>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import DirectoryShopsHelper from "@/helpers/directory/DirectoryShopsHelper";
import DirectoryOrangeHelper from "@/helpers/directory/DirectoryOrangeHelper";

@Component({
  name: "CashDirectoryOrangeEdit",
})
export default class CashDirectoryOrangeEdit extends Vue {
  @Prop({default: false}) readonly visible: boolean
  form: any = {
    id: this.selectedOrange?.id,
    online_group_name: '',
    offline_group_name: '',
    timezone_name: 'Europe/Moscow'
  }

  @Watch('selectedOrange')
  watchOrange(): void {
    this.form.id = this.selectedOrange?.id
    this.form.online_group_name = this.selectedOrange?.online_group_name
    this.form.offline_group_name = this.selectedOrange?.offline_group_name
  }

  get rules() {
    return {
      id: [
        { required: true, message: 'Обязательное поле', trigger: 'blur' },
      ],
      online_group_name: [
        { required: true, message: 'Обязательное поле', trigger: 'blur' },
      ],
      offline_group_name: [
        { required: true, message: 'Обязательное поле', trigger: 'blur' },
      ],
      timezone_name: [
        { required: true, message: 'Обязательное поле', trigger: 'blur' },
      ],
    }
  }

  get selectedOrange() {
    return DirectoryOrangeHelper.selectedOrange
  }

  cancel(): void {
    this.$emit('cancel')
  }

  async submit(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$refs.ruleForm.validate((valid) => {
      if (valid) {
        this.$emit('submit', this.form)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.cash-directory-orange-edit-modal {
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
  ::v-deep .ant-form-item-label {
    white-space: normal;
    line-height: 1.4;
    text-align: right
  }
  ::v-deep .ant-form-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
