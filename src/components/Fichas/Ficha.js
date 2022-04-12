import React, { useContext, useEffect, useState } from "react";

import fichaTecnicaContext from "../../context/fichaTecnica/fichaTecnicaContext";
import tablaContext from "../../context/tabla/tablaContext";
function Ficha({
  fichatecnica,
  setActivarFicha,
  ActivarFicha,
  cambiarColor,
  setCambiarColor,
  i,
  taparCalculos,
  setTaparCalculos,
}) {
  const [existeTabla, setExisteTabla] = useState(false);
  //const [cambiarColor, setCambiarColor] = useState(false);
  //////////////////////
  const tablacontext = useContext(tablaContext);
  const { tablaDatos, obtenerDatosTabla } = tablacontext;
  ////////////////////////
  ///////////////////////////////
  const fichatecnicacontext = useContext(fichaTecnicaContext);
  const {
    fichaTecnica,
    todasLasFichasTecnica,
    registroDeFichaTecnica,
    obtenerTodasLasFichasTecnicas,
    fichaTecnicaActual,
    guardarFichaActual,
  } = fichatecnicacontext;
  //////////////////////////////

  //console.log("ficha tecnica", fichaTecnica);
  ////////////////////////////////////////////////////////TABLA EN CADA FICHA
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
  const verTabla = (fichaTecnicaId) => {
    console.log(
      "hizo click en ver tabla y el id de esa fichatecnica es ",
      fichaTecnicaId,
      "ficha tecnica",
      fichatecnica
    );

    //console.log("y este es el objeto", fichatecnica);
    fichaTecnicaActual(fichaTecnicaId); // me chapa todos los datos de la ficha seleccionada
    //tmb deberia llamar los datos de la tabla por el id de la ficha
    obtenerDatosTabla(fichatecnica); // manda la ficha objeto, pero luego solo se envia el id de esa ficha en el get
    setActivarFicha(false);
    //listaSeleccionada.classList.add("active");
    clasesPrueba(i);
  };

  /////////////////////////////////////////PARA EDITAR
  const btnEditar = () => {
    setActivarFicha(true);
    console.log("hiciste click en editar");
    guardarFichaActual(fichatecnica);
    clasesPrueba(i);
    setTaparCalculos(true);
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
          {fichatecnica.nombreFichatecnica} - {fichatecnica.numFichatecnica}
        </p>
        <p
          className="my-0 py-0  fw-bold text-center text-uppercase estado"
          style={{ border: "2px solid #F18721", borderRadius: "25px" }}
        >
          {fichatecnica.estadoFichaproyecto}
        </p>
      </div>
      <div className="d-flex ">
        <button
          className="btn btn-success mx-2 py-0"
          onClick={() => verTabla(fichatecnica.idFichatecnica)}
        >
          Ver Lista de Materiales
        </button>{" "}
        <button className="btn btn-warning py-0" onClick={() => btnEditar()}>
          Editar Ficha
        </button>
      </div>
    </li>
  );
}

export default Ficha;
