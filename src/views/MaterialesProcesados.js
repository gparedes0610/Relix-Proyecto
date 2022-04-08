import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

function MaterialesProcesados() {
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
      estado: "",
      observaciones: "",
    },
    {
      item: 2,
      partida: "Partida",
      subpartida: "Subpartida",
      marca: "IAT",
      coderp: 470020001,
      codproveedor: 510010001,
      descripcionerp: "",
      cantidadreq: 4,
      punitario: 27.5,
      subtotal: 110.0,
      rq: "RQ_2120_01",
      pd2: "PD2_921",
      estado: "",
      observaciones: "",
    },
  ]);

  const columnDefs = [
    { headerName: "Item", field: "item" },
    { headerName: "Partida", field: "partida" },
    { headerName: "Sub-partida", field: "subpartida" },
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
      headerName: "Estado",
      field: "estado",
      cellRendererFramework: (params) => (
        <select defaultValue={"DEFAULT"}>
          <option value="DEFAULT" disabled>
            SELECCIONE
          </option>
          <option value="value1">PROCESADO</option>
          <option value="value1">PENDIENTE</option>
          <option value="value2" selected>
            STAND BY
          </option>
          <option value="value3">ANULADO</option>
          <option value="value3">ADICIONAL</option>
        </select>
      ),
    },
    { headerName: "Observaciones", field: "observaciones" },
  ];
  const defaultColDef = {
    sortable: true,
  };

  const onGridReady = (params) => {
    console.log("estoy en onGridReady", params);
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  return (
    <div className="container">
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

export default MaterialesProcesados;
