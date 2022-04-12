import React, { useContext, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import fichaTecnicaContext from "../../context/fichaTecnica/fichaTecnicaContext";

function ReportePipeLine({ setMostrarReportePipeLine }) {
  ///////////////////////////////
  const fichatecnicacontext = useContext(fichaTecnicaContext);
  const { todasLasFichasTecnica, reportePepiline } = fichatecnicacontext;
  //////////////////////////////
  const columns = [
    {
      headerName: "Departamento",
      field: "nombreDepartamento",
    },
    {
      headerName: "Fecha Inicio Probable",
      field: "fechaFichatecnica",
    },
    /*  {
      headerName: "Duracion Meses",
      field: "",
    }, */
    {
      headerName: "Cultivo",
      field: "cultivoFichatecnica",
    },
    /* {
      headerName: "ha",
      field: "",
    }, */
    /* {
      headerName: "Probabilidad %",
      field: "",
    }, */
    {
      headerName: "Status",
      field: "estadoFichaproyecto",
    },
    /* {
      headerName: "Preparacion",
      field: "",
    },
    {
      headerName: "Diseño",
      field: "",
    },
    {
      headerName: "Negociacion",
      field: "",
    },
    {
      headerName: "Cerrado",
      field: "",
    },
    {
      headerName: "Perdido",
      field: "",
    },
    {
      headerName: "Observaciones",
      field: "",
    },
    {
      headerName: "Agua",
      field: "",
    },
    {
      headerName: "Riego",
      field: "",
    }, */
  ];
  const defaultColDef = {
    /* filter: true, */
    /*  filter: true,
    floatingFilter: true, */
    //editable: true,
    resizable: true,
  };
  const rowSelectionType = "multiple";
  const onSelectionChanged = (event) => {
    console.log(event.api.getSelectedRows());
  };

  const descargarReportePepiline = () => {
    console.log("entraste a descargarReportePepiline");
    reportePepiline();
  };
  return (
    <div className="container-fluid">
      <h2 className="text-primary text-uppercase">Reporte Pipeline</h2>
      <ul>
        <li>.Click derecho y seleccione la opcion para descargar.</li>
      </ul>
      <button
        className="btn btn-primary w-25 mb-3"
        onClick={() => descargarReportePepiline()}
      >
        Descargar Excel
      </button>

      <div
        id="myGrid"
        className="ag-theme-alpine"
        style={{ height: 400, width: "100%" }}
      >
        <AgGridReact
          rowData={todasLasFichasTecnica}
          columnDefs={columns}
          defaultColDef={defaultColDef}
          rowSelection={rowSelectionType} //selecciona una fila
          onSelectionChanged={onSelectionChanged}
        />
      </div>
      <button
        className="my-3 btn btn-success"
        onClick={() => setMostrarReportePipeLine(false)}
      >
        Retroceder
      </button>
    </div>
  );
}

export default ReportePipeLine;
