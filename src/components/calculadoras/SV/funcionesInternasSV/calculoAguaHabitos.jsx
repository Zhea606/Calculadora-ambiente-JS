import constantesDataSV from "../constantesDataSV";

export function calculoAguaHabitos(form) {
  let habitosAguaCheck = 0;
  let agua2Total = 0;

  if (
    form.habitosConsumoAguaCheckbox
      .toString()
      .includes("NoDerrochaAguaCheckbox")
  ) {
    habitosAguaCheck =
      habitosAguaCheck +
      constantesDataSV.datosValores[0].habitosConsumoAgua.noDerrocha;
  }

  if (
    form.habitosConsumoAguaCheckbox.toString().includes("LavaBaldeCheckbox")
  ) {
    habitosAguaCheck =
      habitosAguaCheck +
      constantesDataSV.datosValores[0].habitosConsumoAgua.lavadoAutoBalde;
  }

  if (
    form.habitosConsumoAguaCheckbox
      .toString()
      .includes("CargaLavarropasCheckbox")
  ) {
    habitosAguaCheck =
      habitosAguaCheck +
      constantesDataSV.datosValores[0].habitosConsumoAgua
        .lavarropasCargaCompleta;
  }

  if (
    form.habitosConsumoAguaCheckbox
      .toString()
      .includes("ReparaPerdidasCheckbox")
  ) {
    habitosAguaCheck =
      habitosAguaCheck +
      constantesDataSV.datosValores[0].habitosConsumoAgua.reparaPerdidas;
  }

  if (
    form.habitosConsumoAguaCheckbox.toString().includes("NingunoCACheckbox")
  ) {
    habitosAguaCheck =
      habitosAguaCheck +
      constantesDataSV.datosValores[0].habitosConsumoAgua.ningunoCA;
  }

  agua2Total = habitosAguaCheck;

  return agua2Total;
}
