import axios, { Axios } from "axios";
import clienteAxios from "../../config/axios";

const obtenerFichasBackOffice = async () => {
  try {
    const { data } = await clienteAxios.get("/api/FichaTecnicaBackOffice");
    console.log("obtenerFichasBackOffice", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { obtenerFichasBackOffice };
