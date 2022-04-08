import { Button } from "bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Route, Routes, Link } from "react-router-dom";
import authContext from "../../context/autenticacion/authContext";
import RegisterView from "../auth/RegisterView";

import TablaUsuarios from "./TablaUsuarios";

function SesionAdministradorSistemas() {
  const [verUsuarios, setVerUsuarios] = useState(false);
  ////////////////////////////////////
  const autentificaciones = useContext(authContext);
  const {
    usuarioAutenticado,
    usuario,
    obtenerTodosLosUsuarios,
    todosLosUsuarios,
  } = autentificaciones;
  /////////////////////////////////

  const btnVerusuarios = () => {
    console.log("diste click en btnVerusuarios");
    setVerUsuarios(!verUsuarios);
  };

  return (
    <div className="container-fluid">
      <h2 className="text-primary text-uppercase">
        Bienvenido Administrador de Sistema
      </h2>
      <ul>
        {verUsuarios ? (
          <li className="text-secondary">Aqui administras los usuarios</li>
        ) : (
          <li className="text-secondary">Aqui puede registrar usuarios</li>
        )}
      </ul>

      {verUsuarios ? null : (
        <button
          onClick={() => btnVerusuarios()}
          className="btn btn-success mt-2 "
        >
          Ver administracion de usuarios
        </button>
      )}

      {verUsuarios ? (
        <TablaUsuarios
          setVerUsuarios={setVerUsuarios}
          verUsuarios={verUsuarios}
        />
      ) : (
        <RegisterView />
      )}

      {/*   <Routes>
        <Route
          path="administador-usuarios"
          element={
            <TablaUsuarios
              verUsuarios={verUsuarios}
              setVerUsuarios={setVerUsuarios}
            />
          }
        />
      </Routes> */}
    </div>
  );
}

export default SesionAdministradorSistemas;
