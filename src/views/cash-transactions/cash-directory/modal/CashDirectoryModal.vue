<template>
  <a-modal
      ref="modal"
      v-if="selectedShop"
      class="cash-directory-modal"
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
        :label-col="{ span: 12 }"
        :wrapper-col="{ span: 10 }"
    >
      <a-form-model-item ref="id" label="ID ГУ Orangedata" prop="id">
        <a-input
            :value="selectedShop.fiscal_device_group_id"
            @blur="() => $refs.id.onFieldBlur()"
        />
      </a-form-model-item>
      <a-form-model-item ref="shopcode" label="Корпоративный код магазина" prop="shopcode">
        <a-input
            v-model="form.shopcode"
            @blur="() => $refs.shopcode.onFieldBlur()"
        />
      </a-form-model-item>
      <a-form-model-item ref="timezone" label="Часовой пояс" prop="timezone">
        <a-select
            v-model="form.timezone"
            @blur="() => $refs.timezone.onFieldBlur()"
        >
          <a-select-option value="+2">
            +2
          </a-select-option>
          <a-select-option value="+3">
            +3
          </a-select-option>
        </a-select>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import DirectoryShopsHelper from "@/helpers/directory/DirectoryShopsHelper";

@Component({
  name: "CashDirectoryModal",
})
export default class CashDirectoryModal extends Vue {
  @Prop({default: false}) readonly visible: boolean
  form: any = {
    id: this.selectedShop?.id,
    shopcode: '',
    timezone: '+3'
  }

  updated(): void {
    this.form.id = this.selectedShop?.id
  }

  get rules() {
    return {
      id: [
        { required: true, message: 'Обязательное поле', trigger: 'blur' },
      ],
      shopcode: [
        { required: true, message: 'Обязательное поле', trigger: 'blur' },
      ],
      timezone: [
        { required: true, message: 'Обязательное поле', trigger: 'blur' },
      ],
    }
  }

  get selectedShop() {
    return DirectoryShopsHelper.selectedShop
  }

  cancel(): void {
   this.$emit('cancel')
  }

  async submit(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$refs.ruleForm.validate((valid) => {
      if (valid) {
        this.$emit('submit', {fiscal_device_group_id: this.selectedShop?.fiscal_device_group_id, shop_code: this.form.shopcode})
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.cash-directory-modal {
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
