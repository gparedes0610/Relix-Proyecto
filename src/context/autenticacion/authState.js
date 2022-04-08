import authContext from "./authContext";
import authReducer from "./authReducer";
import {
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_TODOS_LOS_USUARIOS,
  ACTUALIZAR_USUARIO,
  ACTUALIZAR_PASSWORD,
  ENVIAR_PASSWORD,
} from "../../types";
import { useReducer } from "react";
import clienteAxios from "../../config/axios"; //obtengo la bd urlS
import tokenAuth from "../../config/token"; //valido el token en el headers
const AuthStateProvider = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true,
    todosLosUsuarios: [],
    //cambioClave: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //retorna el usuario autenticado
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      //todo:funcion para enviar el token por headers
      tokenAuth(token);
    }

    try {
      const respuesta = await clienteAxios.get("/auth/login");
      // console.log("esta es la respuesta en usuarioAutenticado", respuesta);
      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error.response.data.messages.error);
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  //iniciar sesion
  const iniciarSesion = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/auth/login", datos); //envio correo y clave
      console.log(respuesta);
      ////
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data,
      });

      //obtener el usuario
      usuarioAutenticado();
    } catch (error) {
      //console.log("HUBO UN ERROR PES CSMRE", error);
      console.log(
        "HUBO UN ERROR PES CSMRE",
        error.response.data.messages.error
      );
      const alerta = {
        msg: error.response.data.messages.error,
        categoria: "alert alert-danger",
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: alerta,
      });
    }
  };
  //////////////////////////////////////////////////REGISTRAR USUARIO
  const registroDeUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/usuarios", datos);
      console.log("respuesta de usuarioRegistrado", respuesta);
      console.log(respuesta.data);

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error.response.data.messages.error);
      console.log("hubo un error manito", error.response.data.messages.error);
      const alerta = {
        msg: error.response.data.messages.error,
        categoria: "alert alert-danger",
      };
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };

  //cerrar sesion

  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION,
    });
  };
  //obtener usuarios
  const obtenerTodosLosUsuarios = async () => {
    try {
      const respuesta = await clienteAxios.get("/api/usuarios");
      //console.log("estas en obtener todos los usuarios", respuesta);
      dispatch({
        type: OBTENER_TODOS_LOS_USUARIOS,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error.response.data.messages.error);
    }
  };

  //cambiar estado de usuario
  const actualizarUsuario = async (usuario) => {
    try {
      //console.log("entra a actualizar usuario");
      // console.log("este es el id usuaro", usuario.idUsuario);
      const resultado = await clienteAxios.put(
        `/api/usuarios/estado/${usuario.idUsuario}`,
        usuario
      );
      console.log("resultado de actualizarUsuario ", resultado);
      console.log("resultado de actualizarUsuario ", resultado.data);
      dispatch({
        type: ACTUALIZAR_USUARIO,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error.response.data.messages.error);
    }
  };

  //actualizar password
  const actualizarPassword = async (datos) => {
    console.log("actualizarpassword se envio", datos);
    try {
      const resultado = await clienteAxios.put(
        `/actualizarClavedefault`,
        datos
      );
      console.log(resultado);
      console.log(resultado.data);
      dispatch({
        type: ACTUALIZAR_PASSWORD,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error.response.data.messages.error);
    }
  };
  //enviar password
  const enviarCorreoPassword = async (dato) => {
    console.log("enviarPassword se envio", dato);
    try {
      const resultado = await clienteAxios.put(`/generarclave`, dato);
      console.log(resultado);
      console.log(resultado.data);
      dispatch({
        type: ENVIAR_PASSWORD,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error.response.data.messages.error);
    }
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando: state.cargando,
        todosLosUsuarios: state.todosLosUsuarios,
        cambioClave: state.cambioClave,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion,
        registroDeUsuario,
        obtenerTodosLosUsuarios,
        actualizarUsuario,
        actualizarPassword,
        enviarCorreoPassword,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};
export default AuthStateProvider;
