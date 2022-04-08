import React from "react";
import NavBar from "../components/NavBar";
import BdSimulado from "../services/BdSimulado.json";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Card } from "react-bootstrap";

import edit from "../assets/edit.svg";
import duplicar from "../assets/duplicar.svg";
import PlantillaPedido from "./PlantillaPedido";
import Cus013 from "./Cus013";
import Cus014 from "./Cus014";
import Cus017 from "./Cus017";
import Cus016 from "./Cus016";

function BackOfficeView() {
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
    <div>
      <NavBar />
      <div className="container pt-4 mb-3">
        <div className="row mt-3">
          <div className="col-12 col-md-3"></div>
          <div className="col-12 col-md-3"></div>
          <div className="col-12 col-md-3"></div>
          <div className="col-12 col-md-3">
            <input
              className="form-control"
              type="text"
              placeholder="Buscar..."
            />
          </div>
        </div>
      </div>
      <div className="container">
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
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 col-md-6 text-end"></div>
          <div className="col-12 col-md-6 text-end">
            <button
              style={{
                background: "#008DCA",
                border: "none",
                color: "white ",
                padding: "8px 16px",
              }}
              className="ms-3"
            >
              Guardar Cambios
            </button>
            <button
              style={{
                background: "#008DCA",
                border: "none",
                color: "white ",
                padding: "8px 16px",
              }}
              className="ms-3"
            >
              Generar Rq
            </button>

            <button
              // disabled={!canPreviousPage}
              style={{
                background: "#C4C4C4",
                border: "none",
                color: "white ",
                padding: "8px 7px",
                borderRadius: "5px",
              }}
              className="ms-3"
            >
              {"<<"}
            </button>
            <button
              //disabled={!canPreviousPage}
              style={{
                background: "#C4C4C4",
                border: "none",
                color: "white ",
                padding: "8px 7px",
                borderRadius: "5px",
              }}
              className="ms-1"
            >
              {"<"}
            </button>
            <button
              //  disabled={!canNextPage}
              style={{
                background: "#39D5D5",
                border: "none",
                color: "white ",
                padding: "8px 7px",
                borderRadius: "5px",
              }}
            >
              {">"}
            </button>
            <button
              // disabled={!canNextPage}
              style={{
                background: "#39D5D5",
                border: "none",
                color: "white ",
                padding: "8px 7px",
                borderRadius: "5px",
              }}
              className="ms-1"
            >
              {">>"}
            </button>
          </div>
        </div>
      </div>
      <div className="container mt-3">
        {/*  <div className="row">
          <Cus016 />
        </div>
        <div className="row">
          <Cus017 />
        </div> */}
      </div>
    </div>
  );
}

export default BackOfficeView;
