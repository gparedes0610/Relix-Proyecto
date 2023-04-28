import React, { useState } from "react";
import { useEffect } from "react";
import clienteAxios from "../../config/axios";
import { DataGrid } from "@mui/x-data-grid";

import { GiSaveArrow } from "react-icons/gi";

function FichasTecnicas() {
  const [todasLasFichasTecnicas, setTodasLasFichasTecnicas] = useState([]);
  const obtenerTodasLasFichasTecnicas = async () => {
    try {
      const respuesta = await clienteAxios.get("/api/fichatecnica");
      console.log("respuesta de obtenerTodasLasFichasTecnicas", respuesta.data);
      setTodasLasFichasTecnicas(respuesta.data);
    } catch (error) {
      console.log(error.response.data.messages.error);
    }
  };

  useEffect(() => {
    obtenerTodasLasFichasTecnicas();
  }, []);

  const reportePresupuesto = async (cellValues) => {
    let chaparId = cellValues.row.idFichatecnica;
    console.log("este es el id", chaparId);
    console.log("entraste a reportePresupuesto");
    const fecha = new Date();
    const hoy = fecha.getDate();
    const mesActual = fecha.getMonth() + 1;
    const anoActual = fecha.getFullYear();
    try {
      var config = {
        responseType: "arraybuffer",
      };
      const resultado = await clienteAxios.get(
        `/ExcelReporteUno/${chaparId}`,
        config
      );
      console.log("respuesta de reportePresupuesto", resultado.data);

      const url = URL.createObjectURL(
        new Blob([resultado.data], {
          type: "application/vnd.ms-excel",
        })
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `reportePresupuesto ${hoy}_${mesActual}_${anoActual}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error.response.data.messages.error);
    }
  };
  const reportePresupuestoPartida = async (cellValues) => {
    let chaparId = cellValues.row.idFichatecnica;
    console.log("este es el id", chaparId);
    console.log("entraste a reportePresupuestoPartida");
    const fecha = new Date();
    const hoy = fecha.getDate();
    const mesActual = fecha.getMonth() + 1;
    const anoActual = fecha.getFullYear();
    try {
      var config = {
        responseType: "arraybuffer",
      };
      const resultado = await clienteAxios.get(
        `/ExcelReporteUnoPartida/${chaparId}`,
        config
      );
      console.log("respuesta de reportePresupuesto", resultado.data);

      const url = URL.createObjectURL(
        new Blob([resultado.data], {
          type: "application/vnd.ms-excel",
        })
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `reportePresupuesto ${hoy}_${mesActual}_${anoActual}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error.response.data.messages.error);
    }
  };
  const reportePresupuestoSubPartida = async (cellValues) => {
    let chaparId = cellValues.row.idFichatecnica;
    console.log("este es el id", chaparId);
    console.log("entraste a reportePresupuestoPartida");
    const fecha = new Date();
    const hoy = fecha.getDate();
    const mesActual = fecha.getMonth() + 1;
    const anoActual = fecha.getFullYear();
    try {
      var config = {
        responseType: "arraybuffer",
      };
      const resultado = await clienteAxios.get(
        `/ExcelReporteUnoSubPartida/${chaparId}`,
        config
      );
      console.log("respuesta de reportePresupuesto", resultado.data);

      const url = URL.createObjectURL(
        new Blob([resultado.data], {
          type: "application/vnd.ms-excel",
        })
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `reportePresupuesto ${hoy}_${mesActual}_${anoActual}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error.response.data.messages.error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90, hide: true },
    {
      field: "numFichatecnica",
      headerName: "NÚMERO DE COTIZACIÓN",
      width: 400,
      //editable: true,
    },

    {
      field: "clienteFichatecnica",
      headerName: "RAZÓN SOCIAL",
      width: 400,
      //editable: true,
    },

    {
      field: "nombreFichatecnica",
      headerName: "NOMBRE DE PROYECTO",
      width: 400,
      //editable: true,
    },

    {
      field: "nombreVendedor",
      headerName: "VENDEDOR",
      width: 320,
      //editable: true,
    },

    {
      field: "DESCARGAR",
      width: 460,
      renderCell: (cellValues) => {
        return (
          <div>
            <button
              className="btn btn-primary btn-sm p-2 rounded "
              onClick={() => reportePresupuesto(cellValues)}
            >
              <GiSaveArrow className="h3 m-0 p-0 pe-1" />
              DETALLE GENERAL
            </button>
            <button
              className="btn btn-success btn-sm p-2 rounded mx-2 "
              onClick={() => reportePresupuestoPartida(cellValues)}
            >
              <GiSaveArrow className="h3 m-0 p-0 pe-1" />
              PARTIDA
            </button>
            <button
              className="btn btn-warning btn-sm p-2 rounded"
              onClick={() => reportePresupuestoSubPartida(cellValues)}
            >
              <GiSaveArrow className="h3 m-0 p-0 pe-1" />
              SUB-PARTIDA
            </button>
          </div>
        );
      },
    },
  ];

  const rows = todasLasFichasTecnicas.map((dato, i) => ({
    ...dato,
    id: i + 1,
  }));

  return (
    <div className="container-fluid pt-4">
      <div className="text-center my-5">
        <span className=" h2 fw-bold text-success  border border-secondary rounded p-2 shadow mb-2 bg-body text-uppercase">
          Reporte presupuesto
        </span>
      </div>
      <div className="row">
        <div className="col-12">
          <div
            style={{
              height: "550px",
              width: "100%",
              overflow: "auto",
            }}
          >
            <DataGrid
              columns={columns}
              rows={rows}
              pageSize={15}
              rowsPerPageOptions={[5]}
              //checkboxSelection
              // disableSelectionOnClick
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FichasTecnicas;
