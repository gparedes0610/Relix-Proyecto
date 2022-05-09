import axios, { Axios } from "axios";
import clienteAxios from "../../config/axios";

const registroProductos = async (datos) => {
  console.log("entraste a registroProductos enviaste esta data", datos);
  try {
    const { data } = await clienteAxios.post("/productos", datos);
    console.log("registroProductos", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
const registroProducto = async (dato) => {
  console.log("entraste a registroProducto enviaste esta data", dato);
  try {
    const { data } = await clienteAxios.post("/productosUnidad", dato);
    console.log("registroProducto", data);
    return data;
  } catch (error) {
    //console.log(error);
    console.log(error.response.data.messages.error);
  }
};

export { registroProductos, registroProducto };
