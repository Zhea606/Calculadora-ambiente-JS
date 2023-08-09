import constantesDataSV from "../constantesDataSV";

export function calculoAgua(form) {
  let dispAhorradorCheck = 0;
  let bajoRequerimRadio = 0;
  let formaRegarSelect = 0;
  let aguaTotal = 0;

  if (form.dispAhorradorAguaCheckbox.toString().includes("GrifosCheckbox")) {
    dispAhorradorCheck =
      dispAhorradorCheck +
      constantesDataSV.datosValores[0].dispAhorrador.grifos;
  }

  if (
    form.dispAhorradorAguaCheckbox.toString().includes("DobleDescargaCheckbox")
  ) {
    dispAhorradorCheck =
      dispAhorradorCheck +
      constantesDataSV.datosValores[0].dispAhorrador.dobleDescarga;
  }

  if (
    form.dispAhorradorAguaCheckbox.toString().includes("MecanismoReusoCheckbox")
  ) {
    dispAhorradorCheck =
      dispAhorradorCheck +
      constantesDataSV.datosValores[0].dispAhorrador.rehusoAgua;
  }

  if (
    form.dispAhorradorAguaCheckbox
      .toString()
      .includes("CaptacionLluviaCheckbox")
  ) {
    dispAhorradorCheck =
      dispAhorradorCheck +
      constantesDataSV.datosValores[0].dispAhorrador.captacionLluvia;
  }
  if (form.dispAhorradorAguaCheckbox.toString().includes("NingunoAgCheckbox")) {
    dispAhorradorCheck =
      dispAhorradorCheck +
      constantesDataSV.datosValores[0].dispAhorrador.ningunoDA;
  }

  switch (form.bajoRequerimiento) {
    case "sonBajoRequerim":
      bajoRequerimRadio =
        bajoRequerimRadio + constantesDataSV.datosValores[0].bajoRequerim.siBR;
      break;

    case "noSonBajoRequerim":
      bajoRequerimRadio =
        bajoRequerimRadio + constantesDataSV.datosValores[0].bajoRequerim.noBR;
      break;

    case "noTieneJardin":
      bajoRequerimRadio =
        bajoRequerimRadio +
        constantesDataSV.datosValores[0].bajoRequerim.noTieneJardin;
      break;
    default:
      break;
  }

  switch (form.formaRiego) {
    case "Riego tecnificado (aspersión, goteo)":
      formaRegarSelect =
        formaRegarSelect +
        constantesDataSV.datosValores[0].regarJardin.riegoTecnificado;
      break;

    case "Con manguera":
      formaRegarSelect =
        formaRegarSelect +
        constantesDataSV.datosValores[0].regarJardin.conManguera;
      break;

    case "Con regadera o botella":
      formaRegarSelect =
        formaRegarSelect +
        constantesDataSV.datosValores[0].regarJardin.regaderaBotella;
      break;

    case "Manto (inundación)":
      formaRegarSelect =
        formaRegarSelect + constantesDataSV.datosValores[0].regarJardin.manto;
    default:
      break;
  }

  aguaTotal = dispAhorradorCheck + bajoRequerimRadio + formaRegarSelect;

  return aguaTotal;
}
