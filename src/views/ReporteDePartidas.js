import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

function ReporteDePartidas() {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [hidecolumn, setHidecolumn] = useState(false);

  const [rowData, setRowData] = useState([
    {
      item: 1,
      partidas: "Red Tuberias",
      subtotal: 18500,
      ha: 18.5,
      costo: 10000,
      dscto: 0.05,
      costocondscto: 9500,
      margen: 49 + "%",
    },
    {
      item: 1.1,
      partidas: "Tuberias de PVC",
      subtotal: 15000,
    },
    {
      item: 1.2,
      partidas: "Accesorios PVC",
      subtotal: 2000,
    },
    {
      item: 1.3,
      partidas: "Consumibles (Pegamento,limpiador,lubricante,teflon)",
      subtotal: 1500,
    },
    {
      item: 2,
      partidas: "Emisores",
      subtotal: 83500,
    },
    {
      item: 2.1,
      partidas: "Lineas de riego",
      subtotal: 28000,
    },
    {
      item: 2.2,
      partidas: "Manguera Ciega",
      subtotal: 5000,
    },
    {
      item: 2.3,
      partidas: "Goteros y acc got",
      subtotal: 38000,
    },
  ]);
  const columnDefs = [
    { headerName: "Item", field: "item" },
    { headerName: "Partida", field: "partida" },
    { headerName: "Sub-Total Precio Venta US$", field: "subtotal" },
    { headerName: "US$/HA", field: "ha" },
    {
      headerName: "Costo US$",
      field: "costo",
      hide: hidecolumn,
      cellStyle: (params) => (params.value ? { background: "yellow" } : null),
    },
    {
      headerName: "Dscto %",
      field: "dscto",
      hide: hidecolumn,
      cellStyle: (params) => (params.value ? { background: "yellow" } : null),
    },
    {
      headerName: "Costo con Dscto",
      field: "costocondscto",
      hide: hidecolumn,
      cellStyle: (params) => (params.value ? { background: "yellow" } : null),
    },
    {
      headerName: "Margen",
      field: "margen",
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
    gridColumnApi.setColumnVisible("costo", setHidecolumn(!hidecolumn));
    gridColumnApi.setColumnVisible("dscto", setHidecolumn(!hidecolumn));
    gridColumnApi.setColumnVisible("costocondscto", setHidecolumn(!hidecolumn));
    gridColumnApi.setColumnVisible("margen", setHidecolumn(!hidecolumn));
  };

  return (
    <div className="container">
      <Card style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title style={{ color: "#F08820" }}>
            Cotizacion N PR-2000-XXXXX
          </Card.Title>
          <Card.Text>
            <div className="row">
              <div className="col-12 col-md-4">
                <p className="h6">Fecha</p>
                <p className="h6">Razon social</p>
                <p className="h6">Ruc</p>
              </div>
              <div className="col-12 col-md-4">
                <p className="h6">Direccion Fiscal</p>
                <p className="h6">Atencion</p>
                <p className="h6">Vendedor</p>
                <p className="h6">Telefono</p>
                <p className="h6">Referencia</p>
              </div>
              <div className="col-12 col-md-4">
                <p className="h6">Validez de oferta</p>
              </div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
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

export default ReporteDePartidas;
