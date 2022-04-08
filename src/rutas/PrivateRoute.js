import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import authContext from "../context/autenticacion/authContext";

function PrivateRoute(props) {
  const autentificaciones = useContext(authContext);
  const { autenticado, usuarioAutenticado, cargando } = autentificaciones;

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  /*  console.log(
    "soy autenficiado",
    autenticado,
    "soy usuario",
    cargando,
    !autenticado,
    !cargando
  ); */

  return !autenticado && !cargando ? <Navigate to="/" /> : props.children;
}

export default PrivateRoute;
