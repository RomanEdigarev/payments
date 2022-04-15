<template>
  <a-modal
    :visible="visible"
    title="Добавить запись"
    width="535px"
    @ok="ok"
    @cancel="cancel"
  >
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: 12 }"
      :wrapper-col="{ span: 10 }"
    >
      <a-form-model-item ref="fiscal_device_group_id" label="ID Фискальной группы" prop="fiscal_device_group_id">
        <a-select v-if="fiscalDeviceGroupIds" v-model="form.fiscal_device_group_id" placeholder="ID Фискальной группы">
          <a-select-option v-for="id in fiscalDeviceGroupIds" :value="id" :key="id">
            {{ id }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item ref="shop_code" label="Корпоративный код магазина" prop="shop_code">
        <a-input
            v-model="form.shop_code"
            @blur="() => $refs.shop_code.onFieldBlur()"
        />
      </a-form-model-item>
      <a-form-model-item  ref="timezone" label="Часовой пояс" prop="timezone">
        <a-select
            disabled
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
  name: "CashAddDirectoryModal",
})
export default class CashAddDirectoryModal extends Vue {
  @Prop({ default: false }) readonly visible: boolean;
  form: any = {
    shop_code: "",
    fiscal_device_group_id: ""
  };

  rules = {
    shop_code: [
      { required: true, message: "Обязательное поле", trigger: "blur" },
    ],
    fiscal_device_group_id: [
      { required: true, message: "Обязательное поле", trigger: 'change' },
    ],
  };

  get fiscalDeviceGroupIds(): string[] | null {
    return DirectoryShopsHelper.fiscalDeviceGroupIds
  }

  ok(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$refs.ruleForm.validate((valid) => {
      if (valid) {
        this.$emit("ok", this.form);
      }
    })
  }

  cancel(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$refs.ruleForm.resetFields();
    this.$emit("cancel");
  }
}
</script>

<style lang="scss" scoped></style>
