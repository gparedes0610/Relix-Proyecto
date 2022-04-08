import axios, { Axios } from "axios";
import clienteAxios from "../../config/axios";

const URLTIPOSPROYECTOS = `http://relixapi.mskdevmusic.com/tiposproyecto`;
const URLVENDEDORES = `http://relixapi.mskdevmusic.com/vendedor`;
const URLDEPARTAMENTOS = `http://relixapi.mskdevmusic.com/departamento`;
const URLESTADOS = `http://relixapi.mskdevmusic.com/estadosfichaproyecto`;

const obtenerTiposDeProyectos = async () => {
  try {
    const { data } = await axios.get(URLTIPOSPROYECTOS);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const obtenerVendedores = async () => {
  try {
    const { data } = await axios.get(URLVENDEDORES);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const obtenerDepartamentos = async () => {
  try {
    const { data } = await axios.get(URLDEPARTAMENTOS);
    return data;
  } catch (error) {
    console.log(error);
  }
};
const obtenerProvincias = async (idDepartamento = "") => {
  try {
    const { data } = await axios.get(
      `http://relixapi.mskdevmusic.com/provincia/${idDepartamento}`
    );
    return data;
  } catch (error) {
    console.log("error en obtenerProvincias", error);
  }
};
const obtenerDistritos = async (idProvincia = "") => {
  try {
    const { data } = await axios.get(
      `http://relixapi.mskdevmusic.com/distrito/${idProvincia}`
    );
    return data;
  } catch (error) {
    console.log("error en obtenerProvincias", error);
  }
};

const obtenerEstados = async () => {
  try {
    const { data } = await axios.get(URLESTADOS);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const obtenerCodigoFichaTenica = async () => {
  try {
    const { data } = await clienteAxios.get(
      `http://relixapi.mskdevmusic.com/api/codigoficha `
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const obtenerFormasDePago = async () => {
  try {
    const { data } = await clienteAxios.get(
      `http://relixapi.mskdevmusic.com/formaspago`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export {
  obtenerTiposDeProyectos,
  obtenerVendedores,
  obtenerDepartamentos,
  obtenerEstados,
  obtenerProvincias,
  obtenerDistritos,
  obtenerCodigoFichaTenica,
  obtenerFormasDePago,
};
