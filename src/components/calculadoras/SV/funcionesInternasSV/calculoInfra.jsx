import constantesDataSV from "../constantesDataSV";

export function calculoInfra(form) {
  let aislacionTermica = 0;
  let ventanaSelect = 0;
  let orientacionVentanaRadio = 0;
  let tipoInfraSelect = 0;
  let infraestructuraTotal = 0;

  if (form.aislacionCheckbox.toString().includes("TechosCheckbox")) {
    aislacionTermica =
      aislacionTermica +
      constantesDataSV.datosValores[0].aislacionTermica.techos;
  }

  if (form.aislacionCheckbox.toString().includes("MurosCheckbox")) {
    aislacionTermica =
      aislacionTermica +
      constantesDataSV.datosValores[0].aislacionTermica.muros;
  }

  if (form.aislacionCheckbox.toString().includes("PisoCheckbox")) {
    aislacionTermica =
      aislacionTermica + constantesDataSV.datosValores[0].aislacionTermica.piso;
  }

  if (form.aislacionCheckbox.toString().includes("NingunoCheckbox")) {
    aislacionTermica =
      aislacionTermica +
      constantesDataSV.datosValores[0].aislacionTermica.ningunoAisT;
  }

  switch (form.ventanaTipo) {
    case "Corrediza vidrio simple":
      ventanaSelect =
        ventanaSelect +
        constantesDataSV.datosValores[0].ventanasHogar.corredizaSimple;
      break;

    case "Corrediza vidrio doble":
      ventanaSelect =
        ventanaSelect +
        constantesDataSV.datosValores[0].ventanasHogar.corredizaDoble;
      break;

    case "Abatibles vidrio simple":
      ventanaSelect =
        ventanaSelect +
        constantesDataSV.datosValores[0].ventanasHogar.abatiblesSimple;
      break;

    case "Abatibles vidrio doble":
      ventanaSelect =
        ventanaSelect +
        constantesDataSV.datosValores[0].ventanasHogar.abatiblesDoble;
    default:
      break;
  }

  switch (form.proteccionSolar) {
    case "siProteccionSolar":
      orientacionVentanaRadio =
        orientacionVentanaRadio +
        constantesDataSV.datosValores[0].orientacion.siOR;
      break;

    case "noProteccionSolar":
      orientacionVentanaRadio =
        orientacionVentanaRadio +
        constantesDataSV.datosValores[0].orientacion.noOR;
      break;
    default:
      break;
  }

  switch (form.tipoInfraestructura) {
    case "Sistema de construcción tradicional con aislamiento":
      tipoInfraSelect =
        tipoInfraSelect +
        constantesDataSV.datosValores[0].tipoInfraHogar.construccionAislamiento;
      break;

    case "Sistema de construcción tradicional":
      tipoInfraSelect =
        tipoInfraSelect +
        constantesDataSV.datosValores[0].tipoInfraHogar.construccionTradicional;
      break;

    case "Sistema de construcción no tradicional (seco, vivienda prefabricada)":
      tipoInfraSelect =
        tipoInfraSelect +
        constantesDataSV.datosValores[0].tipoInfraHogar
          .construccionNoTradicional;
      break;

    case "Vivienda informal":
      tipoInfraSelect =
        tipoInfraSelect +
        constantesDataSV.datosValores[0].tipoInfraHogar.viviendaInformal;
    default:
      break;
  }

  infraestructuraTotal =
    aislacionTermica +
    ventanaSelect +
    orientacionVentanaRadio +
    tipoInfraSelect;

  return infraestructuraTotal;
}
