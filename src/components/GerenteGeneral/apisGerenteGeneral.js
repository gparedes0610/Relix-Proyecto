import axios, { Axios } from "axios";
import clienteAxios from "../../config/axios";

const obtenerFichasAceptadas = async () => {
  try {
    const { data } = await clienteAxios.get("/api/FichaTecnicaCotizadas");
    console.log("obtenerFichasAceptadas", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { obtenerFichasAceptadas };
