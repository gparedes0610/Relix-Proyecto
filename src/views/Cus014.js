import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Card } from "react-bootstrap";
function Cus014() {
  const data = [
    {
      npedido: "npedido1",
      guiatranslado: "guiatranslado1",
      codarticulo: "codarticulo1",
      descripcion: "descripcion1",
      precio: "precio1",
      cantidad: "Cantidad1",
      saldo: "Saldo1",
    },
    {
      npedido: "npedido1",
      guiatranslado: "guiatranslado1",
      codarticulo: "codarticulo1",
      descripcion: "descripcion1",
      precio: "precio1",
      cantidad: "Cantidad1",
      saldo: "Saldo1",
    },
    {
      npedido: "npedido1",
      guiatranslado: "guiatranslado1",
      codarticulo: "codarticulo1",
      descripcion: "descripcion1",
      precio: "precio1",
      cantidad: "Cantidad1",
      saldo: "Saldo1",
    },
    {
      npedido: "npedido1",
      guiatranslado: "guiatranslado1",
      codarticulo: "codarticulo1",
      descripcion: "descripcion1",
      precio: "precio1",
      cantidad: "Cantidad1",
      saldo: "Saldo1",
    },
  ];
  const columns = [
    {
      headerName: "N.Pedido",
      field: "npedido",
    },
    {
      headerName: "Guia Translado",
      field: "guiatranslado",
    },
    {
      headerName: "Cod.Articulo",
      field: "codarticulo",
    },
    {
      headerName: "Descripcion",
      field: "descripcion",
    },
    {
      headerName: "Precio",
      field: "precio",
    },
    {
      headerName: "Cantidad",
      field: "cantidad",
    },
    {
      headerName: "Saldo",
      field: "saldo",
    },
    {
      headerName: "Acciones",
      field: "",

      cellRendererFramework: (params) => (
        <div>
          <input type="checkbox" className="ms-3" />
        </div>
      ),
    },
  ];
  const data2 = [
    {
      codarticulo: "codarticulo1",
      precio: "precio1",
      cantidad: "cantidad1",
      guiatranslado: "guiatranslado1",
      guia12: "guia121",
      descuento: "descuento1",
    },
    {
      codarticulo: "codarticulo1",
      precio: "precio1",
      cantidad: "cantidad1",
      guiatranslado: "guiatranslado1",
      guia12: "guia121",
      descuento: "descuento1",
    },
    {
      codarticulo: "codarticulo1",
      precio: "precio1",
      cantidad: "cantidad1",
      guiatranslado: "guiatranslado1",
      guia12: "guia121",
      descuento: "descuento1",
    },
  ];

  const columns2 = [
    {
      headerName: "Cod.Articulo",
      field: "codarticulo",
    },
    {
      headerName: "Precio",
      field: "precio",
    },
    {
      headerName: "Cantidad",
      field: "cantidad",
    },
    {
      headerName: "Guia Translado",
      field: "guiatranslado",
    },
    {
      headerName: "Guia12",
      field: "guia12",
    },
    {
      headerName: "descuento",
      field: "descuento",
    },
  ];

  const defaultColDef = {
    /* filter: true, */
    /*  filter: true,
            floatingFilter: true, */
    editable: true,
    flex: 1,
  };
  return (
    <>
      <div className="container mt-4 mb-4">
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
          <div className="col-12 col-md-6 text-end"></div>
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
              Grabar Guia Translado
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-6">
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title style={{ color: "#F08820" }}>Pedidos</Card.Title>
                <Card.Text>
                  <div className="row">
                    <div className="col-12 col-md-4">
                      <p className="h6">Num Pedidos</p>
                      <p className="h6">Fecha</p>
                      <p className="h6">Fecha de vencimiento</p>
                      <input
                        type="text"
                        className="w-100"
                        placeholder="Tipo pedido n"
                      />
                    </div>
                    <div className="col-12 col-md-4">
                      <p className="h6">Centro de costo</p>
                      <p className="h6">Glosa</p>
                      <p className="h6">Codigo Cliente</p>
                      <input
                        type="text"
                        className="w-100 mb-2"
                        placeholder="Tipo documento FT"
                      />
                      <input
                        type="text"
                        className="w-100"
                        placeholder="Tipo pedido para percepcion N"
                      />
                    </div>
                    <div className="col-12 col-md-4">
                      <p className="h6" style={{ color: "#4253FF" }}>
                        Codigo Vendedor
                      </p>
                      <p className="h6">Nro.Orden de compra</p>
                      <p className="h6">Codigo forma de pago</p>
                      <input
                        type="text"
                        className="w-100 mb-2"
                        placeholder="Moneda U$"
                      />
                      <input
                        type="text"
                        className="w-100"
                        placeholder="Agencia 0001"
                      />
                    </div>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div
            id="myGrid"
            className="ag-theme-alpine mt-4"
            style={{ height: 350, width: "100%" }}
          >
            <AgGridReact
              rowData={data2}
              columnDefs={columns2}
              defaultColDef={defaultColDef}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Cus014;
