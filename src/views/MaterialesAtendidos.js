import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

function MaterialesAtendidos() {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [hidecolumn, setHidecolumn] = useState(false);

  const [rowData, setRowData] = useState([
    {
      codproveedor: "",
      descripcionerp: "COMPLETE GRAVEL FILTER SYSTEM 7x36",
      cr: "",
      punit: 23372.43,
      subtotal: 23372.43,
      rq: "RQ_2120_16",
      pd2: "PD2_938",
      ngr: "002-2999",
      cantatendida: 1,
      ngr2: "002-3026",
      cantatendida2: 1,
      totalcantidad: 1,
      cantporatender: 1,
    },
    {
      codproveedor: "0510010001",
      descripcionerp: "SAGIV BALL VALVE 2 M*F LONG SAL 200",
      cr: "",
      punit: 27.5,
      subtotal: 110.0,
      rq: "RQ_2120_01",
      pd2: "PD2_921",
      ngr: "002-3000",
      cantatendida: 2,
      ngr2: "002-3025",
      cantatendida2: 1,
      totalcantidad: 3,
      cantporatender: 1,
    },
  ]);
  const columnDefs = [
    { headerName: "Codigo Proveedor", field: "codproveedor" },
    { headerName: "Descripcion ERP", field: "descripcionerp" },
    { headerName: "Cant Requerida", field: "cr" },
    { headerName: "P.Unit", field: "punit" },
    { headerName: "SubTotal", field: "subtotal" },
    { headerName: "RQ", field: "rq" },
    { headerName: "PD2", field: "pd2" },
    {
      headerName: "N GR 1",
      field: "ngr",
      cellStyle: (params) =>
        params.value ? { background: "#00B2CA", color: "white" } : null,
    },
    {
      headerName: "Cant Atendida",
      field: "cantatendida",
      cellStyle: (params) =>
        params.value ? { background: "#00B2CA", color: "white" } : null,
    },
    {
      headerName: "N GR 2",
      field: "ngr2",
      cellStyle: (params) =>
        params.value ? { background: "#00B2CA", color: "white" } : null,
    },
    {
      headerName: "Cant Atendida",
      field: "cantatendida2",
      cellStyle: (params) =>
        params.value ? { background: "#00B2CA", color: "white" } : null,
    },
    {
      headerName: "Total Cant Atendida",
      field: "totalcantidad",
      hide: hidecolumn,
      cellStyle: (params) => (params.value ? { background: "yellow" } : null),
    },
    {
      headerName: "Cant por atender",
      field: "cantporatender",
      hide: hidecolumn,
      cellStyle: (params) => (params.value ? { background: "yellow" } : null),
    },
  ];

  const defaultColDef = {
    sortable: true,
  };

  const onGridReady = (params) => {
    console.log("estoy en onGridReady", params);
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const showcolumn = () => {
    console.log("clickeo");
    gridColumnApi.setColumnVisible("totalcantidad", setHidecolumn(!hidecolumn));
    gridColumnApi.setColumnVisible(
      "cantporatender",
      setHidecolumn(!hidecolumn)
    );
  };

  return (
    <div className="container">
      <button className="btn btn-primary" onClick={() => showcolumn()}>
        Mostrar y/o Ocultar
      </button>
      <div
        id="myGrid"
        className="ag-theme-alpine"
        style={{ height: 400, width: "100%" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
}

export default MaterialesAtendidos;
