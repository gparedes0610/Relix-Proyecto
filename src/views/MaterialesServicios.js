import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

function MaterialesServicios() {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [hidecolumn, setHidecolumn] = useState(false);

  const [rowData, setRowData] = useState([
    {
      item: 1,
      partida: "Partida",
      subpartida: "Subpartida",
      marca: "YAMIT",
      coderp: 340010019,
      codproveedor: 0,
      descripcionerp: "COMPLETE GRAVEL FILTER SYSTEM 7x36",
      cantidadreq: 1,
      punitario: 23372.43,
      subtotal: 23372.43,
      rq: "RQ_2120_16",
      pd2: "PD2_938",
      ngrvalorizada: "002-XXX",
      cantvalorizada: 1,
      valorizado: 23372.43,
      ngrvalorizada2: "",
      cantvalorizada2: "",
      valorizado2: "",
      canttotalvalorizada: 1,
      cantporvalorizar: "",
      saldoporvalorizar: "",
    },
    {
      item: 1,
      partida: "Partida",
      subpartida: "Subpartida",
      marca: "YAMIT",
      coderp: 340010019,
      codproveedor: 0,
      descripcionerp: "COMPLETE GRAVEL FILTER SYSTEM 7x36",
      cantidadreq: 1,
      punitario: 23372.43,
      subtotal: 23372.43,
      rq: "RQ_2120_16",
      pd2: "PD2_938",
      ngrvalorizada: "002-XXX",
      cantvalorizada: 1,
      valorizado: 23372.43,
      ngrvalorizada2: "",
      cantvalorizada2: "",
      valorizado2: "",
      canttotalvalorizada: 1,
      cantporvalorizar: "",
      saldoporvalorizar: "",
    },
    {
      item: 1,
      partida: "Partida",
      subpartida: "Subpartida",
      marca: "YAMIT",
      coderp: 340010019,
      codproveedor: 0,
      descripcionerp: "COMPLETE GRAVEL FILTER SYSTEM 7x36",
      cantidadreq: 1,
      punitario: 23372.43,
      subtotal: 23372.43,
      rq: "RQ_2120_16",
      pd2: "PD2_938",
      ngrvalorizada: "002-XXX",
      cantvalorizada: 1,
      valorizado: 23372.43,
      ngrvalorizada2: "",
      cantvalorizada2: "",
      valorizado2: "",
      canttotalvalorizada: 1,
      cantporvalorizar: "",
      saldoporvalorizar: "",
    },
  ]);

  const columnDefs = [
    { headerName: "Item", field: "item" },
    {
      headerName: "Partida",
      field: "partida",
    },
    {
      headerName: "Sub-partida",
      field: "subpartida",
    },
    { headerName: "Marca", field: "marca" },
    { headerName: "Codigo ERP", field: "coderp" },
    { headerName: "Codigo Proveedor", field: "codproveedor" },
    { headerName: "Descripcion ERP", field: "descripcionerp" },
    { headerName: "Cantidad Requerida", field: "cantidadreq" },
    { headerName: "P.Unitario", field: "punitario" },
    { headerName: "SubTotal", field: "subtotal" },
    { headerName: "RQ", field: "rq" },
    { headerName: "PD2", field: "pd2" },
    {
      headerName: "N GR 1 Valorizada",
      field: "ngrvalorizada",
      cellStyle: (params) =>
        params.value ? { background: "#3CB371", color: "white" } : null,
    },
    {
      headerName: "Cant Valorizada",
      field: "cantvalorizada",
      cellStyle: (params) =>
        params.value ? { background: "#3CB371", color: "white" } : null,
    },
    {
      headerName: "Valorizado $",
      field: "valorizado",
      cellStyle: (params) =>
        params.value ? { background: "#3CB371", color: "white" } : null,
    },
    {
      headerName: "N GR 2 Valorizada",
      field: "ngrvalorizada2",
      cellStyle: (params) =>
        params.value ? { background: "#3CB371", color: "white" } : null,
    },
    {
      headerName: "Cant Valorizada",
      field: "cantvalorizada2",
      cellStyle: (params) =>
        params.value ? { background: "#3CB371", color: "white" } : null,
    },
    {
      headerName: "Valorizado $",
      field: "valorizado2",
      cellStyle: (params) =>
        params.value ? { background: "#3CB371", color: "white" } : null,
    },
    {
      headerName: "Cant Total Valorizada",
      field: "canttotalvalorizada",
      hide: hidecolumn,
      cellStyle: (params) => (params.value ? { background: "yellow" } : null),
    },
    {
      headerName: "Cant por Valorizada",
      field: "cantporvalorizar",
      hide: hidecolumn,
      cellStyle: (params) => (params.value ? { background: "yellow" } : null),
    },
    {
      headerName: "Saldo por Valorizada",
      field: "saldoporvalorizar",
      hide: hidecolumn,
      cellStyle: (params) => (params.value ? { background: "yellow" } : null),
    },
  ];

  const defaultColDef = {
    sortable: true,
  };

  const showcolumn = () => {
    console.log("clickeo");
    gridColumnApi.setColumnVisible(
      "canttotalvalorizada",
      setHidecolumn(!hidecolumn)
    );
    gridColumnApi.setColumnVisible(
      "cantporvalorizar",
      setHidecolumn(!hidecolumn)
    );
    gridColumnApi.setColumnVisible(
      "saldoporvalorizar",
      setHidecolumn(!hidecolumn)
    );
  };

  const onGridReady = (params) => {
    console.log("estoy en onGridReady", params);
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
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

export default MaterialesServicios;
