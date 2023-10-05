import React, { useContext, useEffect, useState } from "react";
import Logo from "../img/relixsinfondo.png";
import { Link, } from "react-router-dom";
import SideBarMenu from "./SideBarMenu";
import authContext from "../context/autenticacion/authContext";

function Sidebar() {
  const autentificaciones = useContext(authContext);
  const { usuario, usuarioAutenticado } = autentificaciones
  useEffect(() => {
    usuarioAutenticado();
  }, []);
    const [activarSideBar, setActivarSideBar] = useState(false)
    const btnMenu =()=>{
        setActivarSideBar(!activarSideBar)
    }
    if (!usuario) {
        return <span>Cargando informacion</span>;
      }
  return (
    <>
      <header className="header">
        <div className="header__container">
          <img src={Logo} alt="logo relix" className="header__img" />

          <span  className="header__logo">
          Bienvenido {usuario.nombreUsuario} {usuario.apellidoUsuario} - <b>{usuario.nombreRol}</b>
          </span>

          <div className="header__toggle" onClick={()=>btnMenu()}>
            <i className={!activarSideBar ?"bx bx-align-left" : "bx bx-align-left bx-x"}id="header-toggle"></i>
          </div>
        </div>
      </header>
      <SideBarMenu activarSideBar={activarSideBar} setActivarSideBar={setActivarSideBar} usuario={usuario}/>
    </>
  );
}

export default Sidebar;
