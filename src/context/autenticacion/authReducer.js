import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
  OBTENER_TODOS_LOS_USUARIOS,
  ACTUALIZAR_USUARIO,
  ACTUALIZAR_PASSWORD,
  ENVIAR_PASSWORD,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case REGISTRO_EXITOSO:
      // localStorage.setItem("token", "Bearer " + action.payload.Token);
      return {
        ...state,
        //autenticado: true,
        mensaje: null,
      };
    case LOGIN_EXITOSO:
      localStorage.setItem("token", "Bearer " + action.payload.Token);
      return {
        ...state,
        autenticado: true,
        mensaje: null,
        cargando: false,
        cambioClave: false,
      };

    case LOGIN_ERROR:
    case REGISTRO_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        mensaje: action.payload,
        cargando: false,
      };
    case OBTENER_USUARIO:
      return {
        ...state,
        usuario: action.payload.user,
        autenticado: true,
        cargando: false,
      };
    case OBTENER_TODOS_LOS_USUARIOS:
      return {
        ...state,
        todosLosUsuarios: action.payload,
        autenticado: true,
        cargando: false,
      };
    case ACTUALIZAR_USUARIO:
      return {
        ...state,
        todosLosUsuarios: state.todosLosUsuarios.map((usuario) =>
          usuario.idUsuario === action.payload.idUsuario
            ? action.payload
            : usuario
        ),
        autenticado: true,
        cargando: false,
      };
    case ACTUALIZAR_PASSWORD:
      return {
        ...state,
        //cambioClave: true,
        //mensaje: true,
      };
    case ENVIAR_PASSWORD:
      return {
        ...state,
        //cambioClave: true,
        //mensaje: true,
      };

    case CERRAR_SESION:
      localStorage.removeItem("token");
      return {
        ...state,
        autenticado: null,
        mensaje: null,
        usuario: null,
        // cambioClave: false,
      };
    default:
      return state;
  }
};
