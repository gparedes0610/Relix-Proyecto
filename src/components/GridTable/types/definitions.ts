import { IRowData, Key } from "./data";
import { ICellParams } from "./rest";

export interface IRowsDefinition {
  idKey: string;
  rowHeight: string;
  rowEvents: {};
  rowRender: (params: { children: React.ReactNode }) => React.ReactNode;
  rowHeadHeight: string;
  rowHeadEvents: {};
  rowHeadRender: (params: { children: React.ReactNode }) => React.ReactNode;
}

//#region For body cells without data only format
export interface IEmptyColumnDefinition {
  value?: any;
  values?: {
    [key: Key]: any;
  };
  setValues?: (values: { [key: Key]: any }) => Promise<void> | void;
  getValue?: (rowData: IRowData, callback?: Function) => any;
}
//#endregion For body cells without data only format

export interface IColumnDefinition extends IEmptyColumnDefinition {
  key: string;
  label: string;

  order: number;
  filter: boolean;
  sort: boolean;
  show: boolean;
  sorted: boolean;

  columnEvents: {};

  events: {};
  render: (param: ICellParams) => React.ReactNode;

  width: string; // min-width | max-width | width -> same for hegith
  cellHeadEvents: {};
  cellHeadRender: () => React.ReactNode;
}

export type IColumnsDefinition = IColumnDefinition[];

export interface IDefinitions {
  rowsDefinition: IRowsDefinition;
  columnsDefinition: IColumnsDefinition;
}
