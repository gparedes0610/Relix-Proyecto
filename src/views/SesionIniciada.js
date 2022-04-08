import React, { useContext, useEffect, useState } from "react";

//import "../components/Navbar.css";
import "../css/styles.css";
import BdSimulado from "../services/BdSimulado.json";

import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

//import NavBar from "../components/NavBar";

import ComoTrabajar from "../components/ComoTrabajar";
import Tabla from "../components/Ingeniero/GridTable"; //aqui es cambio de la tabla
import BtnCrearFicha from "../components/Fichas/BtnCrearFicha";
import ListaFichas from "../components/Fichas/ListaFichas";
import authContext from "../context/autenticacion/authContext";
import FichaTecnica from "../components/Ingeniero/FichaTecnica";

//administrador de sistemas
import TablaUsuarios from "../components/Administrador/TablaUsuarios";
import SesionAdministradorSistemas from "../components/Administrador/SesionAdministradorSistemas";
//Gerente
import SesionGerenteGeneral from "../components/GerenteGeneral/SesionGerenteGeneral";
///////////////////////////
import fichaTecnicaContext from "../context/fichaTecnica/fichaTecnicaContext";

import NavBar from ".././views/NavBar";
import SesionGerenteAdministracion from "../components/GerenteDeAdministracion/SesionGerenteAdministracion";
import SesionBackOffice from "../components/Backoffice/SesionBackOffice";

function SesionIniciada() {
  ///////////////////////////////
  const fichatecnicacontext = useContext(fichaTecnicaContext);
  const {
    registroDeFichaTecnica,
    obtenerTodasLasFichasTecnicas,
    todasLasFichasTecnica,
  } = fichatecnicacontext;
  //////////////////////////////
  /////////////////////////////////
  const autentificaciones = useContext(authContext);
  const {
    usuarioAutenticado,
    usuario,
    obtenerTodosLosUsuarios,
    todosLosUsuarios,
  } = autentificaciones;
  /////////////////////////////////////////

  useEffect(() => {
    obtenerTodasLasFichasTecnicas();
    usuarioAutenticado();
    obtenerTodosLosUsuarios();
  }, []);

  const [ActivarFicha, setActivarFicha] = useState(false);
  if (!usuario) {
    return null;
  }
  return (
    <>
      <NavBar />

      {usuario.idRol == "1" && <SesionAdministradorSistemas />}

      {usuario.idRol == "2" && <SesionGerenteGeneral />}

      {usuario.idRol == "3" && (
        <>
          <div className="container-fluid">
            {/* muestra requisitos */}
            <div className="row">
              <ComoTrabajar />
            </div>
            {/* muestra requisitos */}
            <div className="row">
              {/*  TABLA */}
              <>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-8">
                  {/* {usuario.idRol == "2" && <GerenteView />} */}
                  {usuario.idRol == "3" ? (
                    ActivarFicha ? (
                      <FichaTecnica
                        setActivarFicha={setActivarFicha}
                        ActivarFicha={ActivarFicha}
                      />
                    ) : (
                      <Tabla />
                    )
                  ) : null}
                </div>

                {/* FIN TABLA */}

                {/* FICHAS */}
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-4 text-center mt-2">
                  <div className="row">
                    <div className="col-12">
                      <BtnCrearFicha
                        setActivarFicha={setActivarFicha}
                        ActivarFicha={ActivarFicha}
                      />
                    </div>
                  </div>
                  <div className="row mt-4 text-start">
                    <div className="col-12">
                      <h5 className="fw-bolder">Lista de Fichas</h5>
                      <ListaFichas
                        setActivarFicha={setActivarFicha}
                        ActivarFicha={ActivarFicha}
                      />
                    </div>
                  </div>
                </div>
                {/*FIN FICHAS */}
              </>
            </div>
          </div>
        </>
      )}
      {usuario.idRol == "4" && <SesionBackOffice />}
      {usuario.idRol == "5" && <SesionGerenteAdministracion />}
    </>
  );
}

export default SesionIniciada;
