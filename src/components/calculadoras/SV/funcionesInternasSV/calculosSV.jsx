import { enviarInfoSV } from "./enviarInfoSV";
import { enviarInfoPersona } from "../../HDC/funcionesInternas/enviarInfoPersona";
import {
  mostrarModal,
  mostrarResultados,
  recibirDatosSV,
} from "../../../../redux/features/valueSlice";
import { calculoInfra } from "./calculoInfra";
import { calculoAguaHabitos } from "./calculoAguaHabitos";
import { calculoResiduos } from "./calculoResiduos";
import { calculoEnergiaYConfort } from "./calculoEnergiaYConfort";
import { calculoHabitosSost } from "./calculoHabitosSost";
import { calculoAgua } from "./calculoAgua";
import { calculoConfortTermico } from "./calculoConfortTermico";
import { calculoEnerg } from "./calculoEnerg";

export async function calculosSV(data, schema, validateOptions, dispatch) {
  // const dispatch = useDispatch();
  console.log("DATA", data);

  await schema
    .validate(data, validateOptions)
    .then(() => {
      enviarInfoPersona(
        data.nombre,
        data.correo,
        data.localidad,
        data.seccion,
        data.convivientes
      );
      let infraTotal = calculoInfra(data);
      console.log("INFRA", infraTotal);

      let energTotal = calculoEnerg(data);
      console.log("ENERG", energTotal);

      let confortTermTotal = calculoConfortTermico(data);
      console.log("CONTER", confortTermTotal);

      let aguTotal = calculoAgua(data);
      console.log("H20", aguTotal);

      let habitTotal = calculoHabitosSost(data);
      console.log("HABT", habitTotal);

      let energConfTotal = calculoEnergiaYConfort(data);
      console.log("ENERCONF", energConfTotal);

      let residTotal = calculoResiduos(data);
      console.log("RESI", residTotal);

      let agHabtTotal = calculoAguaHabitos(data);
      console.log("H20HAB", agHabtTotal);

      const dataRedux = {
        infraestructura: infraTotal,
        energia: energTotal,
        confort: confortTermTotal,
        agua: aguTotal,
        consumoResponsable: habitTotal,
        confort2: energConfTotal,
        residuos: residTotal,
        agua2: agHabtTotal,
        correo: data.correo,
      };

      //     .catch((err) => {
      //       setMostrarResultados(false);
      //       setMensaje(err.message);
      //       setVisible(true);
      //       dispatch(mostrarModal(true));
      //     });
      // }

      setTimeout(() => enviarInfoSV(), 100);
      dispatch(recibirDatosSV(dataRedux));
      dispatch(mostrarResultados(true));
      // dispatch(esValido(true));
      // setMostrarResultados(true);
      // setValidacion(true);
    })
    .catch((err) => {
      console.log(err);
      dispatch(mostrarResultados(false));
      // dispatch(esValido(false));
      dispatch(mostrarModal(true));
      // setMostrarResultados(false);
      // setMensaje(err.message);
      // setVisible(true);
    });
}
