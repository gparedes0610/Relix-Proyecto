import React, { useContext, useEffect, useState } from "react";
import LogoRelix from "../../assets/relixjpg1.svg";
import { Form, Button } from "react-bootstrap";
//apis
import {
  obtenerTiposDeProyectos,
  obtenerVendedores,
  obtenerEstados,
  obtenerDepartamentos,
  obtenerProvincias,
  obtenerDistritos,
  obtenerCodigoFichaTenica,
  obtenerFormasDePago,
} from "../Ingeniero/apisFichaTecnica";

import authContext from "../../context/autenticacion/authContext";
import alertContext from "../../context/alertas/alertaContext";
import fichaTecnicaContext from "../../context/fichaTecnica/fichaTecnicaContext";

function FichaTecnica({
  setActivarFicha,
  ActivarFicha,
  taparCalculos,
  setTaparCalculos,
}) {
  //context
  const alertascontext = useContext(alertContext);
  const { alerta, mostrarAlerta } = alertascontext;
  /////////////////////////////////
  const autentificaciones = useContext(authContext);
  const { mensaje, usuario } = autentificaciones;
  ///////////////////////////////
  const fichatecnicacontext = useContext(fichaTecnicaContext);
  const {
    registroDeFichaTecnica,
    obtenerTodasLasFichasTecnicas,
    fichaEdicion,
    actualizarFicha,
  } = fichatecnicacontext;
  //////////////////////////////
  useEffect(() => {
    obtenerTodasLasFichasTecnicas();
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    // eslint-disable-next-line
  }, [mensaje]);
  //consumiento apis
  const [formasDePagos, setFormasDePagos] = useState([]);
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
  ////////
  const [numVendedor, setNumVendedor] = useState("");

  const [botonActivo, setBotonActivo] = useState(true);

  const [registrarFichaTecnica, setRegistrarFichaTecnica] = useState({
    fechaFichatecnica: "",
    numFichatecnica: "",
    idDivision: "",
    idTipoproyecto: "",
    nombreFichatecnica: "",
    clienteFichatecnica: "",
    rucclienteFichatecnica: "",
    telefonoFichatecnica: "",
    direccionfiscalFichatecnica: "",
    idVendedor: "",
    idDepartamento: "",
    idProvincia: "",
    idDistrito: "",
    direccionentregaFichatecnica: "",
    alcanceFichatecnica: "",
    areaFichatecnica: "",
    cultivoFichatecnica: "",
    idModalidadcontrato: "",
    idModalidadejecucion: "",
    detraccionesFichatecnica: "",
    retencionFichatecnica: "",
    cartafianzaFichatecnica: "",
    fielcumplimientoFichatecnica: "",
    plazoejecucionFichatecnica: "",
    inicioproyectadoFichatecnica: "",
    finproyectadoFichatecnica: "",
    //////
    /*  forma de pago */
    anticipoFichatecnica: "",
    porcentajeanticipoFichatecnica: "",
    idFormapago: "",
    financiamientoFichatecnica: "",
    tasaFichatecnica: "",
    periodograciaFichatecnica: "",
    plazoFichatecnica: "",
    periodocuotaFichatecnica: "",
    iniciofinanciamientoFichatecnica: "",
    facturanegociableFichatecnica: "",
    letraanticipadaFichatecnica: "",
    /*  Facturacion */
    anticipoocFichatecnica: "",
    firmacontratoFichatecnica: "",
    idFacturacion: "",
    idEstadofichaproyecto: "",
    /*  Recursos */
    instalacionFichatecnica: "",
    guardianiaFichatecnica: "",
    contenedoroficinaFichatecnica: "",
    residenteobraFichatecnica: "",
    vehiculoFichatecnica: "",
    prevencionistaFichatecnica: "",

    costoproyectoFichatecnica: "",
    margenFichatecnica: "",
    utilidadFichatecnica: "",
    valorventaFichatecnica: "",
    valorventaigvFichatecnica: "",
    oportunidadesFichatecnica: "",
    riesgocontratoFichatecnica: "",
    codigoVendedorFichatecnica: "",
    idUsuario: usuario.idUsuario,
  });

  const {
    fechaFichatecnica,
    numFichatecnica,
    idDivision,
    idTipoproyecto,
    nombreFichatecnica,
    clienteFichatecnica,
    rucclienteFichatecnica,
    telefonoFichatecnica,
    direccionfiscalFichatecnica,
    idVendedor,
    idDepartamento,
    idProvincia,
    idDistrito,
    direccionentregaFichatecnica,
    alcanceFichatecnica,
    areaFichatecnica,
    cultivoFichatecnica,
    idModalidadcontrato,
    idModalidadejecucion,
    detraccionesFichatecnica,
    retencionFichatecnica,
    cartafianzaFichatecnica,
    fielcumplimientoFichatecnica,
    plazoejecucionFichatecnica,
    inicioproyectadoFichatecnica,
    finproyectadoFichatecnica,
    anticipoFichatecnica,
    porcentajeanticipoFichatecnica,
    idFormapago,
    financiamientoFichatecnica,
    tasaFichatecnica,
    periodograciaFichatecnica,
    plazoFichatecnica,
    periodocuotaFichatecnica,
    iniciofinanciamientoFichatecnica,
    facturanegociableFichatecnica,
    letraanticipadaFichatecnica,
    anticipoocFichatecnica,
    firmacontratoFichatecnica,
    idFacturacion,
    idEstadofichaproyecto,
    instalacionFichatecnica,
    guardianiaFichatecnica,
    contenedoroficinaFichatecnica,
    residenteobraFichatecnica,
    vehiculoFichatecnica,
    prevencionistaFichatecnica,
    costoproyectoFichatecnica,
    margenFichatecnica,
    utilidadFichatecnica,
    valorventaFichatecnica,
    valorventaigvFichatecnica,
    oportunidadesFichatecnica,
    riesgocontratoFichatecnica,
    codigoVendedorFichatecnica,
    idUsuario,
  } = registrarFichaTecnica;

  const actualizarInput = (e) => {
    setRegistrarFichaTecnica({
      ...registrarFichaTecnica,
      [e.target.name]: e.target.value,
    });
  };

  const cambiarNum = (e) => {
    console.log("entraste a cambiarNum");
    console.log(e.target.value);

    const valorNum = `PR-${
      vendedores[parseInt(e.target.value) - 1].codigoVendedor
    }-${codigoFichaTecnica.codigoFicha}`;
    console.log("Num es", valorNum);

    const valorCodigo = `${
      vendedores[parseInt(e.target.value) - 1].codigoVendedor
    }`;

    console.log("codigo es", valorCodigo);

    setRegistrarFichaTecnica({
      ...registrarFichaTecnica,
      numFichatecnica: valorNum,
      idVendedor: e.target.value,
      codigoVendedorFichatecnica: valorCodigo,
    });
  };
  ///////////////////////////////////////////////////aqui para hacer el put
  useEffect(() => {
    if (fichaEdicion !== null) {
      // setRegistrarFichaTecnica(fichaEdicion);
      console.log("fichaedicion existe", fichaEdicion);
      setRegistrarFichaTecnica(fichaEdicion);
    } else {
      console.log("fichaedicion no existe existe"); // me quede aqui
    }
  }, [fichaEdicion]);
  ///////////////////////////////////////////////////////////////////////////////////////////
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("enviaste esta ficha tecnica", registrarFichaTecnica);
    if (
      fechaFichatecnica.trim() === "" ||
      numFichatecnica.trim() === "" ||
      idDivision.trim() === "" ||
      idTipoproyecto.trim() === "" ||
      nombreFichatecnica.trim() === "" ||
      clienteFichatecnica.trim() === "" ||
      rucclienteFichatecnica.trim() === "" ||
      telefonoFichatecnica.trim() === "" ||
      direccionfiscalFichatecnica.trim() === "" ||
      idVendedor.trim() === "" ||
      idDepartamento.trim() === "" ||
      idProvincia.trim() === "" ||
      idDistrito.trim() === "" ||
      direccionentregaFichatecnica.trim() === "" ||
      alcanceFichatecnica.trim() === "" ||
      areaFichatecnica.trim() === "" ||
      cultivoFichatecnica.trim() === "" ||
      idModalidadcontrato.trim() === "" ||
      idModalidadejecucion.trim() === "" ||
      detraccionesFichatecnica.trim() === "" ||
      retencionFichatecnica.trim() === "" ||
      cartafianzaFichatecnica.trim() === "" ||
      fielcumplimientoFichatecnica.trim() === "" ||
      plazoejecucionFichatecnica.trim() === "" ||
      inicioproyectadoFichatecnica.trim() === "" ||
      firmacontratoFichatecnica.trim() === "" ||
      anticipoFichatecnica.trim() === "" ||
      porcentajeanticipoFichatecnica.trim() === "" ||
      idFormapago.trim() === "" ||
      financiamientoFichatecnica.trim() === "" ||
      tasaFichatecnica.trim() === "" ||
      periodograciaFichatecnica.trim() === "" ||
      plazoFichatecnica.trim() === "" ||
      periodocuotaFichatecnica.trim() === "" ||
      iniciofinanciamientoFichatecnica.trim() === "" ||
      facturanegociableFichatecnica.trim() === "" ||
      letraanticipadaFichatecnica.trim() === "" ||
      anticipoocFichatecnica.trim() === "" ||
      firmacontratoFichatecnica.trim() === "" ||
      idFacturacion.trim() === "" ||
      idEstadofichaproyecto.trim() === "" ||
      instalacionFichatecnica.trim() === "" ||
      guardianiaFichatecnica.trim() === "" ||
      contenedoroficinaFichatecnica.trim() === "" ||
      residenteobraFichatecnica.trim() === "" ||
      vehiculoFichatecnica.trim() === "" ||
      prevencionistaFichatecnica.trim() === "" ||
      costoproyectoFichatecnica.trim() === "" ||
      margenFichatecnica.trim() === "" ||
      utilidadFichatecnica.trim() === "" ||
      valorventaFichatecnica.trim() === "" ||
      valorventaigvFichatecnica.trim() === "" ||
      oportunidadesFichatecnica.trim() === "" ||
      riesgocontratoFichatecnica.trim() === ""
    ) {
      console.log("no puede haber un valor vacio");
      mostrarAlerta("no puede haber un valor vacio", "alert alert-danger");
      return;
    }
    console.log("no hay errores");

    if (fichaEdicion === null) {
      //ficha nueva
      console.log("entras aqui si agregas ficha nueva");
      console.log("ficha antes", registrarFichaTecnica);

      registroDeFichaTecnica({
        fechaFichatecnica,
        numFichatecnica,
        idDivision,
        idTipoproyecto,
        nombreFichatecnica,
        clienteFichatecnica,
        rucclienteFichatecnica,
        telefonoFichatecnica,
        direccionfiscalFichatecnica,
        idVendedor,
        codigoVendedorFichatecnica,
        idDepartamento,
        idProvincia,
        idDistrito,
        direccionentregaFichatecnica,
        alcanceFichatecnica,
        areaFichatecnica,
        cultivoFichatecnica,
        idModalidadcontrato,
        idModalidadejecucion,
        detraccionesFichatecnica,
        retencionFichatecnica,
        cartafianzaFichatecnica,
        fielcumplimientoFichatecnica,
        plazoejecucionFichatecnica,
        inicioproyectadoFichatecnica,
        finproyectadoFichatecnica,
        anticipoFichatecnica,
        porcentajeanticipoFichatecnica,
        idFormapago,
        financiamientoFichatecnica,
        tasaFichatecnica,
        periodograciaFichatecnica,
        plazoFichatecnica,
        periodocuotaFichatecnica,
        iniciofinanciamientoFichatecnica,
        facturanegociableFichatecnica,
        letraanticipadaFichatecnica,
        anticipoocFichatecnica,
        firmacontratoFichatecnica,
        idFacturacion,
        idEstadofichaproyecto,
        instalacionFichatecnica,
        guardianiaFichatecnica,
        contenedoroficinaFichatecnica,
        residenteobraFichatecnica,
        vehiculoFichatecnica,
        prevencionistaFichatecnica,
        costoproyectoFichatecnica,
        margenFichatecnica,
        utilidadFichatecnica,
        valorventaFichatecnica,
        valorventaigvFichatecnica,
        oportunidadesFichatecnica,
        riesgocontratoFichatecnica,
        idUsuario,
      });
    } else {
      console.log("vas a actualizar una ficha", registrarFichaTecnica);
      setBotonActivo(false);
      actualizarFicha(registrarFichaTecnica);
      setTimeout(() => {
        setBotonActivo(true);
      }, 3000);
    }
    setRegistrarFichaTecnica({
      fechaFichatecnica: "",
      numFichatecnica: "",
      idDivision: "",
      idTipoproyecto: "",
      nombreFichatecnica: "",
      clienteFichatecnica: "",
      rucclienteFichatecnica: "",
      telefonoFichatecnica: "",
      direccionfiscalFichatecnica: "",
      idVendedor: "",
      idDepartamento: "",
      idProvincia: "",
      idDistrito: "",
      direccionentregaFichatecnica: "",
      alcanceFichatecnica: "",
      areaFichatecnica: "",
      cultivoFichatecnica: "",
      idModalidadcontrato: "",
      idModalidadejecucion: "",
      detraccionesFichatecnica: "",
      retencionFichatecnica: "",
      cartafianzaFichatecnica: "",
      fielcumplimientoFichatecnica: "",
      plazoejecucionFichatecnica: "",
      inicioproyectadoFichatecnica: "",
      finproyectadoFichatecnica: "",
      //////
      anticipoFichatecnica: "",
      porcentajeanticipoFichatecnica: "",
      idFormapago: "",
      financiamientoFichatecnica: "",
      tasaFichatecnica: "",
      periodograciaFichatecnica: "",
      plazoFichatecnica: "",
      periodocuotaFichatecnica: "",
      iniciofinanciamientoFichatecnica: "",
      facturanegociableFichatecnica: "",
      letraanticipadaFichatecnica: "",
      /////
      anticipoocFichatecnica: "",
      firmacontratoFichatecnica: "",
      idFacturacion: "",
      idEstadofichaproyecto: "",
      ////
      instalacionFichatecnica: "",
      guardianiaFichatecnica: "",
      contenedoroficinaFichatecnica: "",
      residenteobraFichatecnica: "",
      vehiculoFichatecnica: "",
      prevencionistaFichatecnica: "",

      costoproyectoFichatecnica: "",
      margenFichatecnica: "",
      utilidadFichatecnica: "",
      valorventaFichatecnica: "",
      valorventaigvFichatecnica: "",
      oportunidadesFichatecnica: "",
      riesgocontratoFichatecnica: "",
    });

    setActivarFicha(false);
  };

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

      if (agarrarDepartamento) {
        //console.log("agarrarDepartamento existe");
        const todosLasProvincias = await obtenerProvincias(agarrarDepartamento);
        setProvincias(todosLasProvincias);
      }
      if (agarrarProvincia) {
        //console.log("agarrarProvincia existe", agarrarProvincia);
        const todosLosDistritos = await obtenerDistritos(agarrarProvincia);
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
  }, [agarrarDepartamento, agarrarProvincia, idVendedor]);

  return (
    <div>
      <div className="container-fluid mt-3">
        <div className="row d-flex justify-content-center">
          <div
            className="col-12"
            style={{
              background: "white",
              boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.15)",
              borderRadius: "10px",
            }}
          >
            <div>
              <div style={{ background: "white" }}>
                <img src={LogoRelix} alt="" className="mt-2 mb-2" />
                <h4 style={{ background: "white" }} className="text-uppercase">
                  Ficha Tecnica
                </h4>
              </div>
              {fichaEdicion && (
                <>
                  <p className="lead text-success text-bolder">
                    Estas en Editar, por temas de validaciones por favor volver
                    a seleccionar la ubicacion
                  </p>
                  <p className="lead text-primary text-bolder">
                    La ubicacion es {fichaEdicion.nombreDepartamento}-
                    {fichaEdicion.nombreProvincia} -
                    {fichaEdicion.nombreDistrito}
                  </p>
                </>
              )}

              <div>
                <Form
                  style={{ background: "white" }}
                  className="pb-3 "
                  onSubmit={(e) => onSubmit(e)}
                >
                  <div className="row ">
                    <div className="col-12  col-md-4">
                      {" "}
                      <Form.Group
                        controlId="formBasicText"
                        style={{ background: "white" }}
                      >
                        <Form.Label style={{ background: "white" }}>
                          Fecha
                        </Form.Label>
                        <Form.Control
                          type="date"
                          placeholder="Ingrese fecha"
                          name="fechaFichatecnica"
                          value={fechaFichatecnica}
                          onChange={(e) => actualizarInput(e)}
                          required
                        />
                      </Form.Group>
                    </div>
                    <div className="col-12  col-md-4">
                      <Form.Group
                        controlId="formBasicText"
                        style={{ background: "white" }}
                      >
                        <Form.Label style={{ background: "white" }}>
                          NUM
                        </Form.Label>
                        {idVendedor ? (
                          <>
                            <Form.Control
                              type="text"
                              placeholder="Codigo vendedor"
                              disabled
                              value={numFichatecnica}
                              style={{ width: "275px" }}
                              required
                            />
                          </>
                        ) : (
                          <>
                            <Form.Control
                              type="text"
                              placeholder="Codigo vendedor"
                              disabled
                            />
                          </>
                        )}
                      </Form.Group>
                    </div>
                    <div className="col-12 col-md-4">
                      <Form.Group
                        controlId="formBasicText"
                        style={{ background: "white" }}
                      >
                        <Form.Label style={{ background: "white" }}>
                          Division
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          value={idDivision}
                          name="idDivision"
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        >
                          <option>Seleccione una Opcion</option>
                          <option value="1">Riego</option>
                          <option value="2">Agua</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                  </div>
                  {/* ya esta */}
                  <Form.Group className="my-2">
                    <Form.Label style={{ background: "white" }}>
                      Tipo de Proyecto:
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      name="idTipoproyecto"
                      value={idTipoproyecto}
                      onChange={(e) => {
                        actualizarInput(e);
                      }}
                      required
                    >
                      {tiposDeProyectos.map((proyecto, i) => (
                        <option key={i} value={proyecto.idTipoproyecto}>
                          {proyecto.tipoProyecto}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>{" "}
                  {/* ya esta */}
                  <div className="row" style={{ background: "white" }}>
                    <div className="col-12 col-sm-6  col-lg-3">
                      <Form.Group
                        controlId="formBasicText"
                        style={{ background: "white" }}
                      >
                        <Form.Label style={{ background: "white" }}>
                          Proyecto:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="nombreFichatecnica"
                          value={nombreFichatecnica}
                          placeholder="Nombre del proyecto"
                          onChange={(e) => actualizarInput(e)}
                          required
                        />
                      </Form.Group>{" "}
                      {/* ya esta */}
                    </div>
                    <div className="col-12 col-sm-6  col-lg-3">
                      <Form.Group
                        controlId="formBasicText"
                        style={{ background: "white" }}
                      >
                        <Form.Label style={{ background: "white" }}>
                          Cliente
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Cliente"
                          name="clienteFichatecnica"
                          value={clienteFichatecnica}
                          onChange={(e) => actualizarInput(e)}
                          required
                        />
                      </Form.Group>
                      {/* ya esta */}
                    </div>
                    <div className="col-12 col-sm-6  col-lg-3">
                      <Form.Group
                        controlId="formBasicText"
                        style={{ background: "white" }}
                      >
                        <Form.Label style={{ background: "white" }}>
                          RUC
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Ruc"
                          name="rucclienteFichatecnica"
                          value={rucclienteFichatecnica}
                          onChange={(e) => actualizarInput(e)}
                          required
                        />
                      </Form.Group>
                      {/* ya esta */}
                    </div>
                    <div className="col-12 col-sm-6  col-lg-3">
                      <Form.Group
                        controlId="formBasicText"
                        style={{ background: "white" }}
                      >
                        <Form.Label style={{ background: "white" }}>
                          Telefono
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Telefono"
                          name="telefonoFichatecnica"
                          value={telefonoFichatecnica}
                          onChange={(e) => actualizarInput(e)}
                          required
                        />
                      </Form.Group>
                      {/* ya esta */}
                    </div>
                  </div>
                  {/* ya esta */}
                  <div className="row" style={{ background: "white" }}>
                    <div className="col-12 col-sm-6 col-lg-3">
                      <Form.Group
                        controlId="formBasicText"
                        style={{ background: "white" }}
                      >
                        <Form.Label style={{ background: "white" }}>
                          Direccion de Fiscal:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Direccion de Fiscal"
                          name="direccionfiscalFichatecnica"
                          value={direccionfiscalFichatecnica}
                          onChange={(e) => actualizarInput(e)}
                          required
                        />
                      </Form.Group>
                      {/* ya esta */}
                    </div>

                    <div className="col-12 col-sm-6 col-lg-3">
                      <Form.Group>
                        <Form.Label style={{ background: "white" }}>
                          Vendedor:
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          name="idVendedor"
                          value={idVendedor}
                          onChange={(e) => {
                            actualizarInput(e);
                            cambiarNum(e);
                          }}
                          required
                        >
                          {vendedores.map((vendedor, i) => (
                            <option value={vendedor.idVendedor} key={i}>
                              {vendedor.nombreVendedor}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                      {/* ya esta */}
                    </div>

                    <div className="col-12 col-sm-6 col-lg-3">
                      <Form.Group
                        controlId="formBasicText"
                        style={{ background: "white" }}
                      >
                        <Form.Label style={{ background: "white" }}>
                          Codigo:
                        </Form.Label>
                        {idVendedor ? (
                          <>
                            <Form.Control
                              type="text"
                              placeholder="Codigo"
                              value={codigoVendedorFichatecnica}
                              disabled
                            />
                          </>
                        ) : (
                          <>
                            <Form.Control
                              type="text"
                              placeholder="Codigo"
                              disabled
                            />
                          </>
                        )}
                      </Form.Group>
                      {/* ya esta */}
                    </div>

                    <div className="col-12 col-sm-6 col-lg-3">
                      <Form.Group>
                        <Form.Label style={{ background: "white" }}>
                          Departamento:
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          value={idDepartamento}
                          name="idDepartamento"
                          onChange={(e) => {
                            setAgarrarDepartamento(e.target.value);
                            actualizarInput(e);
                          }}
                          required
                        >
                          {departamentos.map((departamento, i) => (
                            <option value={departamento.idDepartamento} key={i}>
                              {departamento.nombreDepartamento}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                      {/* ya esta DEPARTAMENTO*/}
                    </div>
                  </div>
                  {/* ya esta */}
                  <div className="row" style={{ background: "white" }}>
                    <div className="col-12 col-sm-6  col-lg-3">
                      {/* ya esta PROVINCIA*/}
                      {agarrarDepartamento ? (
                        <>
                          <Form.Group>
                            <Form.Label style={{ background: "white" }}>
                              Provincia:
                            </Form.Label>
                            <Form.Select
                              aria-label="Default select example"
                              name="idProvincia"
                              //value={fichaEdicion[0].nombreDistrito}
                              onChange={(e) => {
                                setAgarrarProvincia(e.target.value);
                                actualizarInput(e);
                              }}
                              required
                            >
                              {provincias.map((provincia, i) => (
                                <option value={provincia.idProvincia} key={i}>
                                  {provincia.nombreProvincia}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </>
                      ) : (
                        <>
                          <Form.Group>
                            <Form.Label style={{ background: "white" }}>
                              Provincia:
                            </Form.Label>
                            <Form.Select
                              aria-label="Default select example"
                              disabled
                            ></Form.Select>
                          </Form.Group>
                        </>
                      )}
                    </div>
                    <div className="col-12 col-sm-6  col-lg-3">
                      {agarrarProvincia ? (
                        <>
                          <Form.Group>
                            <Form.Label style={{ background: "white" }}>
                              Distrito:
                            </Form.Label>
                            <Form.Select
                              aria-label="Default select example"
                              name="idDistrito"
                              value={idDistrito}
                              onChange={(e) => {
                                setAgarrarDistrito(e.target.value);
                                actualizarInput(e);
                              }}
                              required
                            >
                              {distritos.map((distrito, i) => (
                                <option value={distrito.idDistrito} key={i}>
                                  {distrito.nombreDistrito}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </>
                      ) : (
                        <>
                          <Form.Group>
                            <Form.Label style={{ background: "white" }}>
                              Distrito:
                            </Form.Label>
                            <Form.Select
                              aria-label="Default select example"
                              disabled
                            ></Form.Select>
                          </Form.Group>
                        </>
                      )}
                    </div>
                    <div className="col-12 col-sm-6  col-lg-3">
                      <Form.Group
                        controlId="formBasicText"
                        style={{ background: "white" }}
                      >
                        <Form.Label style={{ background: "white" }}>
                          Direccion de Entrega:
                        </Form.Label>
                        <Form.Control
                          name="direccionentregaFichatecnica"
                          value={direccionentregaFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                          type="text"
                          placeholder="Direccion de entrega"
                        />
                      </Form.Group>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-3">
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
                          value={alcanceFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row" style={{ background: "white" }}>
                    <div className="col-12 col-sm-6  col-lg-3">
                      <Form.Group
                        controlId="formBasicText"
                        style={{ background: "white" }}
                      >
                        <Form.Label style={{ background: "white" }}>
                          Area (Has):
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Ingrese cantidad de hectareas"
                          name="areaFichatecnica"
                          value={areaFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        />
                      </Form.Group>
                    </div>

                    <div className="col-12 col-sm-6  col-lg-3">
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
                          value={cultivoFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        />
                      </Form.Group>
                    </div>

                    <div className="col-12 col-sm-6  col-lg-3">
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
                          value={idModalidadcontrato}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        >
                          <option>Seleccione una Opcion</option>
                          <option value="1">Suma Alzada</option>
                          <option value="2">Detallado</option>
                        </Form.Select>
                      </Form.Group>
                    </div>

                    <div className="col-12 col-sm-6  col-lg-3">
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
                          value={idModalidadejecucion}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        >
                          <option>Seleccione una Opcion</option>
                          <option value="1">Llave en mano</option>
                          <option value="2">
                            Suministro de materiales e instalación
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row" style={{ background: "white" }}>
                    <div className="col-12 col-sm-6  col-lg-3">
                      <Form.Group>
                        <Form.Label style={{ background: "white" }}>
                          Detracciones:
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          name="detraccionesFichatecnica"
                          value={detraccionesFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        >
                          <option>Seleccione una Opcion</option>
                          <option value="1">Si</option>
                          <option value="2">No</option>
                        </Form.Select>
                      </Form.Group>
                    </div>

                    <div className="col-12 col-sm-6  col-lg-3">
                      <Form.Group>
                        <Form.Label style={{ background: "white" }}>
                          Retenciones:
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          name="retencionFichatecnica"
                          value={retencionFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        >
                          <option>Seleccione una Opcion</option>
                          <option value="si">Si</option>
                          <option value="no">No</option>
                        </Form.Select>
                      </Form.Group>
                    </div>

                    <div className="col-12 col-sm-6  col-lg-3">
                      <Form.Group>
                        <Form.Label style={{ background: "white" }}>
                          Carta Fianza por Anticipo:
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          name="cartafianzaFichatecnica"
                          value={cartafianzaFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        >
                          <option>Seleccione una Opcion</option>
                          <option value="si">Si</option>
                          <option value="no">No</option>
                        </Form.Select>
                      </Form.Group>
                    </div>

                    <div className="col-12 col-sm-6  col-lg-3">
                      <Form.Group>
                        <Form.Label style={{ background: "white" }}>
                          Fiel Cumplimiento:
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          name="fielcumplimientoFichatecnica"
                          value={fielcumplimientoFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        >
                          <option>Seleccione una Opcion</option>
                          <option value="si">Si</option>
                          <option value="no">No</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row" style={{ background: "white" }}>
                    <div className="col-12 col-12  col-md-4">
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
                          value={plazoejecucionFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        />
                      </Form.Group>
                      {/* ya esta */}
                    </div>

                    <div className="col-12  col-md-4">
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
                          value={inicioproyectadoFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        />
                      </Form.Group>
                      {/* ya esta */}
                    </div>

                    <div className="col-12  col-md-4">
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
                          value={finproyectadoFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        />
                      </Form.Group>
                      {/* ya esta */}
                    </div>
                  </div>
                  <h3 className="text-primary my-3">Forma de pago</h3>
                  <div className="row" style={{ background: "white" }}>
                    <div className="col-12 col-sm-6  col-lg-3">
                      <Form.Group>
                        <Form.Label style={{ background: "white" }}>
                          Anticipo:
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          name="anticipoFichatecnica"
                          value={anticipoFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        >
                          <option>Seleccione opcion</option>
                          <option value="si">Si</option>
                          <option value="no">No</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className="col-12 col-sm-6  col-lg-3">
                      <Form.Group
                        controlId="formBasicText"
                        style={{ background: "white" }}
                      >
                        <Form.Label style={{ background: "white" }}>
                          %:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="%"
                          name="porcentajeanticipoFichatecnica"
                          value={porcentajeanticipoFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        />
                      </Form.Group>
                    </div>
                    <div className="col-12 col-sm-6  col-lg-3">
                      <Form.Group
                        controlId="formBasicText"
                        style={{ background: "white" }}
                      >
                        <Form.Label style={{ background: "white" }}>
                          Saldo:
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          type="text"
                          placeholder="Saldo"
                          name="idFormapago"
                          value={idFormapago}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        >
                          {formasDePagos.map((formaDePago, i) => (
                            <option key={i} value={formaDePago.idFormapago}>
                              {formaDePago.formaPago}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className="col-12 col-sm-6  col-lg-3">
                      <Form.Group>
                        <Form.Label style={{ background: "white" }}>
                          Financimiento:
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          name="financiamientoFichatecnica"
                          value={financiamientoFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        >
                          <option>Seleccione opcion</option>
                          <option value="si">Si</option>
                          <option value="no">No</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row" style={{ background: "white" }}>
                    <div className="col-12 col-sm-6  col-lg-3">
                      <Form.Group
                        controlId="formBasicText"
                        style={{ background: "white" }}
                      >
                        <Form.Label style={{ background: "white" }}>
                          Tasa:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Tasa"
                          name="tasaFichatecnica"
                          value={tasaFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        />
                      </Form.Group>
                    </div>

                    <div className="col-12 col-sm-6  col-lg-3">
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
                          value={periodograciaFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        />
                      </Form.Group>
                    </div>

                    <div className="col-12 col-sm-6  col-lg-3">
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
                          value={plazoFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        />
                      </Form.Group>
                    </div>

                    <div className="col-12 col-sm-6  col-lg-3">
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
                          value={periodocuotaFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row" style={{ background: "white" }}>
                    <div className="col-12  col-md-4">
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
                          value={iniciofinanciamientoFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        />
                      </Form.Group>
                    </div>

                    <div className="col-12  col-md-4">
                      <Form.Group>
                        <Form.Label style={{ background: "white" }}>
                          Factura negociable:
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          name="facturanegociableFichatecnica"
                          value={facturanegociableFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        >
                          <option>Seleccione opcion</option>
                          <option value="si">Si</option>
                          <option value="no">En descuento</option>
                        </Form.Select>
                      </Form.Group>
                    </div>

                    <div className="col-12  col-md-4">
                      <Form.Group>
                        <Form.Label style={{ background: "white" }}>
                          Letras anticipadas:
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          name="letraanticipadaFichatecnica"
                          value={letraanticipadaFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        >
                          <option>Seleccione opcion</option>
                          <option value="si">Si</option>
                          <option value="no">En descuento</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                  </div>
                  <h3 className="text-primary my-3">Facturacion</h3>
                  <div className="row" style={{ background: "white" }}>
                    <div className="col-12  col-md-4">
                      <Form.Group>
                        <Form.Label style={{ background: "white" }}>
                          Anticipo con la OC:
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          name="anticipoocFichatecnica"
                          value={anticipoocFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        >
                          <option>Seleccione opcion</option>
                          <option value="si">Si</option>
                          <option value="no">No</option>
                        </Form.Select>
                      </Form.Group>
                    </div>

                    <div className="col-12  col-md-4">
                      <Form.Group>
                        <Form.Label style={{ background: "white" }}>
                          A firma de contrato:
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          name="firmacontratoFichatecnica"
                          value={firmacontratoFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        >
                          <option>Seleccione opcion</option>
                          <option value="si">Si</option>
                          <option value="no">No</option>
                        </Form.Select>
                      </Form.Group>
                    </div>

                    <div className="col-12  col-md-4">
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
                          value={idFacturacion}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        >
                          <option>Seleccione opcion</option>
                          <option value="1">100% contra entrega </option>
                          <option value="2">
                            Contra entrega de materiales
                          </option>
                          <option value="3">
                            Contra avance valorizado de obra
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                  </div>
                  <Form.Group className="my-2">
                    <Form.Label style={{ background: "white" }}>
                      Estado:
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      name="idEstadofichaproyecto"
                      value={idEstadofichaproyecto}
                      onChange={(e) => {
                        actualizarInput(e);
                      }}
                      required
                    >
                      {estados.map((estado, i) => (
                        <option value={estado.idEstadofichaproyecto} key={i}>
                          {estado.estadoFichaproyecto}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  {/*  */}
                  <h3 className="text-primary my-3">Recursos</h3>
                  {/*  */}
                  <div className="row" style={{ background: "white" }}>
                    <div className="col-12 col-sm-6  col-lg-3">
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
                          value={instalacionFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        />
                      </Form.Group>
                    </div>

                    <div className="col-12 col-sm-6  col-lg-3">
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
                          value={guardianiaFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        />
                      </Form.Group>
                    </div>

                    <div className="col-12 col-sm-6  col-lg-3">
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
                          value={contenedoroficinaFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        />
                      </Form.Group>
                    </div>

                    <div className="col-12 col-sm-6  col-lg-3">
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
                          value={residenteobraFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-6  col-lg-3">
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
                          value={vehiculoFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        />
                      </Form.Group>
                    </div>

                    <div className="col-12 col-sm-6  col-lg-3">
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
                          value={prevencionistaFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        />
                      </Form.Group>
                    </div>

                    <div className="col-12 col-sm-6  col-lg-3">
                      <Form.Group
                        controlId="formBasicText"
                        style={{ background: "white" }}
                      >
                        <Form.Label style={{ background: "white" }}>
                          Costos del Proyecto USD:
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="USD"
                          name="costoproyectoFichatecnica"
                          value={costoproyectoFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        />
                      </Form.Group>
                    </div>

                    <div className="col-12 col-sm-6  col-lg-3">
                      <Form.Group
                        controlId="formBasicText"
                        style={{ background: "white" }}
                      >
                        <Form.Label style={{ background: "white" }}>
                          Margen %:
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Margen %"
                          name="margenFichatecnica"
                          value={margenFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        />
                      </Form.Group>
                    </div>
                  </div>
                  {taparCalculos ? (
                    <div className="row">
                      <div className="col-12  col-md-4">
                        <Form.Group
                          controlId="formBasicText"
                          style={{ background: "white" }}
                        >
                          <Form.Label style={{ background: "white" }}>
                            Utilidad USD:
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Utilidad USD"
                            name="utilidadFichatecnica"
                            value={utilidadFichatecnica}
                            onChange={(e) => {
                              actualizarInput(e);
                            }}
                            disabled
                          />
                        </Form.Group>
                      </div>

                      <div className="col-12  col-md-4">
                        <Form.Group
                          controlId="formBasicText"
                          style={{ background: "white" }}
                        >
                          <Form.Label style={{ background: "white" }}>
                            Valor venta sin IGV USD:
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Valor venta sin IGV USD"
                            name="valorventaFichatecnica"
                            value={valorventaFichatecnica}
                            onChange={(e) => {
                              actualizarInput(e);
                            }}
                            disabled
                          />
                        </Form.Group>
                      </div>

                      <div className="col-12  col-md-4">
                        <Form.Group
                          controlId="formBasicText"
                          style={{ background: "white" }}
                        >
                          <Form.Label style={{ background: "white" }}>
                            Valor Venta con IGV:
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Valor Venta con IGV"
                            name="valorventaigvFichatecnica"
                            value={valorventaigvFichatecnica}
                            onChange={(e) => {
                              actualizarInput(e);
                            }}
                            disabled
                          />
                        </Form.Group>
                      </div>
                    </div>
                  ) : null}
                  <div className="row">
                    <div className="col-12 col-md-6">
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
                          value={oportunidadesFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        />
                      </Form.Group>
                    </div>
                    <div className="col-12 col-md-6">
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
                          value={riesgocontratoFichatecnica}
                          onChange={(e) => {
                            actualizarInput(e);
                          }}
                          required
                        />
                      </Form.Group>
                    </div>
                  </div>
                  {alerta ? (
                    <div className={`${alerta.categoria}`} role="alert">
                      {alerta.msg}
                    </div>
                  ) : null}
                  <div className="row mt-3">
                    <div className="col-12 col-md-6">
                      {fichaEdicion ? (
                        <Button
                          variant="info w-100 py-2  text-white btn btn-success"
                          type="submit"
                          disabled={!botonActivo}
                        >
                          Editar
                        </Button>
                      ) : (
                        <Button
                          variant="info w-100 py-2  text-white btn btn-success"
                          type="submit"
                          disabled={!botonActivo}
                        >
                          Guardar
                        </Button>
                      )}
                    </div>
                    <div className="col-12 col-md-6 ">
                      <Button
                        variant="info w-100 py-2 text-white  btn btn-warning"
                        onClick={() => setActivarFicha(false)}
                      >
                        Retroceder
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FichaTecnica;
