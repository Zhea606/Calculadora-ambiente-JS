import { store } from "../../../../redux/store";
import axios from "axios";

export function enviarInfoSV() {
  const token = import.meta.env.VITE_APITOKEN;
  const urlBK = import.meta.env.VITE_BK;
  const axiosConfig = {
    headers: {
      token: token,
      "Content-Type": "multipart/form-data",
    },
  };
  const exact = store.getState().valueState;

  const totalSV =
    exact.infraestructura +
    exact.energia +
    exact.confort +
    exact.agua +
    exact.consumoResponsable +
    exact.confort2 +
    exact.residuos +
    exact.agua2;

  axios
    .post(
      urlBK + "/api/guardarSV",
      {
        correo: exact.correo,
        infraestructura: exact.infraestructura.toFixed(2),
        energia: exact.energia.toFixed(2),
        confort_termico: exact.confort.toFixed(2),
        agua: exact.agua.toFixed(2),
        consumo_responsable: exact.consumoResponsable.toFixed(2),
        energia_confort: exact.confort2.toFixed(2),
        residuos: exact.residuos.toFixed(2),
        habitos_agua: exact.agua2.toFixed(2),
        total: totalSV.toFixed(2),
      },
      axiosConfig
    )
    .then(async (response) => {
      await response.data;
      return response.data;
    })
    .catch((error) => {
      return error;
    });

  return;
}
//DATOS DESDE https://datosmacro.expansion.com/energia-y-medio-ambiente/emisiones-co2
