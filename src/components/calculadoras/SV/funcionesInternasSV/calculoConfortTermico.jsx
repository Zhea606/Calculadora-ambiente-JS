import constantesDataSV from "../constantesDataSV";

export function calculoConfortTermico(form) {
  let burletesRadio = 0;
  let goteanVentRadio = 0;
  let confortTermicoTotal = 0;

  switch (form.ingresaAireVentPuert) {
    case "siIngresaAire":
      burletesRadio =
        burletesRadio + constantesDataSV.datosValores[0].ingresaAir.siTieneB;
      break;

    case "noIngresaAire":
      burletesRadio =
        burletesRadio + constantesDataSV.datosValores[0].ingresaAir.noTieneB;
      break;
    default:
      break;
  }

  switch (form.goteanVentanas) {
    case "siGotean":
      goteanVentRadio =
        goteanVentRadio + constantesDataSV.datosValores[0].ventanasGotean.siGOT;
      break;

    case "noGotean":
      goteanVentRadio =
        goteanVentRadio + constantesDataSV.datosValores[0].ventanasGotean.noGOT;
      break;
    default:
      break;
  }

  confortTermicoTotal = burletesRadio + goteanVentRadio;

  return confortTermicoTotal;
}
