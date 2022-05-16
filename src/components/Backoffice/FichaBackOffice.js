import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import fichaTecnicaContext from "../../context/fichaTecnica/fichaTecnicaContext";
import tablaContext from "../../context/tabla/tablaContext";
function FichaBackOffice({
  cambiarColor,
  fichaAceptada,
  i,
  setMostrartabla,
  mostrartabla,
  setMostrarReportePipeLine,
}) {
  //////////////////////
  const tablacontext = useContext(tablaContext);
  const { obtenerDatosTablaGerenteGeneral } = tablacontext;
  ////////////////////////
  ///////////////////////////////
  const fichatecnicacontext = useContext(fichaTecnicaContext);
  const { fichaTecnicaActual } = fichatecnicacontext;

  //////////////////////////////
  const clasesPrueba = (indice) => {
    //console.log("estoy en clasesPrueba", "este es el indice enviado", indice);
    let lista = document.querySelectorAll(".cambiarcolores");
    lista.forEach((item, i) => {
      if (i === indice) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  };
  const btnVerTabla = (fichaAceptada) => {
    console.log(
      "diste click en btnVerTabla",
      fichaAceptada,
      "id es",
      fichaAceptada.idFichatecnica
    );
    clasesPrueba(i + 1);
    setMostrartabla(true);
    obtenerDatosTablaGerenteGeneral(fichaAceptada.idFichatecnica);
    setMostrarReportePipeLine(false);
    fichaTecnicaActual(fichaAceptada.idFichatecnica);
  };
  return (
    <li
      className={
        cambiarColor
          ? " list-group-item d-flex justify-content-between cambiarcolores active"
          : "list-group-item d-flex justify-content-between cambiarcolores  "
      }
    >
      <div>
        <p className="fw-bolder  text-uppercase my-0 py-0 mb-2">
          {fichaAceptada.nombreFichatecnica} - {fichaAceptada.numFichatecnica}
        </p>
        <p
          className="my-0 py-0  fw-bold text-center text-uppercase estado"
          style={{ border: "2px solid #F18721", borderRadius: "25px" }}
        >
          {fichaAceptada.estadoFichaproyecto}
        </p>
      </div>
      <div className="d-flex ">
        <NavLink
          to={`/reporte/${fichaAceptada.idFichatecnica}`}
          className="btn btn-primary my-auto"
        >
          Reportes
        </NavLink>

        <button
          className="btn btn-success mx-2 py-0"
          onClick={() => btnVerTabla(fichaAceptada)}
        >
          Ver Lista de Materiales
        </button>
      </div>
    </li>
  );
}

export default FichaBackOffice;
