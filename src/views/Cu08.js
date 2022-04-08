import React from "react";
import { Card } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import duplicar from "../assets/duplicar.svg";
import edit from "../assets/edit.svg";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import PlantillaPedido from "./PlantillaPedido";
function Cu08() {
  const data = [
    {
      partida: "partida1",
      subpartida: "subpartida2",
      marca: "marca",
      codprov: "codproveedor1",
      codsoftcom: "codsoftcom1",
      descripcion: "descripcion1",
      cantTotal: 12,
      preUnitario: 24,
      preTotal: 47,
      costoReal: 145,
      costoTotal: 478,
    },
    {
      partida: "partida1",
      subpartida: "subpartida2",
      marca: "marca",
      codprov: "codproveedor1",
      codsoftcom: "codsoftcom1",
      descripcion: "descripcion1",
      cantTotal: 12,
      preUnitario: 24,
      preTotal: 47,
      costoReal: 145,
      costoTotal: 478,
    },
    {
      partida: "partida1",
      subpartida: "subpartida2",
      marca: "marca",
      codprov: "codproveedor1",
      codsoftcom: "codsoftcom1",
      descripcion: "descripcion1",
      cantTotal: 12,
      preUnitario: 24,
      preTotal: 47,
      costoReal: 145,
      costoTotal: 478,
    },
    {
      partida: "partida1",
      subpartida: "subpartida2",
      marca: "marca",
      codprov: "codproveedor1",
      codsoftcom: "codsoftcom1",
      descripcion: "descripcion1",
      cantTotal: 12,
      preUnitario: 24,
      preTotal: 47,
      costoReal: 145,
      costoTotal: 478,
    },
    {
      partida: "partida1",
      subpartida: "subpartida2",
      marca: "marca",
      codprov: "codproveedor1",
      codsoftcom: "codsoftcom1",
      descripcion: "descripcion1",
      cantTotal: 12,
      preUnitario: 24,
      preTotal: 47,
      costoReal: 145,
      costoTotal: 478,
    },
    {
      partida: "partida1",
      subpartida: "subpartida2",
      marca: "marca",
      codprov: "codproveedor1",
      codsoftcom: "codsoftcom1",
      descripcion: "descripcion1",
      cantTotal: 12,
      preUnitario: 24,
      preTotal: 47,
      costoReal: 145,
      costoTotal: 478,
    },
    {
      partida: "partida1",
      subpartida: "subpartida2",
      marca: "marca",
      codprov: "codproveedor1",
      codsoftcom: "codsoftcom1",
      descripcion: "descripcion1",
      cantTotal: 12,
      preUnitario: 24,
      preTotal: 47,
      costoReal: 145,
      costoTotal: 478,
    },
  ];

  const columns = [
    {
      headerName: "Partida",
      field: "partida",
    },
    {
      headerName: "Subpartida",
      field: "subpartida",
    },
    {
      headerName: "Marca",
      field: "marca",
    },
    {
      headerName: "Codprov",
      field: "codprov",
    },
    {
      headerName: "Codsoftcom",
      field: "codsoftcom",
    },
    {
      headerName: "Descripcion",
      field: "descripcion",
    },
    {
      headerName: "CantTotal",
      field: "cantTotal",
    },
    {
      headerName: "PreUnitario",
      field: "preUnitario",
      cellRendererFramework: (params) => (
        <select defaultValue={"DEFAULT"}>
          <option value="DEFAULT" disabled>
            Choose a salutation ...
          </option>
          <option value="value1">Value 1</option>
          <option value="value2" selected>
            Value 2
          </option>
          <option value="value3">Value 3</option>
        </select>
      ),
    },
    {
      headerName: "PreTotal",
      field: "preTotal",
    },
    {
      headerName: "CostoReal",
      field: "costoReal",
    },
    {
      headerName: "CostoTotal",
      field: "costoTotal",
    },

    /////////////////para agregar una columna
    {
      headerName: "Descuento",
      field: "",
    },
    {
      headerName: "Total con descuento",
      field: "",
    },
    {
      headerName: "Estados",
      field: "",
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
    {
      headerName: "Observaciones",
      field: "obs",
    },
    {
      headerName: "Acciones",
      field: "",

      cellRendererFramework: (params) => (
        <div>
          <button
            style={{
              background: "#56CCF2",
              border: "none",

              borderRadius: "5px",
            }}
          >
            <img
              src={duplicar}
              alt=""
              className="img-fluid"
              style={{ padding: "0 24px" }}
            />
          </button>
          <input type="checkbox" className="ms-3" />
        </div>
      ),
    },
  ];

  const defaultColDef = {
    /* filter: true, */
    /*  filter: true,
    floatingFilter: true, */
    editable: true,
  };
  return (
    <>
      <div className="container">
        <div className="row mb-4">
          <div className="col-12 col-md-6">
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title style={{ color: "#F08820" }}>
                  Numero de Rq pedido - AutoNum 11 caracters
                </Card.Title>
                <Card.Text>
                  <div className="row">
                    <div className="col-12 col-md-4">
                      <p className="h6">Fecha</p>
                      <p className="h6">Fecha de vencimiento</p>
                      <p className="h6">Tipo de pedido</p>
                    </div>
                    <div className="col-12 col-md-4">
                      <p className="h6">Centro de costo</p>
                      <p className="h6">Glosa</p>
                      <p className="h6">Codigo Cliente</p>
                      <p className="h6">Tipo documento</p>
                      <p className="h6">Tipo pedido para percepcion</p>
                    </div>
                    <div className="col-12 col-md-4">
                      <p className="h6" style={{ color: "#4253FF" }}>
                        Codigo Vendedor
                      </p>
                      <p className="h6">Nro.Orden de compra</p>
                      <p className="h6">Codigo forma de pago</p>
                      <p className="h6">Moneda U$</p>
                      <p className="h6">Agencia 0001</p>
                    </div>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
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
              className="ms-3 btn-danger"
            >
              Eliminar plantilla
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
              Guardar Cambios
            </button>
          </div>
        </div>

        <div className="row mt-5">
          <PlantillaPedido />
        </div>
      </div>
    </>
  );
}

export default Cu08;
