import React, { useEffect, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import authContext from "../context/autenticacion/authContext";

function PrivateRouteReportes(props) {
  /////////////////////////////////
  const autentificaciones = useContext(authContext);
  const { usuarioAutenticado, usuario, cargando } = autentificaciones;
  /////////////////////////////////////////

  /* const [usuarioVerificado, setUsuarioVerificado] = useState(usuario.idRol);
  console.log("soy ", usuarioVerificado); */
  useEffect(() => {
    usuarioAutenticado();
  }, []);
  console.log("soy", usuario, "mi rol es", autentificaciones);

  //return usuario ? props.children : <Navigate to="/" />;
  return props.children;
}

export default PrivateRouteReportes;
