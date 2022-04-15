
// Настройки колонок таблицы на основе api ant
// https://www.antdv.com/components/table/#Column
export interface PropColumnTable<T = any> {
  title: string;
  sorter?: ((a:T, b: T) => number) | boolean;
  dataIndex?: string;
  key?: string;
  scopedSlots?: { customRender?: string },
  width?: string|number
}





