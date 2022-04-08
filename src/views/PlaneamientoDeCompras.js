import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useState } from "react";

function PlaneamientoDeCompras() {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [hidecolumn, setHidecolumn] = useState(false);

  const [rowData, setRowData] = useState([]);

  const columnDefs = [
    { headerName: "Item", field: "item" },
    { headerName: "Partida", field: "partida" },
    { headerName: "Sub-Partida", field: "subpartida" },
    { headerName: "Marca", field: "marca" },
    { headerName: "Proveedor", field: "proveedor" },
    { headerName: "CodigoERP", field: "codigoerp" },
    { headerName: "Codigo Proveedor", field: "codproveedor" },
    { headerName: "Descripcion", field: "descripcion" },
    { headerName: "UND", field: "und" },
    { headerName: "Cantidad", field: "P.Unitario" },
  ];

  return <div>hola soy planeamiento</div>;
}

export default PlaneamientoDeCompras;
