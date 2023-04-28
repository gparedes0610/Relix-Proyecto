import React, { useState } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Accordion,
  Button,
  Form,
  Spinner,
  Tab,
  Tabs,
  Card,
} from "react-bootstrap";
import {
  obtenerTiposDeProyectos,
  obtenerVendedores,
  obtenerEstados,
  obtenerDepartamentos,
  obtenerProvincias,
  obtenerDistritos,
  obtenerCodigoFichaTenica,
  obtenerFormasDePago,
} from "../services/apisFichaTecnica";
function EdicionesFichasTecnicas() {
  const [todasLasFichasTecnicas, setTodasLasFichasTecnicas] = useState([]);
  const [fichaTecnica, setFichaTecnica] = useState({});
  const {
    tipoProyecto,
    idDepartamento,
    idProvincia,
  } = fichaTecnica;
  
  const actualizarInput = (e) => {
    setFichaTecnica({
      ...fichaTecnica,
      [e.target.name]: e.target.value,
    });
  };
  
  const obtenerTodasLasFichasTecnicas = async () => {
    try {
      const { data } = await clienteAxios.get("/api/fichatecnica");
      console.log("obtenerTodasLasFichasTecnicas =>", data);
      setTodasLasFichasTecnicas(data);

      return data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    obtenerTodasLasFichasTecnicas();
  }, []);

  const [mostarFicha, setMostarFicha] = useState(false);
  const btnVerTabla = (ficha, indice) => {
    console.log("ver ficha", ficha);
    setFichaTecnica(ficha);
    setMostarFicha(true);
    let lista = document.querySelectorAll(".cambiarcolores");
    lista.forEach((item, i) => {
      if (i === indice) {
        item.classList.add("bg-secondary");
        item.classList.add("text-white");
      } else {
        item.classList.remove("bg-secondary");
        item.classList.remove("text-white");
      }
    });
  };
  //
  const [tiposDeProyectos, setTiposDeProyectos] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [estados, setEstados] = useState([]);
  const [codigoFichaTecnica, setCodigoFichaTecnica] = useState("");
  /////////
  const [departamentos, setDepartamentos] = useState([]);
  const [agarrarDepartamento, setAgarrarDepartamento] = useState("");
  ////////
  const [provincias, setProvincias] = useState([]);
  const [agarrarProvincia, setAgarrarProvincia] = useState("");
  ////////
  const [distritos, setDistritos] = useState([]);
  const [agarrarDistrito, setAgarrarDistrito] = useState("");
  const [formasDePagos, setFormasDePagos] = useState([]);
  const getData = async () => {
    try {
      const tiposDeProyectosObtenidos = await obtenerTiposDeProyectos();
      setTiposDeProyectos(tiposDeProyectosObtenidos);

      const todosLosVendedores = await obtenerVendedores();
      setVendedores(todosLosVendedores);

      const todosLosEstados = await obtenerEstados();
      setEstados(todosLosEstados);

      const obteniendoCodigoFichaTecnica = await obtenerCodigoFichaTenica();
      setCodigoFichaTecnica(obteniendoCodigoFichaTecnica);

      const obteniendoFormasDePago = await obtenerFormasDePago();
      setFormasDePagos(obteniendoFormasDePago);

      const todosLosDepartamentos = await obtenerDepartamentos();
      setDepartamentos(todosLosDepartamentos);

      if (idDepartamento) {
        console.log("id del idDepartamento", idDepartamento);
        const todosLasProvincias = await obtenerProvincias(idDepartamento);
        setProvincias(todosLasProvincias);
      }

      /*  if (agarrarDepartamento) {
        console.log("agarrarDepartamento existe");
        const todosLasProvincias = await obtenerProvincias(idDepartamento);
        setProvincias(todosLasProvincias);
      } */
      if (idProvincia) {
        //console.log("agarrarProvincia existe", agarrarProvincia);
        const todosLosDistritos = await obtenerDistritos(idProvincia);
        setDistritos(todosLosDistritos);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //console.log("vendedores", vendedores);
  //console.log("departamentos", departamentos);
  // console.log("estados", estados);
  //console.log("codigo", codigoFichaTecnica);
  useEffect(() => {
    getData();
  }, [fichaTecnica]); 
  

  //////////////////////////////////////////
  const actualizarFicha = async (ficha) => {
    console.log("actualizarFicha te mando =>", ficha);
    console.log("actualizarFicha id =>", ficha.idFichatecnica);
    try {
      const resultado = await clienteAxios.put(
        `/api/fichatecnica/${ficha.idFichatecnica}`,
        ficha
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Ficha tecnica actualizada correctamente`,
        showConfirmButton: false,
        timer: 2700,
      });
      console.log("PUT de actualizarFicha =>", resultado);
      console.log("PUT de actualizarFicha =>", resultado.data);
      setMostarFicha(false);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.messages.error}`,
      });
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("vas a enviar esto", fichaTecnica);
    actualizarFicha(fichaTecnica);
    obtenerTodasLasFichasTecnicas();
  };
  return (
    <div className="container pt-4 ">
      <div className="my-4 text-center container ">
        <h4 className=" fw-bold border border-secondary rounded p-3 shadow mb-2 bg-body text-uppercase">
        Editar Ficha Técnica de Proyecto
        </h4>
      </div>
      <div className="row">
        <Accordion defaultActiveKey="0" className="mb-4">
          <Accordion.Item eventKey="0">
            <Accordion.Header className="text-uppercase">
              Fichas tecnicas para editar
            </Accordion.Header>
            <Accordion.Body>
              <div
                className="row p-3"
                style={{ height: "300px", overflow: "auto" }}
              >
                {todasLasFichasTecnicas.length <= 0 ? (
                  <span className="text-danger text-uppercase">
                    No hay fichas tecnicas
                  </span>
                ) : (
                  todasLasFichasTecnicas.map((fichaTecnica, i) => (
                    <div className="col-12 col-md-3 col-lg-3 mb-3" key={i}>
                      <Card className="cambiarcolores">
                        <Card.Body>
                          <Card.Title className="text-uppercase">
                            {" "}
                            <span>{fichaTecnica.nombreFichatecnica}</span>-{" "}
                            {fichaTecnica.numFichatecnica}
                          </Card.Title>
                          <Card.Subtitle className="mb-2  text-uppercase border border text-center rounded p-2">
                            {fichaTecnica.estadoFichaproyecto}
                          </Card.Subtitle>

                          <Button
                            className="btn btn-success mx-2 py-0 text-uppercase"
                            onClick={() => btnVerTabla(fichaTecnica, i)}
                          >
                            Ver Lista de Materiales
                          </Button>
                        </Card.Body>
                      </Card>
                    </div>
                  ))
                )}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <div className="row">
        {!mostarFicha ? (
          <p className="text-uppercase h2 fw-bolder text-primary">
            ☝ Seleccione una ficha tecnica 👆
          </p>
        ) : (
          <p className="text-uppercase text-success h2 fw-bolder">
            👉 {fichaTecnica.nombreFichatecnica}-{" "}
            {fichaTecnica.numFichatecnica}
          </p>
        )}
      </div>
      {mostarFicha && (
        <div className="row">
          <Form
            className="border border-1 rounded rounded-md bd-body p-2"
            onSubmit={(e) => onSubmit(e)}
          >
            <div className="row">
              <div className="col-12 col-md-3">
                {" "}
                <Form.Group>
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Ingrese fecha"
                    name="fechaFichatecnica"
                    value={fichaTecnica && fichaTecnica.fechaFichatecnica}
                    onChange={(e) => actualizarInput(e)}
                  />
                </Form.Group>
              </div>
              <div className="col-12 col-md-3">
                <Form.Group>
                  <Form.Label>Division</Form.Label>

                  <Form.Select
                    aria-label="Default select example"
                    value={fichaTecnica && fichaTecnica.idDivision}
                    name="idDivision"
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  >
                    <option value="" selected disabled hidden>
                      Seleccione una Opcion
                    </option>
                    <option value="1">AGUA</option>
                    <option value="2">RIEGO</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-12 col-md-3">
                <Form.Group className="my-2">
                  <Form.Label>Tipo de Proyecto:</Form.Label>
                  {tipoProyecto == "Otros: XXXXX" ? (
                    <>
                      <Form.Control
                        type="text"
                        name="tipoProyectoManual"
                        value={fichaTecnica && fichaTecnica.tipoProyectoManual}
                        placeholder="Tipo del proyecto"
                        onChange={(e) => actualizarInput(e)}
                      />
                      <span className="text-success">
                        Selecciono la opcion manual, si quiere regresar a las
                        opciones por favor actualizar
                      </span>
                    </>
                  ) : (
                    <Form.Select
                      aria-label="Default select example"
                      name="tipoProyecto"
                      value={fichaTecnica && fichaTecnica.tipoProyecto}
                      onChange={(e) => {
                        actualizarInput(e);
                      }}
                    >
                      <option value="" selected disabled hidden>
                        Seleccione
                      </option>
                      {tiposDeProyectos.map((proyecto, i) => (
                        <option
                          key={i}
                          value={proyecto.tipoProyecto}
                          className="text-uppercase"
                        >
                          {proyecto.tipoProyecto}
                        </option>
                      ))}
                    </Form.Select>
                  )}
                </Form.Group>
              </div>
              <div className="col-12 col-md-3">
                {" "}
                <Form.Group>
                  <Form.Label>Proyecto:</Form.Label>

                  <Form.Control
                    type="text"
                    name="nombreFichatecnica"
                    value={fichaTecnica && fichaTecnica.nombreFichatecnica}
                    placeholder="Nombre del proyecto"
                    onChange={(e) => actualizarInput(e)}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-3">
                <Form.Group>
                  <Form.Label>Cliente:</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Cliente"
                    name="clienteFichatecnica"
                    value={fichaTecnica && fichaTecnica.clienteFichatecnica}
                    onChange={(e) => actualizarInput(e)}
                  />
                </Form.Group>
              </div>
              <div className="col-12 col-md-3">
                <Form.Group>
                  <Form.Label>RUC:</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Ruc"
                    name="rucclienteFichatecnica"
                    value={fichaTecnica && fichaTecnica.rucclienteFichatecnica}
                    onChange={(e) => actualizarInput(e)}
                  />
                </Form.Group>
              </div>
              <div className="col-12 col-md-3">
                <Form.Group>
                  <Form.Label>Telefono:</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Telefono"
                    name="telefonoFichatecnica"
                    value={fichaTecnica && fichaTecnica.telefonoFichatecnica}
                    onChange={(e) => actualizarInput(e)}
                  />
                </Form.Group>
              </div>
              <div className="col-12 col-md-3">
                <Form.Group>
                  <Form.Label> Direccion de Fiscal:</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Direccion de Fiscal"
                    name="direccionfiscalFichatecnica"
                    value={
                      fichaTecnica && fichaTecnica.direccionfiscalFichatecnica
                    }
                    onChange={(e) => actualizarInput(e)}
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-3">
                <Form.Group>
                  <Form.Label style={{ background: "white" }}>
                    Vendedor:
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="idVendedor"
                    value={fichaTecnica && fichaTecnica.idVendedor}
                    onChange={(e) => {
                      actualizarInput(e);
                      //cambiarNum(e);
                    }}
                  >
                    <option value="" selected disabled hidden>
                      Seleccione
                    </option>
                    {vendedores.map((vendedor, i) => (
                      <option value={vendedor.idVendedor} key={i}>
                        {vendedor.nombreVendedor}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-12 col-md-3">
                <Form.Group>
                  <Form.Label style={{ background: "white" }}>
                    Departamento:
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="idDepartamento"
                    value={fichaTecnica && fichaTecnica.idDepartamento}
                    onChange={(e) => {
                      setAgarrarDepartamento(e.target.value);
                      actualizarInput(e);
                    }}
                  >
                    <option value="" selected disabled hidden>
                      Seleccione
                    </option>
                    {departamentos.map((departamento, i) => (
                      <option value={departamento.idDepartamento} key={i}>
                        {departamento.nombreDepartamento}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-12 col-md-3">
                <Form.Group>
                  <Form.Label style={{ background: "white" }}>
                    Provincia:
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    //value={fichaEdicion[0].nombreDistrito}
                    name="idProvincia"
                    value={fichaTecnica && fichaTecnica.idProvincia}
                    onChange={(e) => {
                      setAgarrarProvincia(e.target.value);
                      actualizarInput(e);
                    }}
                  >
                    <option value="" selected disabled hidden>
                      Seleccione
                    </option>
                    {provincias.map((provincia, i) => (
                      <option value={provincia.idProvincia} key={i}>
                        {provincia.nombreProvincia}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-12 col-md-3">
                <Form.Group>
                  <Form.Label style={{ background: "white" }}>
                    Distrito:
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="idDistrito"
                    value={fichaTecnica && fichaTecnica.idDistrito}
                    onChange={(e) => {
                      setAgarrarDistrito(e.target.value);
                      actualizarInput(e);
                    }}
                  >
                    <option value="" selected disabled hidden>
                      Seleccione
                    </option>
                    {distritos.map((distrito, i) => (
                      <option value={distrito.idDistrito} key={i}>
                        {distrito.nombreDistrito}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-3">
                <Form.Group
                  controlId="formBasicText"
                  style={{ background: "white" }}
                >
                  <Form.Label style={{ background: "white" }}>
                    Alcance
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Alcance"
                    name="alcanceFichatecnica"
                    value={fichaTecnica && fichaTecnica.alcanceFichatecnica}
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  />
                </Form.Group>
              </div>
              <div className="col-12 col-md-3">
                <Form.Group
                  controlId="formBasicText"
                  style={{ background: "white" }}
                >
                  <Form.Label style={{ background: "white" }}>
                    Area (Has):
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese cantidad de hectareas"
                    name="areaFichatecnica"
                    value={fichaTecnica && fichaTecnica.areaFichatecnica}
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  />
                </Form.Group>
              </div>
              <div className="col-12 col-md-3">
                <Form.Group
                  controlId="formBasicText"
                  style={{ background: "white" }}
                >
                  <Form.Label style={{ background: "white" }}>
                    Cultivo:
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese cultivo"
                    name="cultivoFichatecnica"
                    value={fichaTecnica && fichaTecnica.cultivoFichatecnica}
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  />
                </Form.Group>
              </div>
              <div className="col-12 col-md-3">
                <Form.Group
                  controlId="formBasicText"
                  style={{ background: "white" }}
                >
                  <Form.Label style={{ background: "white" }}>
                    Modalidad del contrato:
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="idModalidadcontrato"
                    value={fichaTecnica && fichaTecnica.idModalidadcontrato}
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  >
                    <option value="" selected disabled hidden>
                      Seleccione una Opcion
                    </option>
                    <option value="1">Suma Alzada</option>
                    <option value="2">Detallado</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-3">
                <Form.Group
                  controlId="formBasicText"
                  style={{ background: "white" }}
                >
                  <Form.Label style={{ background: "white" }}>
                    Modalidad de ejecucion:
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="idModalidadejecucion"
                    value={fichaTecnica && fichaTecnica.idModalidadejecucion}
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  >
                    <option value="" selected disabled hidden>
                      Seleccione una Opcion
                    </option>
                    <option value="1">Llave en mano</option>
                    <option value="2">
                      Suministro de materiales e instalación
                    </option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-12 col-md-3">
                <Form.Group>
                  <Form.Label style={{ background: "white" }}>
                    Detracciones:
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="detraccionesFichatecnica"
                    value={
                      fichaTecnica && fichaTecnica.detraccionesFichatecnica
                    }
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  >
                    <option value="" selected disabled hidden>
                      Seleccione una Opcion
                    </option>
                    <option value="si">Si</option>
                    <option value="no">No</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-12 col-md-3">
                <Form.Group>
                  <Form.Label style={{ background: "white" }}>
                    Retenciones:
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="retencionFichatecnica"
                    value={fichaTecnica && fichaTecnica.retencionFichatecnica}
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  >
                    <option value="" selected disabled hidden>
                      Seleccione una Opcion
                    </option>
                    <option value="si">Si</option>
                    <option value="no">No</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-12 col-md-3">
                <Form.Group>
                  <Form.Label style={{ background: "white" }}>
                    Carta Fianza por Anticipo:
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="cartafianzaFichatecnica"
                    value={fichaTecnica && fichaTecnica.cartafianzaFichatecnica}
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  >
                    <option value="" selected disabled hidden>
                      Seleccione una Opcion
                    </option>
                    <option value="si">Si</option>
                    <option value="no">No</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-3">
                <Form.Group>
                  <Form.Label style={{ background: "white" }}>
                    Fiel Cumplimiento:
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="fielcumplimientoFichatecnica"
                    value={
                      fichaTecnica && fichaTecnica.fielcumplimientoFichatecnica
                    }
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  >
                    <option value="" selected disabled hidden>
                      Seleccione una Opcion
                    </option>
                    <option value="si">Si</option>
                    <option value="no">No</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-12 col-md-3">
                <Form.Group
                  controlId="formBasicText"
                  style={{ background: "white" }}
                >
                  <Form.Label style={{ background: "white" }}>
                    Plazo de ejecucion:
                  </Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Plazo de ejecucion"
                    name="plazoejecucionFichatecnica"
                    value={
                      fichaTecnica && fichaTecnica.plazoejecucionFichatecnica
                    }
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  />
                </Form.Group>
              </div>

              <div className="col-12 col-md-3">
                <Form.Group
                  controlId="formBasicText"
                  style={{ background: "white" }}
                >
                  <Form.Label style={{ background: "white" }}>
                    Inicio Proyectado:
                  </Form.Label>

                  <Form.Control
                    type="date"
                    placeholder="Ingrese inicio"
                    name="inicioproyectadoFichatecnica"
                    value={
                      fichaTecnica && fichaTecnica.inicioproyectadoFichatecnica
                    }
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  />
                </Form.Group>
              </div>

              <div className="col-12 col-md-3">
                <Form.Group
                  controlId="formBasicText"
                  style={{ background: "white" }}
                >
                  <Form.Label style={{ background: "white" }}>
                    Termino Proyectado:
                  </Form.Label>

                  <Form.Control
                    type="date"
                    placeholder="Ingrese fin"
                    name="finproyectadoFichatecnica"
                    value={
                      fichaTecnica && fichaTecnica.finproyectadoFichatecnica
                    }
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  />
                </Form.Group>
              </div>
            </div>
            <p className="text-uppercase text-success my-3 p-0 h4 text-center fw-bolder">
              Forma de pago
            </p>
            <div className="row">
              <div className="col-12 col-md-3">
                <Form.Group>
                  <Form.Label style={{ background: "white" }}>
                    Anticipo:
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="anticipoFichatecnica"
                    value={fichaTecnica && fichaTecnica.anticipoFichatecnica}
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  >
                    <option value="" selected disabled hidden>
                      Seleccione opcion
                    </option>
                    <option value="si">Si</option>
                    <option value="no">No</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-12 col-md-3">
                <Form.Group
                  controlId="formBasicText"
                  style={{ background: "white" }}
                >
                  <Form.Label style={{ background: "white" }}>%:</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="%"
                    name="porcentajeanticipoFichatecnica"
                    value={
                      fichaTecnica &&
                      fichaTecnica.porcentajeanticipoFichatecnica
                    }
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  />
                </Form.Group>
              </div>

              <div className="col-12 col-md-3">
                <Form.Group
                  controlId="formBasicText"
                  style={{ background: "white" }}
                >
                  <Form.Label style={{ background: "white" }}>
                    Saldo:
                  </Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Saldo"
                    name="idFormapago"
                    value={fichaTecnica && fichaTecnica.idFormapago}
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  />
                </Form.Group>
              </div>

              <div className="col-12 col-md-3">
                <Form.Group
                  controlId="formBasicText"
                  style={{ background: "white" }}
                >
                  <Form.Label style={{ background: "white" }}>
                    Financimiento:
                  </Form.Label>

                  <Form.Select
                    aria-label="Default select example"
                    name="financiamientoFichatecnica"
                    value={
                      fichaTecnica && fichaTecnica.financiamientoFichatecnica
                    }
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  >
                    <option value="" selected disabled hidden>
                      Seleccione opcion
                    </option>
                    <option value="si">Si</option>
                    <option value="no">No</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-3">
                <Form.Group
                  controlId="formBasicText"
                  style={{ background: "white" }}
                >
                  <Form.Label style={{ background: "white" }}>Tasa:</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Tasa"
                    name="tasaFichatecnica"
                    value={fichaTecnica && fichaTecnica.tasaFichatecnica}
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  />
                </Form.Group>
              </div>

              <div className="col-12 col-md-3">
                <Form.Group
                  controlId="formBasicText"
                  style={{ background: "white" }}
                >
                  <Form.Label style={{ background: "white" }}>
                    Periodo de Gracia:
                  </Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Periodo de Gracia"
                    name="periodograciaFichatecnica"
                    value={
                      fichaTecnica && fichaTecnica.periodograciaFichatecnica
                    }
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  />
                </Form.Group>
              </div>

              <div className="col-12 col-md-3">
                <Form.Group
                  controlId="formBasicText"
                  style={{ background: "white" }}
                >
                  <Form.Label style={{ background: "white" }}>
                    Plazo:
                  </Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Plazo"
                    name="plazoFichatecnica"
                    value={fichaTecnica && fichaTecnica.plazoFichatecnica}
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  />
                </Form.Group>
              </div>

              <div className="col-12 col-md-3">
                <Form.Group
                  controlId="formBasicText"
                  style={{ background: "white" }}
                >
                  <Form.Label style={{ background: "white" }}>
                    Periodo de cuotas:
                  </Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Periodo de cuotas"
                    name="periodocuotaFichatecnica"
                    value={
                      fichaTecnica && fichaTecnica.periodocuotaFichatecnica
                    }
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-3">
                <Form.Group
                  controlId="formBasicText"
                  style={{ background: "white" }}
                >
                  <Form.Label style={{ background: "white" }}>
                    Inicio del financiamiento:
                  </Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Inicio del financiamiento"
                    name="iniciofinanciamientoFichatecnica"
                    value={
                      fichaTecnica &&
                      fichaTecnica.iniciofinanciamientoFichatecnica
                    }
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  />
                </Form.Group>
              </div>

              <div className="col-12 col-md-3">
                <Form.Group
                  controlId="formBasicText"
                  style={{ background: "white" }}
                >
                  <Form.Label style={{ background: "white" }}>
                    Factura negociable:
                  </Form.Label>

                  <Form.Select
                    aria-label="Default select example"
                    name="facturanegociableFichatecnica"
                    value={
                      fichaTecnica && fichaTecnica.facturanegociableFichatecnica
                    }
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  >
                    <option value="" selected disabled hidden>
                      Seleccione opcion
                    </option>
                    <option value="si">Si</option>
                    <option value="no">No</option>
                    <option value="En descuento">En descuento</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-12 col-md-3">
                <Form.Group
                  controlId="formBasicText"
                  style={{ background: "white" }}
                >
                  <Form.Label style={{ background: "white" }}>
                    Letras anticipadas:
                  </Form.Label>

                  <Form.Select
                    aria-label="Default select example"
                    name="letraanticipadaFichatecnica"
                    value={
                      fichaTecnica && fichaTecnica.letraanticipadaFichatecnica
                    }
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  >
                    <option value="" selected disabled hidden>
                      Seleccione opcion
                    </option>
                    <option value="si">Si</option>
                    <option value="no">No</option>
                    <option value="En descuento">En descuento</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
            <p className="text-uppercase text-success my-3 p-0 h4 text-center fw-bolder">
              Facturacion
            </p>
            <div className="row">
              <div className="col-12 col-md-3">
                <Form.Group
                  controlId="formBasicText"
                  style={{ background: "white" }}
                >
                  <Form.Label style={{ background: "white" }}>
                    Anticipo con la OC:
                  </Form.Label>

                  <Form.Select
                    aria-label="Default select example"
                    name="anticipoocFichatecnica"
                    value={fichaTecnica && fichaTecnica.anticipoocFichatecnica}
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  >
                    <option value="" selected disabled hidden>
                      Seleccione opcion
                    </option>
                    <option value="si">Si</option>
                    <option value="no">No</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-12 col-md-3">
                <Form.Group
                  controlId="formBasicText"
                  style={{ background: "white" }}
                >
                  <Form.Label style={{ background: "white" }}>
                    A firma de contrato:
                  </Form.Label>

                  <Form.Select
                    aria-label="Default select example"
                    name="firmacontratoFichatecnica"
                    value={
                      fichaTecnica && fichaTecnica.firmacontratoFichatecnica
                    }
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  >
                    <option value="" selected disabled hidden>
                      Seleccione opcion
                    </option>
                    <option value="si">Si</option>
                    <option value="no">No</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-12 col-md-3">
                <Form.Group
                  controlId="formBasicText"
                  style={{ background: "white" }}
                >
                  <Form.Label style={{ background: "white" }}>
                    Saldo:
                  </Form.Label>

                  <Form.Select
                    aria-label="Default select example"
                    name="idFacturacion"
                    value={fichaTecnica && fichaTecnica.idFacturacion}
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  >
                    <option value="" selected disabled hidden>
                      Seleccione opcion
                    </option>
                    <option value="1">100% contra entrega </option>
                    <option value="2">Contra entrega de materiales</option>
                    <option value="3">Contra avance valorizado de obra</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-12 col-md-3">
                <Form.Group
                  controlId="formBasicText"
                  style={{ background: "white" }}
                >
                  <Form.Label style={{ background: "white" }}>
                    Estado:
                  </Form.Label>

                  <Form.Select
                    aria-label="Default select example"
                    name="idEstadofichaproyecto"
                    value={fichaTecnica && fichaTecnica.idEstadofichaproyecto}
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  >
                    <option value="" selected disabled hidden>
                      Seleccione
                    </option>
                    {estados.map((estado, i) => (
                      <option value={estado.idCountry} key={i}>
                        {estado.estadoFichaproyecto}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
            </div>

            <p className="text-uppercase text-success my-3 p-0 h4 text-center fw-bolder">
              Recursos
            </p>

            <div className="row">
              <div className="col-12 col-md-3">
                <Form.Group
                  controlId="formBasicText"
                  style={{ background: "white" }}
                >
                  <Form.Label style={{ background: "white" }}>
                    Instalacion:
                  </Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Instalacion"
                    name="instalacionFichatecnica"
                    value={fichaTecnica && fichaTecnica.instalacionFichatecnica}
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  />
                </Form.Group>
              </div>
              <div className="col-12 col-md-3">
                <Form.Group
                  controlId="formBasicText"
                  style={{ background: "white" }}
                >
                  <Form.Label style={{ background: "white" }}>
                    Guardiania:
                  </Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Guardiania"
                    name="guardianiaFichatecnica"
                    value={fichaTecnica && fichaTecnica.guardianiaFichatecnica}
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  />
                </Form.Group>
              </div>

              <div className="col-12 col-md-3">
                <Form.Group
                  controlId="formBasicText"
                  style={{ background: "white" }}
                >
                  <Form.Label style={{ background: "white" }}>
                    Contenedor Oficina:
                  </Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Contenedor Oficina"
                    name="contenedoroficinaFichatecnica"
                    value={
                      fichaTecnica && fichaTecnica.contenedoroficinaFichatecnica
                    }
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  />
                </Form.Group>
              </div>

              <div className="col-12 col-md-3">
                <Form.Group
                  controlId="formBasicText"
                  style={{ background: "white" }}
                >
                  <Form.Label style={{ background: "white" }}>
                    Residente de obra:
                  </Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Residente de obra"
                    name="residenteobraFichatecnica"
                    value={
                      fichaTecnica && fichaTecnica.residenteobraFichatecnica
                    }
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-3">
                <Form.Group
                  controlId="formBasicText"
                  style={{ background: "white" }}
                >
                  <Form.Label style={{ background: "white" }}>
                    Vehiculo:
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Vehiculo"
                    name="vehiculoFichatecnica"
                    value={fichaTecnica && fichaTecnica.vehiculoFichatecnica}
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-12 col-md-3">
                <Form.Group
                  controlId="formBasicText"
                  style={{ background: "white" }}
                >
                  <Form.Label style={{ background: "white" }}>
                    Prevencionista:
                  </Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Prevencionista"
                    name="prevencionistaFichatecnica"
                    value={
                      fichaTecnica && fichaTecnica.prevencionistaFichatecnica
                    }
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                    required
                  />
                </Form.Group>
              </div>

              <div className="col-12 col-md-3">
                <Form.Group
                  controlId="formBasicText"
                  style={{ background: "white" }}
                >
                  <Form.Label style={{ background: "white" }}>
                    Costos del Proyecto USD:
                  </Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="USD"
                    name="costoproyectoFichatecnica"
                    value={
                      fichaTecnica && fichaTecnica.costoproyectoFichatecnica
                    }
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  />
                </Form.Group>
              </div>

              <div className="col-12 col-md-3">
                <Form.Group
                  controlId="formBasicText"
                  style={{ background: "white" }}
                >
                  <Form.Label style={{ background: "white" }}>
                    Margen %:
                  </Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Margen %"
                    name="margenFichatecnica"
                    value={fichaTecnica && fichaTecnica.margenFichatecnica}
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-3">
                <Form.Group
                  controlId="formBasicText"
                  style={{ background: "white" }}
                >
                  <Form.Label style={{ background: "white" }}>
                    Oportunidades de Optimizacion:
                  </Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Oportunidades de Optimizacion"
                    name="oportunidadesFichatecnica"
                    value={
                      fichaTecnica && fichaTecnica.oportunidadesFichatecnica
                    }
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  />
                </Form.Group>
              </div>
              <div className="col-12 col-md-3">
                <Form.Group
                  controlId="formBasicText"
                  style={{ background: "white" }}
                >
                  <Form.Label style={{ background: "white" }}>
                    Riesgos del contrato:
                  </Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Riesgos del contrato"
                    name="riesgocontratoFichatecnica"
                    value={
                      fichaTecnica && fichaTecnica.riesgocontratoFichatecnica
                    }
                    onChange={(e) => {
                      actualizarInput(e);
                    }}
                  />
                </Form.Group>
              </div>
            </div>
            <Button variant="primary mt-3 text-uppercase" type="submit">
              Editar
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
}

export default EdicionesFichasTecnicas;
