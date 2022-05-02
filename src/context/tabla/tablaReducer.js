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

const tableReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_DATOS_TABLA:
      return {
        ...state,
        tablaDatos: action.payload,
        mensajeErrorDetalleTabla: null,
      };
    case OBTENER_DATOS_TABLA_GERENTE_GENERAL:
      return {
        ...state,
        tablaDatosGerenteGeneral: action.payload,
        rptaAltaNegocio: null,
        rptaAltaNegocioAdministracion: null,
      };
    case OBTENER_DATOS_TABLA_REPORTE:
      return {
        ...state,
        tablaDatosGerenteGeneral: action.payload,
      };
    case AGREGAR_DATOS_TABLA:
      return {
        ...state,
        tablaDatos: action.payload.Detalle,
      };
    case ERROR_TABLA_DETALLE:
      return {
        ...state,
        mensajeErrorDetalleTabla: action.payload,
      };
    case GUARDAR_COTIZACIONES:
      return {
        ...state,
        cotizaciones: action.payload,
      };
    case ALTA_NEGOCIO:
      return {
        ...state,
        rptaAltaNegocio: action.payload,
      };
    case ALTA_NEGOCIO_GERENTE_ADMINISTRACION:
      return {
        ...state,
        rptaAltaNegocioAdministracion: action.payload,
      };
    case GUARDAR_COTIZACIONES_EN_LA_BD:
      return {
        ...state,
        tablaDatos: action.payload,
      };
    case ELIMINAR_TABLA:
      return {
        ...state,
        tablaDatos: [],
      };
    case ERROR_TABLA:
      return {
        ...state,
        mensajeTabla: action.payload,
      };
    /* case ACTUALIZAR_DATOS_TABLA:
      const { rowUpdated, keyId } = action.payload;
      const tablaDatos = state.tablaDatos.map((tarea) => {
        return tarea[keyId] === rowUpdated[keyId] ? rowUpdated : tarea;
      });
      return {
        ...state,
        tablaDatos,
      }; */
    default:
      return state;
  }
};

export default tableReducer;
