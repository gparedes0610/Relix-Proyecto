import React, { useContext, useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import LogoRelix from "../assets/relixsinfondo.png";

import authContext from "../context/autenticacion/authContext";
import fichaTecnicaContext from "../context/fichaTecnica/fichaTecnicaContext";
function NavBar() {
  /////////////////////////////////
  const autentificaciones = useContext(authContext);
  const { usuario, usuarioAutenticado, cerrarSesion } = autentificaciones;
  ///////////////////////////////
  ///////////////////////////////
  const fichatecnicacontext = useContext(fichaTecnicaContext);
  const { fichaTecnica } = fichatecnicacontext;
  //////////////////////////////
  const btnMaestroProducto = () => {
    console.log("hiciste click en maestro producto");
  };
  if (!usuario) {
    return null;
  }
  return (
    <Navbar expand="lg" style={{ background: "#e3f2fd" }} className="mb-4">
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            src={LogoRelix}
            alt="relix"
            className="img-fluid"
            style={{ width: "165px" }}
          />
        </Navbar.Brand>
        <span className="text-uppercase h6 pt-2" style={{ color: "#001737" }}>
          DashBoard {">"}{" "}
          {usuario.idRol == 1 && (
            <span className="text-uppercase h6" style={{ color: "#4253FF" }}>
              PANEL DE ADMINISTRADOR DE SISTEMAS
            </span>
          )}
          {usuario.idRol == 2 && (
            <span className="text-uppercase h6" style={{ color: "#4253FF" }}>
              NECESITA SELECCIONAR UNA FICHA TECNICA PARA REVISION
            </span>
          )}
          {usuario.idRol == 3 &&
            (fichaTecnica ? (
              <>
                <span
                  className="lead fw-bolder fw-bold"
                  style={{ color: "#4253FF" }}
                >
                  {fichaTecnica[0].nombreFichatecnica}
                </span>
              </>
            ) : (
              <span className="lead fw-bolder" style={{ color: "#4253FF" }}>
                Seleccione o asigne una ficha tecnica
              </span>
            ))}
        </span>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown
              title={
                <div className="d-inline">
                  <span>
                    {`Bienvenido ${usuario.nombreUsuario} (${usuario.nombreRol})`}
                  </span>
                </div>
              }
              id="basic-nav-dropdown"
              className="pe-5"
            >
              {usuario.idRol == "4" && (
                <NavDropdown.Item onClick={() => btnMaestroProducto()}>
                  Maestro de Producto
                </NavDropdown.Item>
              )}
              <NavDropdown.Item onClick={() => cerrarSesion()}>
                Cerrar Sesion
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
