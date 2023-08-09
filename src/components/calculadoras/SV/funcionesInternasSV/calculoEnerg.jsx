import constantesDataSV from "../constantesDataSV";

export function calculoEnerg(form) {
  let lamparasSelect = 0;
  let eficienciaEnergRadio = 0;
  let sistEnergRenovCheck = 0;
  let energiaTotal = 0;

  switch (form.lamparasTipo) {
    case "Lámparas incandecentes":
      lamparasSelect =
        lamparasSelect +
        constantesDataSV.datosValores[0].lamparas.incandecentes;
      break;

    case "Lámparas halógenas":
      lamparasSelect =
        lamparasSelect + constantesDataSV.datosValores[0].lamparas.halogenas;
      break;

    case "Lámparas fluorescentes":
      lamparasSelect =
        lamparasSelect +
        constantesDataSV.datosValores[0].lamparas.fluorescentes;
      break;

    case "Lámparas LED":
      lamparasSelect =
        lamparasSelect + constantesDataSV.datosValores[0].lamparas.led;
    default:
      break;
  }

  switch (form.consideraEficiencia) {
    case "siConsideraEfic":
      eficienciaEnergRadio =
        eficienciaEnergRadio + constantesDataSV.datosValores[0].etiquetaEf.siEF;
      break;

    case "noConsideraEfic":
      eficienciaEnergRadio =
        eficienciaEnergRadio + constantesDataSV.datosValores[0].etiquetaEf.noEF;
      break;
    default:
      break;
  }

  if (form.energiasRenovCheckbox.toString().includes("CalefonSolarCheckbox")) {
    sistEnergRenovCheck =
      sistEnergRenovCheck +
      constantesDataSV.datosValores[0].renovables.calefonSol;
  }

  if (form.energiasRenovCheckbox.toString().includes("PanelesCheckbox")) {
    sistEnergRenovCheck =
      sistEnergRenovCheck +
      constantesDataSV.datosValores[0].renovables.panelesFot;
  }

  if (form.energiasRenovCheckbox.toString().includes("NingunoERCheckbox")) {
    sistEnergRenovCheck =
      sistEnergRenovCheck + constantesDataSV.datosValores[0].renovables.ninguno;
  }

  energiaTotal = lamparasSelect + eficienciaEnergRadio + sistEnergRenovCheck;

  return energiaTotal;
}
