import { store } from "../../../../redux/store";
import axios from "axios";

export function enviarInfoHDC() {
  const token = import.meta.env.VITE_APITOKEN;
  const urlBK = import.meta.env.VITE_BK;
  const axiosConfig = {
    headers: {
      token: token,
      "Content-Type": "multipart/form-data",
    },
  };
  //valores actuales de la store de REDUX
  const exact = store.getState().valueState;
  console.log(exact.moto_auto);
  const cartTotal =
    exact.gasNatural +
    exact.gasLiquido +
    exact.leña +
    exact.carbon +
    exact.consumoElectrico +
    exact.moto_auto +
    exact.colectivo +
    exact.avion +
    exact.reciclajeValor +
    exact.dietaValor;
  axios
    .post(
      urlBK + "/api/guardarHDC",
      {
        correo: exact.correo,
        combustible: parseFloat(
          (
            exact.gasNatural +
            exact.gasLiquido +
            exact.leña +
            exact.carbon
          ).toFixed(2)
        ),
        electricidad: parseFloat(exact.consumoElectrico.toFixed(2)),
        transporte: parseFloat(
          (exact.moto_auto + exact.colectivo + exact.avion).toFixed(2)
        ),
        // viajesAereos: parseFloat(exact.avion.toFixed(2)),
        residuos: parseFloat(exact.reciclajeValor.toFixed(2)),
        alimentacion: parseFloat(exact.dietaValor.toFixed(2)),
        arbolesNecesarios: Math.round(
          parseFloat((cartTotal / 0.167).toFixed(2))
        ),
        tCO2e: parseFloat(cartTotal.toFixed(2)),
        gasNatural: parseFloat(exact.gasNatural.toFixed(2)),
        gasLiquido: parseFloat(exact.gasLiquido.toFixed(2)),
        lena: parseFloat(exact.leña.toFixed(2)),
        carbon: parseFloat(exact.carbon.toFixed(2)),
        bicicleta: parseFloat(exact.bici_pie.toFixed(2)),
        moto_auto: parseFloat(exact.moto_auto.toFixed(2)),
        colectivo: parseFloat(exact.colectivo.toFixed(2)),
        avion: parseFloat(exact.avion.toFixed(2)),
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
