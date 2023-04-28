import React, { useEffect, useState, useContext } from "react";
import LogoRelix from "../../img/relixjpgg.png";
import register from "../../img/register.svg";
import { Form, Button, Col, Row, Table, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
///////////////
import authContext from "../../context/autenticacion/authContext";
import alertContext from "../../context/alertas/alertaContext";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { peticionObtenerRoles } from "./service/rolesService";


function Registrar() {
  /////////////////////////////////

  const alertascontext = useContext(alertContext);
  const { alerta, mostrarAlerta } = alertascontext;
  /////////////////////////////////
  const autentificaciones = useContext(authContext);
  const { mensaje } = autentificaciones;
  /////////////////////////////////
  const [infoPeticion, setInfoPeticion] = useState("");
  const [banderaPeticion, setbanderaPeticion] = useState(false);
    const [todosLosUsuarios, setTodosLosUsuarios] = useState([]);
  //
  const [roles, setRoles] = useState(null)


  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    // eslint-disable-next-line
  }, [mensaje]);

  useEffect(() => {
    peticionMostrarUsuarios();
   
    setTimeout(() => {
      obtenerTodosLosRoles()
    }, 3000);
  }, []);

  const obtenerTodosLosRoles =async()=>{
    const roles = await peticionObtenerRoles()
    setRoles(roles)
   // console.log('ver roles =>',roles)
  }

  const [registrarUsuario, setregistrarUsuario] = useState({
    idUsuario: "",
    nombreUsuario: "",
    correoUsuario: "",
    apellidoUsuario: "",
    idRol: "",
    rutas: [],
  });
  const {
    nombreUsuario,
    apellidoUsuario,
    correoUsuario,
    idRol,
    idUsuario,
    rutas,
  } = registrarUsuario;

  const actualizarInput = (e) => {
    setregistrarUsuario({
      ...registrarUsuario,
      [e.target.name]: e.target.value,
    });
  };
  /////////////////////////////////////////////////////////////////
  const [listaChecks, setListaChecks] = useState({
    moduloRegistroUsuario: false,
    moduloRegistrarFichaTecnica: false,
    moduloVerFichasTecnicasDisenador: false,
    moduloVerFichasTecnicasBackoffice: false,
    moduloVerFichasTecnicasIngeniero: false,
    moduloDescargarReportePipeLine: false,
    moduloReportePresupuesto: false,
    moduloRegistroVendedor: false,
    moduloReporteAnalisis: false,
    moduloVerFichasTecnicasGerenteGeneral: false,
    moduloReporteCotizacion: false,
    moduloFichaDeGastos: false,
    moduloEditarFichaTecnica: false,
    moduloVerFichasTecnicasGerenteAdministracion: false,
    moduloActualizarMargen: false,
    moduloRegistroPartidasSubpartidas: false,
    moduloMaestroProducto: false,
    moduloMaestroCosto: false,
  });
  const {
    moduloRegistroUsuario,
    moduloRegistrarFichaTecnica,
    moduloVerFichasTecnicasDisenador,
    moduloVerFichasTecnicasBackoffice,
    moduloVerFichasTecnicasIngeniero,
    moduloDescargarReportePipeLine,
    moduloReporteAnalisis,
    moduloVerFichasTecnicasGerenteGeneral,
    moduloVerFichasTecnicasGerenteAdministracion,
    moduloReporteCotizacion,
    moduloFichaDeGastos,
    moduloEditarFichaTecnica,
    moduloReportePresupuesto,
    moduloRegistroVendedor,
    moduloActualizarMargen,
    moduloRegistroPartidasSubpartidas,
    moduloMaestroProducto,
    moduloMaestroCosto,
  } = listaChecks;

  const actualizarCheckout = (e) => {
    setListaChecks({
      ...listaChecks,
      [e.target.name]: e.target.checked,
    });
  };

  //error
  const [error, setError] = useState(null);

  const peticionRegistrarUsuario = async (datos) => {
    try {
      /* console.log("haber token", localStorage.getItem("token")); */
      const { data } = await clienteAxios.post("/api/usuarios", datos, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setInfoPeticion(data);
      setbanderaPeticion(true);
      console.log("haber data de registrarUsuario", data);
      peticionMostrarUsuarios();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registro exitoso",
        showConfirmButton: false,
        timer: 1500,
      });
      setError(null);
      return data;
    } catch (error) {
      console.log(error.response.data.messages.error);
      setError(error.response.data.messages.error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.messages.error}`,
      });
    }
  };

  const peticionActualizarUsuario = async (idUsuario, datos) => {
    console.log("Put peticionActualizarUsuario ->", datos);
    try {
      /* console.log("haber token", localStorage.getItem("token")); */
      const { data } = await clienteAxios.put(
        `/api/usuarios/${idUsuario}`,
        datos,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      peticionMostrarUsuarios();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const peticionMostrarUsuarios = async () => {
    try {
      /* console.log("haber token", localStorage.getItem("token")); */
      const { data } = await clienteAxios.get("/api/usuarios", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      /* console.log("haber data de peticionMostrarUsuarios", data); */
      setTodosLosUsuarios(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  //Registrar usuario
  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        nombreUsuario.trim() === "" ||
        apellidoUsuario.trim() === "" ||
        correoUsuario.trim() === "" ||
        idRol.trim() === ""
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `No puede haber un valor vacio`,
        });
        return;
      }

      const data = {
        nombreUsuario: nombreUsuario,
        correoUsuario: correoUsuario,
        apellidoUsuario: apellidoUsuario,
        idRol: idRol,
        rutas: [
          {
            id: "1",
            estado: moduloRegistroUsuario,
          },
          {
            id: "2",
            estado: moduloRegistrarFichaTecnica,
          },
          {
            id: "3",
            estado: moduloVerFichasTecnicasDisenador,
          },
          {
            id: "4",
            estado: moduloVerFichasTecnicasBackoffice,
          },
          {
            id: "5",
            estado: moduloVerFichasTecnicasIngeniero,
          },
          {
            id: "6",
            estado: moduloDescargarReportePipeLine,
          },
          {
            id: "7",
            estado: moduloReportePresupuesto,
          },
          {
            id: "8",
            estado: moduloReporteAnalisis,
          },
          {
            id: "9",
            estado: moduloRegistroVendedor,
          },
          {
            id: "10",
            estado: moduloVerFichasTecnicasGerenteGeneral,
          },
          {
            id: "11",
            estado: moduloReporteCotizacion,
          },
          {
            id: "12",
            estado: moduloFichaDeGastos,
          },
          {
            id: "13",
            estado: moduloEditarFichaTecnica,
          },
          {
            id: "14",
            estado: moduloVerFichasTecnicasGerenteAdministracion,
          },
          {
            id: "15",
            estado: moduloActualizarMargen,
          },
          {
            id: "16",
            estado: moduloRegistroPartidasSubpartidas,
          },
          {
            id: "17",
            estado: moduloMaestroProducto,
          },
          {
            id: "18",
            estado: moduloMaestroCosto,
          },
        ],
      };
      console.log("funciona haber data", data);
      peticionRegistrarUsuario(data);

      /* setError(null); */
    } catch (error) {
      console.log(error);
    }
  };
  //modal EDITAR AQUI ES PARA PONER MAS MODULOS NO OLVIDAR
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setregistrarUsuario({
      nombreUsuario: "",
      correoUsuario: "",
      apellidoUsuario: "",
      idRol: "",
    });
    setListaChecks({
      moduloRegistroUsuario: "",
      moduloRegistrarFichaTecnica: "",
      moduloVerFichasTecnicasDisenador: "",
      moduloVerFichasTecnicasBackoffice: "",
      moduloVerFichasTecnicasIngeniero: "",
      moduloDescargarReportePipeLine: "",
      moduloReportePresupuesto: "",
      moduloReporteAnalisis: "",
      moduloVerFichasTecnicasGerenteGeneral: "",
      moduloVerFichasTecnicasGerenteAdministracion: "",
      moduloActualizarMargen: "",
      moduloRegistroPartidasSubpartidas: "",
      moduloMaestroProducto: "",
      moduloMaestroCosto: "",
      moduloReporteCotizacion: "",
      moduloFichaDeGastos: "",
      moduloEditarFichaTecnica: "",
      moduloRegistroVendedor: "",
    });
  };
  const handleShow = () => setShow(true);
  const seleccionarUsuario = (item) => {
    console.log("estas Editando", item);
    setregistrarUsuario(item);
    /*    if (item.rutas.length <= 0) {
      setListaChecks({
        moduloRegistroUsuario: "",
        moduloRegistrarFichaTecnica: "",
        moduloVerFichasTecnicasDisenador: "",
        moduloVerFichasTecnicasBackoffice: "",
        moduloVerFichasTecnicasIngeniero: "",
        moduloDescargarReportePipeLine: "",
        moduloReportePresupuesto: "",
        moduloReporteAnalisis: "",
        moduloRegistroVendedor: "",
        moduloVerFichasTecnicasGerenteGeneral: "",
        moduloVerFichasTecnicasGerenteAdministracion: "",
        moduloActualizarMargen: "",
        moduloRegistroPartidasSubpartidas: "",
        moduloMaestroProducto: "",
        moduloReporteCotizacion: "",
        moduloFichaDeGastos: "",
        moduloEditarFichaTecnica: "",
      });
    } else {
    } */

    handleShow();
  };

  //modal EDITAR AQUI ES PARA PONER MAS MODULOS NO OLVIDAR
  const editarUsuario = async () => {
    console.log("estas editando");
    console.log("haber id", idUsuario);
    try {
      const data = {
        nombreUsuario: nombreUsuario,
        correoUsuario: correoUsuario,
        apellidoUsuario: apellidoUsuario,
        idRol: idRol,
        rutas: [
          {
            id: "1",
            estado: moduloRegistroUsuario,
          },
          {
            id: "2",
            estado: moduloRegistrarFichaTecnica,
          },
          {
            id: "3",
            estado: moduloVerFichasTecnicasDisenador,
          },
          {
            id: "4",
            estado: moduloVerFichasTecnicasBackoffice,
          },
          {
            id: "5",
            estado: moduloVerFichasTecnicasIngeniero,
          },
          {
            id: "6",
            estado: moduloDescargarReportePipeLine,
          },
          {
            id: "7",
            estado: moduloReportePresupuesto,
          },
          {
            id: "8",
            estado: moduloReporteAnalisis,
          },
          {
            id: "9",
            estado: moduloRegistroVendedor,
          },
          {
            id: "10",
            estado: moduloVerFichasTecnicasGerenteGeneral,
          },
          {
            id: "11",
            estado: moduloReporteCotizacion,
          },
          {
            id: "12",
            estado: moduloFichaDeGastos,
          },
          {
            id: "13",
            estado: moduloEditarFichaTecnica,
          },
          {
            id: "14",
            estado: moduloVerFichasTecnicasGerenteAdministracion,
          },
          {
            id: "15",
            estado: moduloActualizarMargen,
          },
          {
            id: "16",
            estado: moduloRegistroPartidasSubpartidas,
          },
          {
            id: "17",
            estado: moduloMaestroProducto,
          },
          {
            id: "18",
            estado: moduloMaestroCosto,
          },
        ],
      };

      console.log("haber data para editar", data, "id", idUsuario);
      await peticionActualizarUsuario(idUsuario, data);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  //modal EDITAR AQUI ES PARA PONER MAS MODULOS NO OLVIDAR
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="pt-4 container">
          <div className="row">
                <div className="col-12 col-md-6">
                  <div className="alert alert-info" role="alert">
                    Se esta haciendo un upgrade de mejoria , muchas gracias !
                  </div>
                </div>
              </div>
      <TabContext value={value}>
        <TabList aria-label="tabs example" onChange={handleChange}>
          <Tab label="Registrar Usuario" value="1" />
          <Tab label="Ver Usuarios" value="2" />
        </TabList>

        <TabPanel value="1">
          {" "}
          <div className="d-flex justify-content-center align-items-center ">
            <div className="container">
              {/*  <div className="row">
                <h2 className="text-primary mb-4 text-uppercase">Registrar un Usuario</h2>
                <hr />
              </div> */}
          
              <row>
                {!error ? (
                  <span className="text-danger">{error}</span>
                ) : (
                  <span className="text-danger text-uppercase">{error}</span>
                )}
              </row>
              <div className="row">
                <div
                  className="col-12 col-lg-12"
                  style={{
                    background: "white",
                    boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <div
                    style={{
                      background: "white",
                      height: "100%",
                    }}
                    className="d-flex flex-column "
                  >
                    <div style={{ background: "white" }}>
                      <img src={LogoRelix} alt="" className="mt-4 mb-4" />
                      <h3
                        style={{ background: "white" }}
                        className="text-uppercase"
                      >
                        Registrar
                      </h3>
                    </div>
                    <div>
                      <Form
                        style={{ background: "white" }}
                        className="pb-5"
                        onSubmit={(e) => manejarSubmit(e)}
                      >
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicText"
                          style={{ background: "white" }}
                        >
                          <Form.Label style={{ background: "white" }}>
                            Nombre:
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Ingrese su Nombre"
                            name="nombreUsuario"
                            value={nombreUsuario}
                            onChange={(e) => actualizarInput(e)}
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicText"
                          style={{ background: "white" }}
                        >
                          <Form.Label style={{ background: "white" }}>
                            Apellido:
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Ingrese su Apellido"
                            name="apellidoUsuario"
                            value={apellidoUsuario}
                            onChange={(e) => actualizarInput(e)}
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicEmail"
                          style={{ background: "white" }}
                        >
                          <Form.Label style={{ background: "white" }}>
                            Correo:
                          </Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Ingrese su Correo"
                            name="correoUsuario"
                            value={correoUsuario}
                            onChange={(e) => actualizarInput(e)}
                          />
                        </Form.Group>

                        <Form.Group
                          controlId="formGridState"
                          style={{ background: "white" }}
                        >
                          <Form.Label style={{ background: "white" }}>
                            Rol
                          </Form.Label>
                          <Form.Select
                            defaultValue="Seleccione"
                            name="idRol"
                            value={idRol}
                            onChange={(e) => {
                              actualizarInput(e);
                            }}
                          >
                            <option value="" selected disabled hidden>
                              Seleccione
                            </option>
                            {
                             roles && (
                              roles.map((usuario,i) =>
                              (
                                <option key={i}
                                value={usuario.idRol}
                                onChange={(e) => {
                                  actualizarInput(e);
                                }}
                                >
                                 { usuario.nombreRol}
                                </option>
                              ))
                             )
                            }
                          </Form.Select>
                        </Form.Group>
                        <Form.Group
                          controlId="formGridState"
                          style={{ background: "white" }}
                        >
                          <Form.Label style={{ background: "white" }}>
                            Acciones
                          </Form.Label>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <label>
                            <input
                              type="checkbox"
                              name="moduloRegistroUsuario"
                              value={moduloRegistroUsuario}
                              onChange={(e) => {
                                actualizarCheckout(e);
                              }}
                            />
                            Registrar Usuario
                          </label>
                          <br />
                          <label>
                            <input
                              type="checkbox"
                              name="moduloRegistrarFichaTecnica"
                              value={moduloRegistrarFichaTecnica}
                              onChange={(e) => {
                                actualizarCheckout(e);
                              }}
                            />
                            Registrar Ficha Técnica de Proyecto
                          </label>
                          <br />
                          <label>
                            <input
                              type="checkbox"
                              name="moduloVerFichasTecnicasDisenador"
                              value={moduloVerFichasTecnicasDisenador}
                              onChange={(e) => {
                                actualizarCheckout(e);
                              }}
                            />
                            Ver fichas tecnicas-Diseñador
                          </label>
                          <br />
                          <label>
                            <input
                              type="checkbox"
                              name="moduloVerFichasTecnicasBackoffice"
                              value={moduloVerFichasTecnicasBackoffice}
                              onChange={(e) => {
                                actualizarCheckout(e);
                              }}
                            />
                            Ver fichas tecnicas-Backoffice
                          </label>
                          <br />
                          <label>
                            <input
                              type="checkbox"
                              name="moduloVerFichasTecnicasIngeniero"
                              value={moduloVerFichasTecnicasIngeniero}
                              onChange={(e) => {
                                actualizarCheckout(e);
                              }}
                            />
                            Ver fichas tecnicas-Ingeniero
                          </label>
                          <br />
                          <label>
                            <input
                              type="checkbox"
                              name="moduloDescargarReportePipeLine"
                              value={moduloDescargarReportePipeLine}
                              onChange={(e) => {
                                actualizarCheckout(e);
                              }}
                            />
                            Descargar Reporte Pipeline
                          </label>
                          <br />
                          <label>
                            <input
                              type="checkbox"
                              name="moduloReportePresupuesto"
                              value={moduloReportePresupuesto}
                              onChange={(e) => {
                                actualizarCheckout(e);
                              }}
                            />
                            Reporte presupuesto
                          </label>
                          <br />
                          <label>
                            <input
                              type="checkbox"
                              name="moduloReporteAnalisis"
                              value={moduloReporteAnalisis}
                              onChange={(e) => {
                                actualizarCheckout(e);
                              }}
                            />
                            Reporte analisis
                          </label>
                          <br />
                          <label>
                            <input
                              type="checkbox"
                              name="moduloVerFichasTecnicasGerenteGeneral"
                              value={moduloVerFichasTecnicasGerenteGeneral}
                              onChange={(e) => {
                                actualizarCheckout(e);
                              }}
                            />
                            Ver fichas tecnicas - Gerente general
                          </label>
                          <br />
                          <label>
                            <input
                              type="checkbox"
                              name="moduloVerFichasTecnicasGerenteAdministracion"
                              value={
                                moduloVerFichasTecnicasGerenteAdministracion
                              }
                              onChange={(e) => {
                                actualizarCheckout(e);
                              }}
                            />
                            Ver fichas tecnicas - Gerente administracion
                          </label>
                          <br />
                          <label>
                            <input
                              type="checkbox"
                              name="moduloActualizarMargen"
                              value={moduloActualizarMargen}
                              onChange={(e) => {
                                actualizarCheckout(e);
                              }}
                            />
                            Actualizar margen
                          </label>
                          <br />
                          <label>
                            <input
                              type="checkbox"
                              name="moduloRegistroPartidasSubpartidas"
                              value={moduloRegistroPartidasSubpartidas}
                              onChange={(e) => {
                                actualizarCheckout(e);
                              }}
                            />
                            Registro partidas y subpartidas
                          </label>
                          <br />
                          <label>
                            <input
                              type="checkbox"
                              name="moduloMaestroProducto"
                              value={moduloMaestroProducto}
                              onChange={(e) => {
                                actualizarCheckout(e);
                              }}
                            />
                            Maestro producto
                          </label>
                          <br />
                          <label>
                            <input
                              type="checkbox"
                              name="moduloMaestroCosto"
                              value={moduloMaestroCosto}
                              onChange={(e) => {
                                actualizarCheckout(e);
                              }}
                            />
                            Maestro Costo
                          </label>

                          <br />
                          <label>
                            <input
                              type="checkbox"
                              name="moduloReporteCotizacion"
                              value={moduloReporteCotizacion}
                              onChange={(e) => {
                                actualizarCheckout(e);
                              }}
                            />
                            Metrado de materiales
                          </label>
                          <br />
                          <label>
                            <input
                              type="checkbox"
                              name="moduloFichaDeGastos"
                              value={moduloFichaDeGastos}
                              onChange={(e) => {
                                actualizarCheckout(e);
                              }}
                            />
                            Modulo Ficha de gasto
                          </label>

                          <br />
                          <label>
                            <input
                              type="checkbox"
                              name="moduloEditarFichaTecnica"
                              value={moduloEditarFichaTecnica}
                              onChange={(e) => {
                                actualizarCheckout(e);
                              }}
                            />
                            Modulo Editar ficha tecnica
                          </label>

                          <br />
                          <label>
                            <input
                              type="checkbox"
                              name="moduloRegistroVendedor"
                              value={moduloRegistroVendedor}
                              onChange={(e) => {
                                actualizarCheckout(e);
                              }}
                            />
                            Registrar Vendedor
                          </label>
                        </Form.Group>

                        <Button
                          variant="info w-100 mt-4 text-white"
                          type="submit"
                          style={{
                            background:
                              "linear-gradient(180deg, #1478A3 0%, rgba(37, 182, 244, 0.51) 100%)",
                            border: "none",
                          }}
                        >
                          Registrar
                        </Button>
                      </Form>
                    </div>
                  </div>
                </div>

                {/*  <div className="col-12 col-lg-6 mx-0 px-0 ">
                  <img
                    src={register}
                    alt=""
                    style={{
                      background:
                        "linear-gradient(180deg, #1478A3 0%, rgba(37, 182, 244, 0.51) 100%)",
                      boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.15)",
                      width: "100%",
                      height: "100%",
                      borderRadius: "0 10px 10px 0",
                    }}
                    className="img-fluid"
                  />
                </div> */}
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value="2">
          {" "}
          <div className="container">
            {/*         <h3 className="text-success mt-5">Lista de usuarios creados</h3> */}
            <hr />
            {todosLosUsuarios.length > 0 ? (
              <Table  bordered hover>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Rol</th>
                    <th>Correo</th>
                    <th>Modulos</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {todosLosUsuarios.map((usuario, i) => (
                    <tr key={i}>
                      <td>{usuario.nombreUsuario}</td>
                      <td>{usuario.apellidoUsuario}</td>
                      <td>{usuario.nombreRol}</td>
                      <td>{usuario.correoUsuario}</td>
                      {usuario.rutas.length <= 0 ? (
                        <td> No tiene Modulos</td>
                      ) : (
                        <td>
                          {usuario.rutas.map((ruta, i) => (
                            <span key={i}>
                              {ruta.estado === true ? (
                                <span className="badge bg-primary mx-1">
                                  {ruta.nombreModulo} 
                                </span>
                              ) : (
                                <span className="badge bg-danger mx-1">
                                  {ruta.nombreModulo}
                                </span>
                              )}
                            </span>
                          ))}
                        </td>
                      )}
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => seleccionarUsuario(usuario)}
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p className="text-danger text-center">
                No ha creado ningun usuario aun
              </p>
            )}

            <Modal show={show} onHide={handleClose} backdrop="static">
              <Modal.Header>
                <div>
                  <h3>Editar Usuario</h3>
                </div>
              </Modal.Header>
              <Modal.Body>
                <div className="form-group">
                  <label>Id</label>
                  <input
                    type="text"
                    className="form-control"
                    name="idUsuario"
                    value={registrarUsuario && registrarUsuario.idUsuario}
                    disabled
                  />
                  <br />
                  <label>Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombreUsuario"
                    value={registrarUsuario && registrarUsuario.nombreUsuario}
                    onChange={(e) => actualizarInput(e)}
                  />
                  <br />
                  <label>Apellido</label>
                  <input
                    type="text"
                    className="form-control"
                    name="apellidoUsuario"
                    value={registrarUsuario && registrarUsuario.apellidoUsuario}
                    onChange={(e) => actualizarInput(e)}
                  />
                  <br />
                  <label>Correo</label>
                  <input
                    type="email"
                    className="form-control"
                    name="correoUsuario"
                    value={registrarUsuario && registrarUsuario.correoUsuario}
                    onChange={(e) => actualizarInput(e)}
                  />
                  <br />
                  <Form.Select
                    defaultValue="Seleccione"
                    name="idRol"
                    value={registrarUsuario && registrarUsuario.idRol}
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  >
                    <option value="" selected disabled hidden>
                      Seleccione
                    </option>
                    <option value="1">Administrador de sistema</option>
                    <option value="2">Gerente general</option>
                    <option value="3">Ingeniero</option>
                    <option value="4">Backoffice</option>
                    <option value="5">Gerente de administracion</option>
                  </Form.Select>
                  <div className="text-warning my-2">
                    No se olvide de seleccionar modulos
                  </div>
                  <label>
                    {/*   {
                    registrarUsuario.rutas.length> 1 &&(
                      console.log('ver RUTAS 1=>',registrarUsuario.rutas[0].estado)
                    )
                    } */}
                    <input
                      type="checkbox"
                      name="moduloRegistroUsuario"
                      /*  checked={registrarUsuario.rutas.length> 1 && registrarUsuario.rutas[0].estado} */
                      checked={listaChecks && listaChecks.moduloRegistroUsuario}
                      onChange={(e) => {
                        actualizarCheckout(e);
                      }}
                    />
                    Registrar Usuario
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="moduloRegistrarFichaTecnica"
                      /* checked={registrarUsuario && registrarUsuario.rutas[1]} */
                      checked={
                        listaChecks && listaChecks.moduloRegistrarFichaTecnica
                      }
                      onChange={(e) => {
                        actualizarCheckout(e);
                      }}
                    />
                    Registrar Ficha Técnica de Proyecto
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="moduloVerFichasTecnicasDisenador"
                      checked={
                        listaChecks &&
                        listaChecks.moduloVerFichasTecnicasDisenador
                      }
                      onChange={(e) => {
                        actualizarCheckout(e);
                      }}
                    />
                    Ver Fichas tecnicas disenador
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="moduloVerFichasTecnicasBackoffice"
                      checked={
                        listaChecks &&
                        listaChecks.moduloVerFichasTecnicasBackoffice
                      }
                      onChange={(e) => {
                        actualizarCheckout(e);
                      }}
                    />
                    Ver Fichas tecnicas backoffice
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="moduloVerFichasTecnicasIngeniero"
                      checked={
                        listaChecks &&
                        listaChecks.moduloVerFichasTecnicasIngeniero
                      }
                      onChange={(e) => {
                        actualizarCheckout(e);
                      }}
                    />
                    Ver Fichas tecnicas ingeniero
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="moduloDescargarReportePipeLine"
                      checked={
                        listaChecks &&
                        listaChecks.moduloDescargarReportePipeLine
                      }
                      onChange={(e) => {
                        actualizarCheckout(e);
                      }}
                    />
                    Descargar Reporte Pipeline
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="moduloReportePresupuesto"
                      checked={
                        listaChecks && listaChecks.moduloReportePresupuesto
                      }
                      onChange={(e) => {
                        actualizarCheckout(e);
                      }}
                    />
                    Reporte presupuesto
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="moduloReporteAnalisis"
                      checked={listaChecks && listaChecks.moduloReporteAnalisis}
                      onChange={(e) => {
                        actualizarCheckout(e);
                      }}
                    />
                    Reporte analisis
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="moduloVerFichasTecnicasGerenteGeneral"
                      checked={
                        listaChecks &&
                        listaChecks.moduloVerFichasTecnicasGerenteGeneral
                      }
                      onChange={(e) => {
                        actualizarCheckout(e);
                      }}
                    />
                    Ver fichas tecnicas gerente general
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="moduloVerFichasTecnicasGerenteAdministracion"
                      checked={
                        listaChecks &&
                        listaChecks.moduloVerFichasTecnicasGerenteAdministracion
                      }
                      onChange={(e) => {
                        actualizarCheckout(e);
                      }}
                    />
                    Ver fichas tecnicas gerente administracion
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="moduloActualizarMargen"
                      checked={
                        listaChecks && listaChecks.moduloActualizarMargen
                      }
                      onChange={(e) => {
                        actualizarCheckout(e);
                      }}
                    />
                    Actualizar margen
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="moduloRegistroPartidasSubpartidas"
                      checked={
                        listaChecks &&
                        listaChecks.moduloRegistroPartidasSubpartidas
                      }
                      onChange={(e) => {
                        actualizarCheckout(e);
                      }}
                    />
                    Registro Partidas-Subpartidas
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="moduloMaestroProducto"
                      checked={listaChecks && listaChecks.moduloMaestroProducto}
                      onChange={(e) => {
                        actualizarCheckout(e);
                      }}
                    />
                    Maestro producto
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="moduloMaestroCosto"
                      checked={listaChecks && listaChecks.moduloMaestroCosto}
                      onChange={(e) => {
                        actualizarCheckout(e);
                      }}
                    />
                    Maestro Costo
                  </label>

                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="moduloReporteCotizacion"
                      checked={
                        listaChecks && listaChecks.moduloReporteCotizacion
                      }
                      onChange={(e) => {
                        actualizarCheckout(e);
                      }}
                    />
                    Metrado de materiales
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="moduloFichaDeGastos"
                      checked={listaChecks && listaChecks.moduloFichaDeGastos}
                      onChange={(e) => {
                        actualizarCheckout(e);
                      }}
                    />
                    Reporte ficha de gasto
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="moduloEditarFichaTecnica"
                      checked={
                        listaChecks && listaChecks.moduloEditarFichaTecnica
                      }
                      onChange={(e) => {
                        actualizarCheckout(e);
                      }}
                    />
                    Reporte Editar ficha tecnica
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="moduloRegistroVendedor"
                      checked={
                        listaChecks && listaChecks.moduloRegistroVendedor
                      }
                      onChange={(e) => {
                        actualizarCheckout(e);
                      }}
                    />
                    Registro vendedor
                  </label>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button
                  className="btn btn-primary"
                  onClick={() => editarUsuario()}
                >
                  Actualizar
                </button>
                <button className="btn btn-danger" onClick={handleClose}>
                  Cancelar
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        </TabPanel>
      </TabContext>
    </div>
  );
}

export default Registrar;
