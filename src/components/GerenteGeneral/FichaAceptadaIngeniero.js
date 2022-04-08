import React, { useContext, useEffect, useState } from "react";
import tablaContext from "../../context/tabla/tablaContext";
import fichaTecnicaContext from "../../context/fichaTecnica/fichaTecnicaContext";
import { obtenerFichasAceptadas } from "./apisGerenteGeneral";

function FichaAceptadaIngeniero({
  fichaAceptada,
  mostrartabla,
  setMostrartabla,
  i,
  cambiarColor,
}) {
  //////////////////////
  const tablacontext = useContext(tablaContext);
  const { obtenerDatosTablaGerenteGeneral } = tablacontext;
  ////////////////////////
  ///////////////////////////////
  const fichatecnicacontext = useContext(fichaTecnicaContext);
  const { fichaTecnicaActual } = fichatecnicacontext;
  //////////////////////////////
  useEffect(() => {
    obtenerFichasAceptadas();
    console.log("estas en FichaAceptadaIngeniero");
  }, [fichaTecnicaActual]);

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
    setMostrartabla(true);
    obtenerDatosTablaGerenteGeneral(fichaAceptada);
    fichaTecnicaActual(fichaAceptada.idFichatecnica);
    clasesPrueba(i + 1);
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

export default FichaAceptadaIngeniero;
