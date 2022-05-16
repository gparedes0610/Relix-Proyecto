import clienteAxios from "../../config/axios";

const anularProducto = async (datos) => {
  console.log("entraste a anularProducto enviaste esta data", datos);
  try {
    const { data } = await clienteAxios.post("/anularProductoDetalle", datos);
    // console.log("anularProducto", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const obtenerPartidas = async () => {
  try {
    const { data } = await clienteAxios.get("/partidas");
    // console.log("obtenerPartidas", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const obtenerEstados = async () => {
  try {
    const { data } = await clienteAxios.get("/estadoProductos");
    //console.log("obtenerEstados", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const obtenerSubPartidas = async (idPartida = "") => {
  try {
    const { data } = await clienteAxios.get(`/subpartidas/${idPartida}`);
    console.log("obtenerSubPartidas", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const obtenerProductos = async (codigo) => {
  try {
    const { data } = await clienteAxios.get(`/productos/${codigo}`);
    console.log("obtenerProductos", data);
    return data;
  } catch (error) {
    console.log(error.response.data.messages.error);
  }
};

const agregarProducto = async (datos) => {
  try {
    const { data } = await clienteAxios.post(
      `/productoDetalleFichaTecnica`,
      datos
    );
    console.log("agregarProducto", data);
    return data;
  } catch (error) {
    console.log(error.response.data.messages.error);
  }
};

const obtenerTablaBackOffice = () => {
  try {
  } catch (error) {
    console.log(error.response.data.messages.error);
  }
};

export {
  anularProducto,
  obtenerPartidas,
  obtenerSubPartidas,
  obtenerProductos,
  obtenerEstados,
  agregarProducto,
};
