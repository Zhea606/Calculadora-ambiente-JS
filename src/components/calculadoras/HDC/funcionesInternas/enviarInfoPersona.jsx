import axios from "axios";

export function enviarInfoPersona(
  nombre,
  correo,
  localidad,
  seccion,
  convivientes
) {
  const token = import.meta.env.VITE_APITOKEN;
  const urlBK = import.meta.env.VITE_BK;
  const axiosConfig = {
    headers: {
      token: token,
      "Content-Type": "multipart/form-data",
    },
  };

  axios
    .post(
      urlBK + "/api/guardarPersona",
      {
        nombre: nombre,
        correo: correo,
        localidad: localidad,
        seccion: seccion,
        convivientes: convivientes,
      },
      axiosConfig
    )
    .then(async (response) => {
      await response.data;
      return response.data;
    })
    .catch(async (error) => {
      return await error;
    });
}
