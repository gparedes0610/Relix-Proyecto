import axios from "axios";

const URLroles = `http://relixapi.mskdevmusic.com/roles`;

const obtenerRoles = async () => {
  try {
    const { data } = await axios.get(URLroles);
    return data;
  } catch (error) {
    console.log("error en obtenerCategorias", error);
  }
};

export { obtenerRoles };
