import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Card } from "react-bootstrap";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

function PresupuestoCotizacion() {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [hidecolumn, setHidecolumn] = useState(false);

  const [rowData, setRowData] = useState([
    {
      item: 1,
      partida: "Partida",
      subpartida: "Subpartida",
      marca: "marca",
      codproveedor: "codigoproveedor1",
      descripcion: "descripcion",
      und: 4,
      cantidad: 25,
      punitario: 14,
      subtotal: 48,
    },
    {
      item: 2,
      partida: "Partida",
      subpartida: "Subpartida",
      marca: "marca",
      codproveedor: "codigoproveedor1",
      descripcion: "descripcion",
      und: 4,
      cantidad: 25,
      punitario: 14,
      subtotal: 48,
    },
    {
      item: 3,
      partida: "Partida",
      subpartida: "Subpartida",
      marca: "marca",
      codproveedor: "codigoproveedor1",
      descripcion: "descripcion",
      und: 4,
      cantidad: 25,
      punitario: 14,
      subtotal: 48,
    },
    {
      item: 4,
      partida: "Partida",
      subpartida: "Subpartida",
      marca: "marca",
      codproveedor: "codigoproveedor1",
      descripcion: "descripcion",
      und: 4,
      cantidad: 25,
      punitario: 14,
      subtotal: 48,
    },
    {
      item: 5,
      partida: "Partida",
      subpartida: "Subpartida",
      marca: "marca",
      codproveedor: "codigoproveedor1",
      descripcion: "descripcion",
      und: 4,
      cantidad: 25,
      punitario: 14,
      subtotal: 48,
    },
  ]);

  const columnDefs = [
    { headerName: "Item", field: "item" },
    {
      headerName: "Partida",
      field: "partida",
      hide: hidecolumn,
    },
    {
      headerName: "Sub-partida",
      field: "subpartida",
      hide: hidecolumn,
      cellStyle: (params) => (params.value ? { background: "yellow" } : null),
    },
    { headerName: "Marca", field: "marca" },
    { headerName: "Codigo Proveedor", field: "codproveedor" },
    { headerName: "Descripcion", field: "descripcion" },
    { headerName: "UND", field: "und" },
    { headerName: "Cantidad", field: "cantidad" },
    {
      headerName: "P.Unitario",
      field: "punitario",
      hide: hidecolumn,
      cellStyle: (params) => (params.value ? { background: "yellow" } : null),
    },
    {
      headerName: "SubTotal",
      field: "subtotal",
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
    gridColumnApi.setColumnVisible("punitario", setHidecolumn(!hidecolumn));
    gridColumnApi.setColumnVisible("subtotal", setHidecolumn(!hidecolumn));
    gridColumnApi.setColumnVisible("partida", setHidecolumn(!hidecolumn));
    gridColumnApi.setColumnVisible("subpartida", setHidecolumn(!hidecolumn));
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

export default PresupuestoCotizacion;
