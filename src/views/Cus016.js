import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
function Cus016() {
  const data = [
    {
      npedido: "npedido1",
      guiatranslado: "guiatranslado1",
      codarticulo: "codarticulo1",
      descripcion: "descripcion1",
      precio: "precio1",
      saldoproducto: "saldoproducto1",
      cantidad: "cantidad1",
      serielote: "serielote1",
      nserielote: "nserielote1",
      descuentoitem: "descuentoitem1",
      descuentoadicional: "descuentoadicional",
      descuentofinanciero: "descuentofinanciero1",
      descuentobonificacion: "descuentobonificacion1",
    },
    {
      npedido: "npedido1",
      guiatranslado: "guiatranslado1",
      codarticulo: "codarticulo1",
      descripcion: "descripcion1",
      precio: "precio1",
      saldoproducto: "saldoproducto1",
      cantidad: "cantidad1",
      serielote: "serielote1",
      nserielote: "nserielote1",
      descuentoitem: "descuentoitem1",
      descuentoadicional: "descuentoadicional",
      descuentofinanciero: "descuentofinanciero1",
      descuentobonificacion: "descuentobonificacion1",
    },
    {
      npedido: "npedido1",
      guiatranslado: "guiatranslado1",
      codarticulo: "codarticulo1",
      descripcion: "descripcion1",
      precio: "precio1",
      saldoproducto: "saldoproducto1",
      cantidad: "cantidad1",
      serielote: "serielote1",
      nserielote: "nserielote1",
      descuentoitem: "descuentoitem1",
      descuentoadicional: "descuentoadicional",
      descuentofinanciero: "descuentofinanciero1",
      descuentobonificacion: "descuentobonificacion1",
    },
    {
      npedido: "npedido1",
      guiatranslado: "guiatranslado1",
      codarticulo: "codarticulo1",
      descripcion: "descripcion1",
      precio: "precio1",
      saldoproducto: "saldoproducto1",
      cantidad: "cantidad1",
      serielote: "serielote1",
      nserielote: "nserielote1",
      descuentoitem: "descuentoitem1",
      descuentoadicional: "descuentoadicional",
      descuentofinanciero: "descuentofinanciero1",
      descuentobonificacion: "descuentobonificacion1",
    },
  ];

  const columns = [
    {
      headerName: "Cod.Articulo",
      field: "codarticulo",
    },
    {
      headerName: "Descripcion",
      field: "descripcion",
    },
    {
      headerName: "Serie/Lote",
      field: "serielote",
    },
    {
      headerName: "Nro serie/Lote",
      field: "nserielote",
    },
    {
      headerName: "Cantidad",
      field: "cantidad",
    },
    {
      headerName: "Precio",
      field: "precio",
    },
    {
      headerName: "Descuento item",
      field: "descuentoitem",
    },
    {
      headerName: "Descuento Adicional",
      field: "descuentoadicional",
    },
    {
      headerName: "Descuento Financiero",
      field: "descuentofinanciero",
    },
    {
      headerName: "Descuento Bonificacion",
      field: "descuentobonificacion",
    },
    {
      headerName: "Saldo Producto",
    },
  ];
  const defaultColDef = {
    /* filter: true, */
    /*  filter: true,
                floatingFilter: true, */
    editable: true,
  };
  return (
    <div className="container">
      <div className="row mt-4 mb-2">
        <div className="col-12 col-md-3"></div>
        <div className="col-12 col-md-3"></div>
        <div className="col-12 col-md-3"></div>
        <div className="col-12 col-md-3">
          <input className="form-control" type="text" placeholder="Buscar..." />
        </div>
      </div>
      <div
        id="myGrid"
        className="ag-theme-alpine"
        style={{ height: 400, width: "100%" }}
      >
        <AgGridReact
          rowData={data}
          columnDefs={columns}
          defaultColDef={defaultColDef}
        />
      </div>

      <div className="row mt-5 mb-4">
        <div className="col-12 col-md-6 text-start">
          <button
            style={{
              border: "none",
              color: "white ",
              padding: "8px 16px",
            }}
            className="ms-3 btn-primary"
          >
            Guardar Datos
          </button>
        </div>
        <div className="col-12 col-md-6 text-end">
          <button
            style={{
              background: "#3BBA00",
              border: "none",
              color: "white ",
              padding: "8px 16px",
            }}
            className="ms-3"
          >
            Generar Plantilla
          </button>
          <button
            style={{
              background: "#3BBA00",
              border: "none",
              color: "white ",
              padding: "8px 16px",
            }}
            className="ms-3"
          >
            Factura
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cus016;
