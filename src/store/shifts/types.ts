import {ShiftApi, ShiftsQueryParamsApi} from "@/api/services/shifts/models";
export type Shift = ShiftApi;
export type ShiftsQueryParams = ShiftsQueryParamsApi
export type ShiftsState = {
  isLoading: boolean;
  openingsShifts: {
    items: Map<string, Shift> | null;
    selectedOpeningShiftId: string | null;
  };
  closingsShifts: {
    items: Map<string, Shift> | null;
    selectedClosingsShiftId: string | null;
  };
};

export enum OpeningsShiftsAttributes {
  data_id = "Идентификатор докумета",
  companyINN = "ИНН организации",
  groupId = "Идентификатор магазина(группа)",
  group = "Имя группы",
  data_created_at = "Дата поступления документа, дата записи в БД",
  deviceSN = "Заводской номер устройства, пробившего чек",
  deviceRN = "Регистрационный номер устройства пробившего чек",
  fsNumber = "Заводской номер фискального накопителя",
  deviceModel = "Наименование ККТ",
  shiftNumber = "Номер смены",
  shiftOpenedAt = "Дата открытия смены",
  fsDocumentNumber = "Номер ФД",
  fp = "Фискальный признак",
}

export enum ClosingsShiftsAttributes {
  status = "Статус отправки операции",
  createdAt = "Дата поступления документа, дата записи в БД",
  id = "ID",
  deviceSN = "Серийный номер устройства пробившего чек",
  kkm_serial = "Краткий серийный номер устройства пробившего чек",
  deviceName = "Наименование ККТ",
  shiftNumber = "Номер смены",
  shiftOpenedAt = "Дата открытия смены",
  shiftClosedAt = "Дата закрытия смены",
  fsDocumentNumber = "Номер ФД",
  cashSumRestStart = "Необнуляемый остаток начало дня",
  cashSumRestEnd = "Необнуляемый остаток конец дня",
  key_code = "Код сотрудника",
}

export enum ClosingsShiftsIncomeRefund {
  cashSum = "сумма наличными, приход",
  electronicSum = "сумма электронными, приход",
  vat1Sum = "сумма без НДС",
  vat2Sum = "сумма НДС 0%",
  vat3Sum = "сумма НДС 10%",
  vat4Sum = "сумма НДС 20%",
  vat5Sum = "сумма расчетного НДС",
  vat6Sum = "сумма расчетного НДС",
}

export enum ClosingsShiftsOutcomeRefund {
  cashSum = "сумма наличными, расход",
  electronicSum = "сумма электронными, расход",
  vat1Sum = "сумма без НДС",
  vat2Sum = "сумма НДС 0%",
  vat3Sum = "сумма НДС 10%",
  vat4Sum = "сумма НДС 20%",
  vat5Sum = "сумма расчетного НДС 10%",
  vat6Sum = "сумма расчетного НДС 20%"
}

export type ShiftForTableItem = {
  date: string
  fsNumber: string
  key: string
  rgNumber: string
  shiftNumber: number
  status: undefined | string
}
