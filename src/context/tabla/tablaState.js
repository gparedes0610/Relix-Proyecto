import { useReducer } from "react";

import tablaContext from "./tablaContext";

import tablaReducer from "./tablaReducer";

import {
  OBTENER_DATOS_TABLA,
  AGREGAR_DATOS_TABLA,
  ACTUALIZAR_DATOS_TABLA,
  GUARDAR_COTIZACIONES,
  GUARDAR_COTIZACIONES_EN_LA_BD,
  OBTENER_DATOS_TABLA_GERENTE_GENERAL,
  ALTA_NEGOCIO,
  ALTA_NEGOCIO_GERENTE_ADMINISTRACION,
  OBTENER_DATOS_TABLA_REPORTE,
  ELIMINAR_TABLA,
  ERROR_TABLA,
  ERROR_TABLA_DETALLE,
} from "../../types";
import clienteAxios from "../../config/axios";

const TablaStateProvider = (props) => {
  const initialState = {
    tablaDatos: [],
    tablaDatosGerenteGeneral: [],
    cotizaciones: [],
    rptaAltaNegocio: null,
    rptaAltaNegocioAdministracion: null,
    mensajeTabla: "",
    mensajeErrorDetalleTabla: null,
  };

  const [state, dispatch] = useReducer(tablaReducer, initialState);

  //obtener valores en la Tabla
  const obtenerDatosTabla = async (ficha) => {
    //se envio la ficha completo, pero luego solo se envia el idficha en el get
    try {
      const resultado = await clienteAxios.get(
        `/detallefichatecnica/${ficha.idFichatecnica}`
      );

      //console.log("TABLA", ficha);
      console.log(
        "Estoy en obtenerDatosTabla y este es el resultado",
        resultado.data
      );
      dispatch({
        type: OBTENER_DATOS_TABLA,
        payload: resultado.data, // lo ejecuta usefect al cargar la pagina
      });
    } catch (error) {
      console.log("hay un error");
      console.log(error.response.data.messages.error);
    }
  };

  //obtener valores en la Tabla para gerente general
  const obtenerDatosTablaGerenteGeneral = async (id) => {
    //se envio la ficha completo, pero luego solo se envia el idficha en el get
    console.log(
      "entraste a obtenerDatosTablaGerenteGeneral y el id enviado es",
      id
    );

    try {
      const resultado = await clienteAxios.get(
        `/listarDetalleGerenteGeneral/${id}`
      );

      //console.log("TABLA", ficha);
      console.log(
        "Estoy en obtenerDatosTablaGerenteGeneral y este es el resultado",
        resultado.data
      );
      dispatch({
        type: OBTENER_DATOS_TABLA_GERENTE_GENERAL,
        payload: resultado.data, // lo ejecuta usefect al cargar la pagina
      });
    } catch (error) {
      console.log("hay un error");
      console.log(error.response.data.messages.error);
    }
  };
  //obtener valores en la Tabla para gerente general
  const obtenerDatosTablaReporte = async (id) => {
    console.log("entraste a obtenerDatosTablaReporte", id);
    try {
      const resultado = await clienteAxios.get(
        `/listarDetalleGerenteGeneral/${id}`
      );
      console.log(
        "Estoy en obtenerDatosTablaGerenteGeneral y este es el resultado",
        resultado.data
      );

      dispatch({
        type: OBTENER_DATOS_TABLA_REPORTE,
        payload: resultado.data, // lo ejecuta usefect al cargar la pagina
      });
    } catch (error) {
      console.log("hay un error");
      console.log(error.response.data.messages.error);
    }
  };

  const altaNegocio = async (idFicha, numero) => {
    console.log("esta es la data en altaNegocio ", idFicha, numero);
    try {
      const resultado = await clienteAxios.put(
        `/api/AprobacionGerenteGeneral/${idFicha}`,
        numero
      );
      console.log("resultado de altaNegocio", resultado);
      console.log("resultado de altaNegocio", resultado.data);
      dispatch({
        type: ALTA_NEGOCIO,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error.response.data.messages.error);
    }
  };

  const altaNegocioGerenteAdministracion = async (idFicha, numero) => {
    console.log("esta es la data en altaNegocio ", idFicha, numero);
    try {
      const resultado = await clienteAxios.put(
        `/api/AprobacionGerenteAdministracion/${idFicha}`,
        numero
      );
      console.log("resultado de altaNegocio", resultado);
      console.log("resultado de altaNegocio", resultado.data);
      dispatch({
        type: ALTA_NEGOCIO_GERENTE_ADMINISTRACION,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error.response.data.messages.error);
    }
  };

  const agregarDatosTabla = async (datos) => {
    //tarea.id = uuidv4();
    console.log("estas en agregarDatosTabla y has enviado", datos);
    try {
      const resultado = await clienteAxios.post("/detallefichatecnica", datos);
      // console.log("resultado de agregarDatosTabla", resultado);
      console.log(
        "ESTO ME DEVUELVE EL BACKEND AL CARGAR UNA TABLA",
        resultado.data
      );
      if (resultado.data.Errores) {
        console.log("existen errores");
      }
      agarrarError(resultado.data.Errores);
      dispatch({
        type: AGREGAR_DATOS_TABLA,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.messages.error);
      const alerta = {
        msg: error.response.data.messages.error,
        categoria: "alert alert-danger",
      };
      dispatch({
        type: ERROR_TABLA,
        payload: alerta,
      });
    }
  };
  const agarrarError = (error) => {
    console.log("chapaste el error", error);

    dispatch({
      type: ERROR_TABLA_DETALLE,
      payload: error,
    });
  };
  const eliminarDatosTabla = async (id) => {
    //tarea.id = uuidv4();
    console.log("estas en eliminarDatosTabla y has enviado este id", id);
    try {
      const resultado = await clienteAxios.delete(`/detallefichatecnica/${id}`);
      console.log("resultado de agregarDatosTabla", resultado);
      console.log(
        "resultado de agregarDatosTabla,ESTO ES LO Q ME DEVUELVE",
        resultado.data
      );
      dispatch({
        type: ELIMINAR_TABLA,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   *
   * @param {any} rowUpdated
   * @param {string} keyId El nombre de la columna de la tabla que representa el Id
   */
  /* const actualizarDatosTabla = (rowUpdated, keyId) => {
    dispatch({
      type: ACTUALIZAR_DATOS_TABLA,
      payload: { rowUpdated, keyId },
    });
  }; */
  const guardarCotizacionEnLaBd = async (data) => {
    console.log("esta es la data en el boton Guardar ", data);
    try {
      const resultado = await clienteAxios.put("/guardardataficha", data);
      // console.log("resultado de guardarCotizacionEnLaBd", resultado);
      console.log("resultado de BACKEND del boton guardar", resultado.data);
      dispatch({
        type: GUARDAR_COTIZACIONES_EN_LA_BD,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error.response.data.messages.error);
    }
  };

  return (
    <tablaContext.Provider
      value={{
        tablaDatos: state.tablaDatos,
        cotizaciones: state.cotizaciones,
        resultado: state.resultado,
        tablaDatosGerenteGeneral: state.tablaDatosGerenteGeneral,
        rptaAltaNegocio: state.rptaAltaNegocio,
        rptaAltaNegocioAdministracion: state.rptaAltaNegocioAdministracion,
        mensajeTabla: state.mensajeTabla,
        mensajeErrorDetalleTabla: state.mensajeErrorDetalleTabla,
        obtenerDatosTabla,
        agregarDatosTabla,
        guardarCotizacionEnLaBd,
        obtenerDatosTablaGerenteGeneral,
        altaNegocio,
        altaNegocioGerenteAdministracion,
        obtenerDatosTablaReporte,
        eliminarDatosTabla,
      }}
    >
      {props.children}
    </tablaContext.Provider>
  );
};

export default TablaStateProvider;
