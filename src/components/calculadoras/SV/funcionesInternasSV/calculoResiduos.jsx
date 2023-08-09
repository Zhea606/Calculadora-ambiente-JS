import constantesDataSV from "../constantesDataSV";

export function calculoResiduos(form) {
  let separaResidSelect = 0;
  let compostRadio = 0;
  let residuosTotal = 0;

  switch (form.formaResiduos) {
    case "No separo mis residuos":
      separaResidSelect =
        separaResidSelect + constantesDataSV.datosValores[0].separaResid.noSep;
      break;

    case "Separo residuos secos reciclables y húmedos":
      separaResidSelect =
        separaResidSelect +
        constantesDataSV.datosValores[0].separaResid.separaSecHum;
      break;

    case "Separo mis residuos en mayores categorías (Ej. papel, vidrio, orgánicos, electrónicos, etc.)":
      separaResidSelect =
        separaResidSelect +
        constantesDataSV.datosValores[0].separaResid.residuosMayor;
    default:
      break;
  }

  switch (form.haceCompost) {
    case "siHaceCompost":
      compostRadio =
        compostRadio + constantesDataSV.datosValores[0].compostRO.siHace;
      break;

    case "noHaceCompost":
      compostRadio =
        compostRadio + constantesDataSV.datosValores[0].compostRO.noHace;
      break;
    default:
      break;
  }

  residuosTotal = separaResidSelect + compostRadio;

  return residuosTotal;
}
