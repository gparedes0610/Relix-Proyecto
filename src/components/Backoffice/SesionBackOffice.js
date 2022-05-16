import React, { useContext, useEffect, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import tablaContext from "../../context/tabla/tablaContext";
import fichaTecnicaContext from "../../context/fichaTecnica/fichaTecnicaContext";

import { obtenerFichasBackOffice } from "./apisBackOffice";
import ListaFichasBackOffice from "./ListaFichasBackOffice";
import ReportePipeLine from "./ReportePipeLine";

import "./estilos.css";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import {
  anularProducto,
  obtenerPartidas,
  obtenerSubPartidas,
  obtenerProductos,
  obtenerEstados,
  agregarProducto,
} from "../../services/apiBackOffice/backOfficeService";

import Swal from "sweetalert2";

function SesionBackOffice() {
  //////////////////////
  const tablacontext = useContext(tablaContext);
  const {
    tablaDatosGerenteGeneral,
    rptaAltaNegocioAdministracion,
    obtenerDatosTablaGerenteGeneral,
  } = tablacontext;
  ////////////////////////
  ///////////////////////////////
  const fichatecnicacontext = useContext(fichaTecnicaContext);
  const { fichaTecnica, obtenerTodasLasFichasTecnicas, reportePepiline } =
    fichatecnicacontext;
  //////////////////////////////
  const [mostrartabla, setMostrartabla] = useState(false);
  const [botonActivo, setBotonActivo] = useState(true);
  const [mostrarReportePipeLine, setMostrarReportePipeLine] = useState(false);

  const [fichasBackOffice, setFichasBackOffice] = useState([]);

  const getData = async () => {
    const obteniendoFichasAceptadas = await obtenerFichasBackOffice();
    try {
      setFichasBackOffice(obteniendoFichasAceptadas);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    obtenerFichasBackOffice();
  }, []);

  const descargarReportePepiline = () => {
    console.log("entraste a descargarReportePepiline");
    reportePepiline();
    setBotonActivo(false);
    setTimeout(() => {
      setBotonActivo(true);
    }, 3500);
  };

  ///modal
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };

  ///BOTON ANULAR
  const [observacionInput, setObservacion] = useState("");
  const btnAnularProducto = (id, idFichaTecnica) => {
    console.log(
      "producto anulado y este es el id",
      id,
      "y escribiste esto",
      observacionInput,
      "id de la ficha tecnica",
      idFichaTecnica
    );
    const data = {
      id: id,
      observacion: observacionInput,
    };
    console.log("se envia esto", data);
    anularProducto(data);
    setTimeout(() => {
      obtenerDatosTablaGerenteGeneral(idFichaTecnica);
    }, 3500);
  };

  //agregar producto manualmente
  const [registrarProducto, setRegistrarProducto] = useState({
    numPartida: "",
    idPartida: "",
    subPartida: "",
    marca: "",
    codProveedor: "",
    codErp: "",
    descripcion: "",
    cantTotal: "",
    precioUnitario: "",
    costoDiseno: "",
    descuento: "",
    observacion: "",
  });
  const {
    numPartida,
    idPartida,
    subPartida,
    marca,
    codProveedor,
    codErp,
    descripcion,
    cantTotal,
    precioUnitario,
    costoDiseno,
    descuento,
    observacion,
  } = registrarProducto;

  const actualizarInput = (e) => {
    setRegistrarProducto({
      ...registrarProducto,
      [e.target.name]: e.target.value,
    });
  };

  //agregar producto

  const btnAgregarProducto = () => {
    setShowModal(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("entraste al form");
    if (
      numPartida.trim() === "" ||
      idPartida.trim() === "" ||
      subPartida.trim() === "" ||
      codErp.trim() === "" ||
      cantTotal.trim() === "" ||
      precioUnitario.trim() === "" ||
      observacion.trim() === ""
    ) {
      Swal.fire("Sucedio un error", "Verifique si lo hizo bien", "error");
      return;
    }
    const data = {
      ...registrarProducto,
      idFichatecnica: fichaTecnica[0].idFichatecnica,
    };
    console.log("esta data final", data);
    agregarProducto(data);
  };
  //obtener partidas
  const [partidas, setPartidas] = useState(null);
  const obteniendoPartidas = async () => {
    try {
      const result = await obtenerPartidas();
      //console.log(result);
      setPartidas(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    obteniendoPartidas();
  }, []);

  //obtener subPartidas
  const [subpartidas, setSubPartidas] = useState(null);

  const setAgarrarPartida = async (valor) => {
    try {
      const result = await obtenerSubPartidas(valor);
      setSubPartidas(result);
    } catch (error) {
      console.log(error);
    }
  };

  //btn buscar
  const [productoPorBusqueda, setProductoPorBusqueda] = useState(null);
  const btnBuscar = async () => {
    console.log("busqued", codErp);
    try {
      const data = await obtenerProductos(codErp);
      //console.log("a ver productos", data);
      setProductoPorBusqueda(data);
    } catch (error) {
      console.log(error);
    }
  };

  //obtener estados

  const [estados, setEstados] = useState(null);
  const obteniendoEstados = async () => {
    try {
      const result = await obtenerEstados();
      console.log(result);
      setEstados(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    obteniendoEstados();
  }, []);

  //checkboxs
  //console.log("datos de tabla", tablaDatosGerenteGeneral);
  const [tablaDatos, setTablaDatos] = useState(tablaDatosGerenteGeneral);
  useEffect(() => {
    setTablaDatos(tablaDatosGerenteGeneral);
  }, []);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    console.log("haber el nombre", name, "el checked", checked);

    let tempUser = tablaDatosGerenteGeneral.map((dato) =>
      dato.idDetallefichatecnica === name
        ? { ...dato, isChecked: checked }
        : dato
    );
  };
  return (
    <div className="container-fluid">
      <h3 className="text-success text-uppercase">Bienvenido BackOffice</h3>

      {mostrarReportePipeLine ? null : (
        <ul>
          <li className="lead">.Hacer click en "Ver Lista de Materiales".</li>
          <li className="lead">.Hacer los cambios respectivos.</li>
        </ul>
      )}
      <div className="row">
        {fichaTecnica ? (
          <p className="h3 text-uppercase">
            Esta en{" "}
            <strong className="text-primary ">
              {fichaTecnica[0].nombreFichatecnica} -{" "}
              {fichaTecnica[0].numFichatecnica}
            </strong>
          </p>
        ) : null}

        <div className=" col-12 col-xl-8">
          {mostrartabla ? (
            <div>
              <div>
                <Button
                  className="btn btn-success my-2"
                  onClick={() => btnAgregarProducto()}
                >
                  Agregar producto
                </Button>
                <div className="contenedor">
                  <table className="table table-bordered table-hover table-fixed contenedor_tabla">
                    <thead className="grey lighten-2">
                      <tr>
                        <th></th>
                        <th scope="col">N#</th>
                        <th scope="col">Partida</th>
                        <th scope="col">Sub_partida</th>
                        <th scope="col">Marca</th>
                        <th scope="col">Codigo Proveedor</th>
                        <th scope="col">Codigo ERP</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Cantidad Total</th>
                        <th scope="col">Precio Unitario</th>
                        <th scope="col">Precio Total</th>
                        <th scope="col">Costo Diseño</th>
                        <th scope="col">Costo Total</th>
                        <th scope="col">Descuento Unitario</th>
                        <th scope="col">Descuento General</th>
                        <th scope="col">Precio con descuento</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Observaciones</th>
                        <th scope="col">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tablaDatosGerenteGeneral.map((dato, i) => (
                        <tr
                          key={i}
                          className={
                            dato.nombreEstado == "ANULADO" && `table-danger`
                          }
                        >
                          <td>
                            <input
                              type="checkbox"
                              name={dato.idDetallefichatecnica}
                              checked={dato?.isChecked || false}
                              onChange={(e) => handleChange(e)}
                            />
                          </td>
                          <td>{dato.itemDetallefichatecnica}</td>
                          <td>{dato.partidaDetallefichatecnica}</td>
                          <td>{dato.subpartidaDetallefichatecnica}</td>
                          <td>{dato.marcaDetallefichatecnica}</td>
                          <td>{dato.codigoproveedorDetallefichatecnica}</td>
                          <td>{dato.codigosoftcomProducto}</td>
                          <td>{dato.descripcionDetallefichatecnica}</td>
                          <td>{dato.cantidadDetallefichatecnica}</td>
                          <td>$ {dato.preciounitarioDetallefichatecnica}</td>
                          <td>$ {dato.preciototalDetallefichatecnica}</td>
                          <td>$ {dato.costoingDetallefichatecnica}</td>
                          <td>$ {dato.costototalDetallefichatecnica}</td>
                          <td>{dato.descuentounitarioDetallefichatecnica} %</td>
                          <td> {dato.descuentototalDetallefichatecnica} %</td>
                          <td>$ {dato.preciodescuentoDetallefichatecnica}</td>
                          <td> {dato.nombreEstado}</td>
                          {dato.observacionDetallefichatecnica ? (
                            <td> {dato.observacionDetallefichatecnica}</td>
                          ) : (
                            <td>
                              <input
                                type="text"
                                onChange={(e) => setObservacion(e.target.value)}
                              />
                            </td>
                          )}

                          <td className="prueba">
                            {dato.nombreEstado == "ANULADO" ? (
                              <span>Anulacion hecha</span>
                            ) : (
                              <>
                                <Button
                                  className="btn btn-danger"
                                  onClick={() =>
                                    btnAnularProducto(
                                      dato.idDetallefichatecnica,
                                      dato.idFichatecnica
                                    )
                                  }
                                >
                                  Anular
                                </Button>
                                <Button className="btn btn-warning mt-2">
                                  Espera
                                </Button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <Modal
                  size="lg"
                  show={showModal}
                  onHide={handleClose}
                  centered
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Agrege Producto Manualmente</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Row>
                      <Col lg={12}>
                        <Form onSubmit={handleSubmit}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicText"
                          >
                            <Form.Label className="text-uppercase">
                              Numero de Item:
                            </Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="Ingrese numero de item:"
                              name="numPartida"
                              value={numPartida}
                              onChange={(e) => actualizarInput(e)}
                              required
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label className="text-uppercase">
                              Partida:
                            </Form.Label>
                            <Form.Select
                              aria-label="Seleccione una partida"
                              name="idPartida"
                              defaultValue={"3"}
                              onChange={(e) => {
                                setAgarrarPartida(e.target.value);
                                actualizarInput(e);
                              }}
                              required
                            >
                              <option disabled>Seleccione una partida</option>
                              {partidas &&
                                partidas.map((partida, i) => (
                                  <option value={partida.idPartida} key={i}>
                                    {partida.nombrePartida}
                                  </option>
                                ))}
                            </Form.Select>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label className="text-uppercase">
                              Sub Partida:
                            </Form.Label>
                            <Form.Select
                              aria-label="Seleccione una Sub-partida"
                              name="subPartida"
                              value={subPartida}
                              onChange={(e) => {
                                //setAgarrarPartida(e.target.value);
                                actualizarInput(e);
                              }}
                              required
                            >
                              <option disabled>
                                Seleccione una Sub-partida
                              </option>
                              {subpartidas &&
                                subpartidas.map((subpartida, i) => (
                                  <option
                                    value={subpartida.nombreSubPartida}
                                    key={i}
                                  >
                                    {subpartida.nombreSubPartida}
                                  </option>
                                ))}
                            </Form.Select>
                          </Form.Group>

                          <div className="row">
                            <div className="col-12  col-md-6">
                              <Form.Group
                                className="mb-3"
                                controlId="formBasicText"
                              >
                                <Form.Label className="text-uppercase">
                                  Codigo ERP:
                                </Form.Label>
                                <Form.Control
                                  type="number"
                                  placeholder="Ingrese Codigo ERP:"
                                  name="codErp"
                                  value={codErp}
                                  onChange={(e) => actualizarInput(e)}
                                  required
                                />
                              </Form.Group>
                            </div>

                            <div className="col-12  col-md-6">
                              <Form.Group
                                className="mb-3"
                                controlId="formBasicText"
                              >
                                <Form.Label className="text-uppercase">
                                  Buscar codigo erp:
                                </Form.Label>
                                <Button
                                  className="btn btn-warning w-100"
                                  onClick={() => btnBuscar()}
                                >
                                  Buscar
                                </Button>
                              </Form.Group>
                            </div>
                          </div>

                          {productoPorBusqueda ? (
                            <>
                              <Form.Group
                                className="mb-3"
                                controlId="formBasicText"
                              >
                                <Form.Label className="text-uppercase">
                                  Marca:
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Ingrese Marca"
                                  name="marca"
                                  value={productoPorBusqueda.marcaProducto}
                                  onChange={(e) => actualizarInput(e)}
                                  disabled
                                />
                              </Form.Group>

                              <Form.Group
                                className="mb-3"
                                controlId="formBasicText"
                              >
                                <Form.Label className="text-uppercase">
                                  Codigo Proveedor:
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Ingrese Proveedor:"
                                  name="codProveedor"
                                  value={
                                    productoPorBusqueda.codigoreferenciaProducto
                                  }
                                  onChange={(e) => actualizarInput(e)}
                                  disabled
                                />
                              </Form.Group>

                              <Form.Group
                                className="mb-3"
                                controlId="formBasicText"
                              >
                                <Form.Label className="text-uppercase">
                                  Descripcion:
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Ingrese Descripcion:"
                                  // name="descripcion"
                                  value={
                                    productoPorBusqueda.descripcionProducto
                                  }
                                  //  onChange={(e) => actualizarInput(e)}
                                  disabled
                                />
                              </Form.Group>

                              <Form.Group
                                className="mb-3"
                                controlId="formBasicText"
                              >
                                <Form.Label className="text-uppercase">
                                  Costo de diseño:
                                </Form.Label>
                                <Form.Control
                                  type="number"
                                  placeholder="Ingrese Costo de diseño:"
                                  //name="costoDiseno"
                                  value={`${productoPorBusqueda.costodisenoProducto}`}
                                  // onChange={(e) => actualizarInput(e)}
                                  disabled
                                />
                              </Form.Group>
                            </>
                          ) : (
                            <>
                              <Form.Group
                                className="mb-3"
                                controlId="formBasicText"
                              >
                                <Form.Label className="text-uppercase">
                                  Marca:
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Ingrese Marca"
                                  name="marca"
                                  value={marca}
                                  onChange={(e) => actualizarInput(e)}
                                  required
                                />
                              </Form.Group>

                              <Form.Group
                                className="mb-3"
                                controlId="formBasicText"
                              >
                                <Form.Label className="text-uppercase">
                                  Codigo Proveedor:
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Ingrese Proveedor:"
                                  name="codProveedor"
                                  value={codProveedor}
                                  onChange={(e) => actualizarInput(e)}
                                  required
                                />
                              </Form.Group>

                              <Form.Group
                                className="mb-3"
                                controlId="formBasicText"
                              >
                                <Form.Label className="text-uppercase">
                                  Descripcion:
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Ingrese Codigo Descripcion:"
                                  name="descripcion"
                                  value={descripcion}
                                  onChange={(e) => actualizarInput(e)}
                                  required
                                />
                              </Form.Group>

                              <Form.Group
                                className="mb-3"
                                controlId="formBasicText"
                              >
                                <Form.Label className="text-uppercase">
                                  Costo de diseño:
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Ingrese Costo de diseño:"
                                  name="costoDiseno"
                                  value={costoDiseno}
                                  onChange={(e) => actualizarInput(e)}
                                  required
                                />
                              </Form.Group>
                            </>
                          )}

                          {productoPorBusqueda ? (
                            <Form.Group className="mb-3">
                              <Form.Label className="text-uppercase">
                                Precios:
                              </Form.Label>
                              <Form.Select
                                aria-label="Seleccione un Precio"
                                name="precioUnitario"
                                defaultValue={`${productoPorBusqueda.precios.precioventadosProducto}`}
                                onChange={(e) => {
                                  // setAgarrarPartida(e.target.value);
                                  actualizarInput(e);
                                }}
                              >
                                <option disabled>Seleccione un precio</option>

                                <option
                                  value={
                                    productoPorBusqueda.precios
                                      .precioventaunoProducto
                                  }
                                >
                                  ${" "}
                                  {
                                    productoPorBusqueda.precios
                                      .precioventaunoProducto
                                  }
                                </option>

                                <option
                                  value={
                                    productoPorBusqueda.precios
                                      .precioventadosProducto
                                  }
                                >
                                  ${" "}
                                  {
                                    productoPorBusqueda.precios
                                      .precioventadosProducto
                                  }
                                </option>

                                <option
                                  value={
                                    productoPorBusqueda.precios
                                      .precioventatresProducto
                                  }
                                >
                                  ${" "}
                                  {
                                    productoPorBusqueda.precios
                                      .precioventatresProducto
                                  }
                                </option>

                                <option
                                  value={
                                    productoPorBusqueda.precios
                                      .precioventacuatroProducto
                                  }
                                >
                                  ${" "}
                                  {
                                    productoPorBusqueda.precios
                                      .precioventacuatroProducto
                                  }
                                </option>
                              </Form.Select>
                            </Form.Group>
                          ) : (
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicText"
                            >
                              <Form.Label className="text-uppercase">
                                Precio Unitario:
                              </Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Ingrese Precio Unitario:"
                                name="precioUnitario"
                                value={precioUnitario}
                                onChange={(e) => actualizarInput(e)}
                                required
                              />
                            </Form.Group>
                          )}

                          <Form.Group
                            className="mb-3"
                            controlId="formBasicText"
                          >
                            <Form.Label className="text-uppercase">
                              Cantidad Total:
                            </Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="Ingrese  Cantidad Total:"
                              name="cantTotal"
                              value={cantTotal}
                              onChange={(e) => actualizarInput(e)}
                              required
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="formBasicText"
                          >
                            <Form.Label className="text-uppercase">
                              Descuento :
                            </Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="Ingrese Descuento general:"
                              name="descuento"
                              value={descuento}
                              onChange={(e) => actualizarInput(e)}
                              required
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="formBasicText"
                          >
                            <Form.Label className="text-uppercase">
                              Estado:
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Ingrese Observacion:"
                              name="adicional"
                              value={"Adicional"}
                              //onChange={(e) => actualizarInput(e)}
                              disabled
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="formBasicText"
                          >
                            <Form.Label className="text-uppercase">
                              Observacion:
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Ingrese Observacion:"
                              name="observacion"
                              value={observacion}
                              onChange={(e) => actualizarInput(e)}
                              required
                            />
                          </Form.Group>

                          <Button
                            className="btn btn-success mt-3"
                            type="submit"
                          >
                            Guardar
                          </Button>
                        </Form>
                      </Col>
                    </Row>
                  </Modal.Body>
                </Modal>
              </div>
              <div className="row my-3">
                <div className="col-12">
                  {/*  <button className="btn btn-success">Guardar Tabla</button> */}
                  <button className="btn btn-primary ms-4">
                    Generar RQ Pedido
                  </button>
                </div>
              </div>
            </div>
          ) : mostrarReportePipeLine ? null : (
            <p className="lead h3 text-uppercase text-primary">
              Por favor seleccione una ficha para trabajar "Ver Lista de
              Materiales"
            </p>
          )}
          {mostrarReportePipeLine && (
            <ReportePipeLine
              setMostrarReportePipeLine={setMostrarReportePipeLine}
            />
          )}
        </div>

        <div className="col-12 col-xl-4">
          <p className="h3 text-uppercase">Lista de Fichas </p>
          <button
            className="w-100 btn btn-warning text-uppercase mb-3 fw-bolder"
            //onClick={() => mostrarReportePipeline()}
            onClick={() => descargarReportePepiline()}
            disabled={!botonActivo}
          >
            Reporte Pipeline
          </button>
          <ListaFichasBackOffice
            setMostrartabla={setMostrartabla}
            mostrartabla={mostrartabla}
            fichasBackOffice={fichasBackOffice}
            setMostrarReportePipeLine={setMostrarReportePipeLine}
          />
        </div>
      </div>
    </div>
  );
}

export default SesionBackOffice;
