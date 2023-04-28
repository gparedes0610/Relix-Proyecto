import React, { useContext, useEffect, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Container } from "@mui/system";
import Logo from "../img/relixsinfondo.png";
import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";

import authContext from "../context/autenticacion/authContext";

import { Link, Navigate, useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";
function Navbar() {
  let navigate = useNavigate();
  /////////////////////////////////
  const autentificaciones = useContext(authContext);
  const { usuario, cerrarSesion, usuarioAutenticado } = autentificaciones;

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  /*  NAVBAR */
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  /* FIN NAVBAR */

  /* SIDEBAR */

  const [isDraweropen, setIsDraweropen] = useState(false);
  const handleButtonChange = () => {
    console.log("funciona");
    setIsDraweropen(false);
  };
  /* FIN SIDEBAR */

  const btnCerrarSesion = () => {
    console.log("se cierra");
    setAnchorEl(null);
    cerrarSesion();
    navigate(`/`);
  };


  const reportePepiline = async () => {
    console.log("entraste a reportePepiline");
    const fecha = new Date();
    const hoy = fecha.getDate();
    const mesActual = fecha.getMonth() + 1;
    const anoActual = fecha.getFullYear();
    try {
      var config = {
        responseType: "arraybuffer",
      };
      const resultado = await clienteAxios.get(
        `/api/exportarFichasTecnicas`,
        config
      );
      console.log("respuesta de excelReporteDos", resultado.data);

      const url = URL.createObjectURL(
        new Blob([resultado.data], {
          type: "application/vnd.ms-excel",
        })
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `reportePipeLine ${hoy}_${mesActual}_${anoActual}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error.response.data.messages.error);
    }
  };

  const btnReportePipeLine = (accion) => {
    console.log("haber link", accion);
    if (accion.nombreModulo == "Reporte Pipeline") {
      console.log("descargar reporte");
      reportePepiline();
      return;
    }
    /*  if (accion.nombreModulo == "Reporte Presupuesto") {
      console.log("descargar Reporte Presupuesto");
      reportePepiline();
      return;
    } */
    return;
  };

  if (!usuario) {
    return <span>No hay usuario</span>;
  }

  return (
    <Box sx={{ flexGrow: 1, background: "#2E3B55" }}>
      <AppBar position="static" sx={{ background: "#2E3B55" }}>
        <Container maxWidth="xl" sx={{ background: "#2E3B55" }}>
          <Toolbar sx={{ background: "#2E3B55" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={() => setIsDraweropen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/sesioniniciada">
              <img src={Logo} style={{ width: "100" }} />
            </Link>

            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Typography>
              Bienvenido {usuario.nombreUsuario} {usuario.apellidoUsuario}
            </Typography>
            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={btnCerrarSesion}>Cerrar Sesion</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="left"
        open={isDraweropen}
        onClose={() => setIsDraweropen(false)}
      >
        <Box p={2} width="250px" textAlign="center" role="presentation">
          <Typography variant="h6" component="div">
            Panel de Acciones
          </Typography>
          <List>
            {usuario.rutas.length <= 0 ? (
              <span>No tiene modulos</span>
            ) : (
              usuario.rutas.map((accion, i) => (
                <ListItemButton
                  onClick={() => handleButtonChange()}
                  style={{ margin: "10px 0" }}
                  key={i}
                >
                  <Link
                    to={`/${accion.rutaModulo}`}
                    style={{ color: "black", textDecoration: "none" }}
                    onClick={() => btnReportePipeLine(accion)}
                  >
                    {accion.nombreModulo}
                  </Link>
                </ListItemButton>
              ))
            )}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default Navbar;
