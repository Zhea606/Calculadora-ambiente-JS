import { store } from "../../../../redux/store";
import { enviarInfoHDC } from "./enviarInfoHDC";
import { enviarInfoPersona } from "./enviarInfoPersona";
import {
  mostrarModal,
  mostrarResultados,
  recibirDatosHDC,
} from "../../../../redux/features/valueSlice";
import constants from "../../../../constants";

export async function calculos(data, schema, validateOptions, dispatch) {
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
      let FECOMB;
      if (data.combustibleRadio !== undefined) {
        let comb = data.combustibleRadio.toString();
        switch (comb) {
          case "Nafta":
            FECOMB = constants.factorEmisionCombustibleVehiculo.NAFTA;
            break;
          case "Gasoil":
            FECOMB = constants.factorEmisionCombustibleVehiculo.GASOIL;
            break;
          case "GNC":
            FECOMB = constants.factorEmisionCombustibleVehiculo.GNC;
            break;
          case "Eléctrico":
            FECOMB = constants.factorEmisionCombustibleVehiculo.ELECTRICIDAD;
            break;
        }
      } else {
        FECOMB = 0;
      }
      console.log(data.combustibleRadio.toString() === "Nafta");
      console.log(data.combustibleradio !== undefined);
      const dataRedux = {
        consumoElectrico:
          ((parseFloat(data.Electricidad1) +
            parseFloat(data.Electricidad2) +
            parseFloat(data.Electricidad3) +
            parseFloat(data.Electricidad4) +
            parseFloat(data.Electricidad5) +
            parseFloat(data.Electricidad6)) *
            constants.factorEmisionElectricidad) /
          parseFloat(data.convivientes),
        gasNatural: data.combustibleCheckbox
          .toString()
          .includes("Gas Natural (en m3)")
          ? ((parseFloat(data.GasNaturalConsumo1) +
              parseFloat(data.GasNaturalConsumo2) +
              parseFloat(data.GasNaturalConsumo3) +
              parseFloat(data.GasNaturalConsumo4) +
              parseFloat(data.GasNaturalConsumo5) +
              parseFloat(data.GasNaturalConsumo6)) *
              constants.factorEmisionCombustibleHogar.GN) /
            parseFloat(data.convivientes)
          : 0,
        gasLiquido: data.combustibleCheckbox
          .toString()
          .includes("Gas Licuado (garrafa) (en kg)")
          ? (parseFloat(data.GasLicuadoConsumo) *
              constants.factorEmisionCombustibleHogar.GL) /
            parseFloat(data.convivientes)
          : 0,
        leña: data.combustibleCheckbox.toString().includes("Leña (en kg)")
          ? (parseFloat(data.LeñaConsumo) *
              constants.factorEmisionCombustibleHogar.LEÑA) /
            parseFloat(data.convivientes)
          : 0,
        carbon: data.combustibleCheckbox.toString().includes("Carbon (en kg)")
          ? (parseFloat(data.CarbonConsumo) *
              constants.factorEmisionCombustibleHogar.CARBON) /
            parseFloat(data.convivientes)
          : 0,
        bici_pie: data.transporteCheckbox
          .toString()
          .includes("Bicicleta / a pie")
          ? parseFloat(data.BicicletaPieConsumo)
          : 0,
        moto_auto: data.transporteCheckbox
          .toString()
          .includes("Motocicleta / Automóvil")
          ? (parseFloat(data.kilometrosAnualesMotoAuto) *
              (1 / parseFloat(data.consumoVehiculoMotoAuto)) *
              FECOMB) /
            1000 /
            parseFloat(data.personasViajeMotoAuto)
          : 0,
        colectivo: data.transporteCheckbox.toString().includes("Colectivo")
          ? (parseFloat(data.viajesSemanaColectivo) *
              (parseFloat(data.viajeMesesColectivo) * 4) *
              parseFloat(data.viajeKilometrosColectivo) *
              (1 / 2.5) *
              constants.factorEmisionCombustibleVehiculo.GASOIL) /
            (1000 * 20)
          : 0,
        avion: data.transporteCheckbox.toString().includes("Avión")
          ? (((parseFloat(data.kilometrosAñoAvion) * constants.cruise +
              parseFloat(data.cantidadEscalasAvion) * constants.lto) /
              constants.densidad /
              constants.capacidad /
              constants.ocupacion) *
              2 *
              constants.factorEmisionCombustibleVehiculo.AEROKEROSEN) /
            1000
          : 0,
        reciclajeValor: data.radioReciclaje
          .toString()
          .includes("Nada o casi nada")
          ? (constants.factorEmisionReciclaje.Nada *
              constants.kg_hab_dia *
              constants.kgCO2_kgresiduos *
              365) /
            1000
          : data.radioReciclaje.toString().includes("Algunos residuos")
          ? (constants.factorEmisionReciclaje.Algo *
              constants.kg_hab_dia *
              constants.kgCO2_kgresiduos *
              365) /
            1000
          : data.radioReciclaje.toString().includes("Varios residuos")
          ? (constants.factorEmisionReciclaje.Separo_algunos *
              constants.kg_hab_dia *
              constants.kgCO2_kgresiduos *
              365) /
            1000
          : (constants.factorEmisionReciclaje.Separo_todo *
              constants.kg_hab_dia *
              constants.kgCO2_kgresiduos *
              365) /
            1000,
        dietaValor: data.radioAlimentacion.toString().includes("Muy carnívora")
          ? constants.factorEmisionDieta.MuyCarnivoro
          : data.radioAlimentacion.toString().includes("Carnívora")
          ? constants.factorEmisionDieta.Carnivoro
          : data.radioAlimentacion.toString().includes("Equilibrada")
          ? constants.factorEmisionDieta.Equilibrada
          : data.radioAlimentacion.toString().includes("Vegetariana")
          ? constants.factorEmisionDieta.Vegetariano
          : constants.factorEmisionDieta.Vegano,
        correo: data.correo,
      };
      console.log(data.transporteCheckbox);
      console.log(data.kilometrosAnualesMotoAuto);
      console.log(data.consumoVehiculoMotoAuto);
      console.log(FECOMB);
      console.log(data.combustibleRadio.toString());
      console.log(constants.factorEmisionCombustibleVehiculo.NAFTA);

      setTimeout(() => enviarInfoHDC(), 100);
      dispatch(recibirDatosHDC(dataRedux));
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
