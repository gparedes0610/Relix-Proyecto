import axios from "axios";

const urlUsuarios = `http://relixapi.mskdevmusic.com/api/usuarios`; //registrar y obtener usuarios
const urlUsuarios2 = `http://relixapi.mskdevmusic.com/auth/login`;
//const token =
// "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkVXN1YXJpbyI6IjIiLCJub21icmVVc3VhcmlvIjoiTHVpcyIsImNvcnJlb1VzdWFyaW8iOiJsdWlzbHVpYW41QGdtYWlsLmNvbSIsImFwZWxsaWRvVXN1YXJpbyI6Ikx1aWFuIiwicGFzc3dvcmRVc3VhcmlvIjoiJDJ5JDEwJHF3RXBtaHBvS0lDZnp3WVZLejYyN09rNnh3NGYzTWU1WUhGczFuY1BWS0NDM21LOXBVSWhPIiwiaWRSb2wiOiIxIiwiY29kaWdvY2FtYmlvQ2xhdmUiOiI0OTQzIiwiY3JlYXRlZF9hdCI6IjIwMjEtMTItMjQgMTg6MzQ6NDMiLCJ1cGRhdGVkX2F0IjoiMjAyMS0xMi0yNCAxODo1ODowMiIsImRlbGV0ZWRfYXQiOm51bGx9LCJpYXQiOjE2NDA2MjAxMTEsImV4cCI6MTY0MDcwNjUxMX0.yjUfoXoGnxeOP_-AjMthLvrK6nyP-A5a4LpCORahWD0";

var config = {
  method: "get",
  url: urlUsuarios,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};
const obtenerUsuarios = async () => {
  try {
    const { data } = await axios(config);
    return data;
  } catch (error) {
    throw error;
  }
};

const crearUsuarios = async (nuevoUsuario) => {
  try {
    var configPost = {
      method: "post",
      url: urlUsuarios,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: nuevoUsuario,
    };

    const { data } = await axios(configPost);
    return data;
  } catch (error) {
    throw error;
  }
};

//////////////////////////////////////////////////////////

const validaSesion = async (nuevoUsuario) => {
  try {
    var configPost = {
      method: "post",
      url: urlUsuarios2,
      headers: {
        "Content-Type": "application/json",
      },
      data: nuevoUsuario,
    };

    const { data } = await axios(configPost);
    return data;
  } catch (error) {
    throw error;
  }
};

export { crearUsuarios, obtenerUsuarios, validaSesion };
