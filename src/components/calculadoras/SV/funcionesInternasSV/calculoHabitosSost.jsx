import constantesDataSV from "../constantesDataSV";

export function calculoHabitosSost(form) {
  let habitosConsumoRP = 0;
  let consumoRespTotal = 0;

  if (form.habitosSostCheckbox.toString().includes("HuertaCheckbox")) {
    habitosConsumoRP =
      habitosConsumoRP + constantesDataSV.datosValores[0].incorporadoHab.huerta;
  }

  if (form.habitosSostCheckbox.toString().includes("BolsasTelaCheckbox")) {
    habitosConsumoRP =
      habitosConsumoRP +
      constantesDataSV.datosValores[0].incorporadoHab.bolsasTela;
  }

  if (form.habitosSostCheckbox.toString().includes("LlevarTazaCheckbox")) {
    habitosConsumoRP =
      habitosConsumoRP +
      constantesDataSV.datosValores[0].incorporadoHab.llevarTaza;
  }

  if (
    form.habitosSostCheckbox.toString().includes("ProductosAmigablesCheckbox")
  ) {
    habitosConsumoRP =
      habitosConsumoRP +
      constantesDataSV.datosValores[0].incorporadoHab.productosAmigables;
  }

  if (form.habitosSostCheckbox.toString().includes("ProductosSustCheckbox")) {
    habitosConsumoRP =
      habitosConsumoRP +
      constantesDataSV.datosValores[0].incorporadoHab.productosSustentables;
  }

  if (
    form.habitosSostCheckbox.toString().includes("ProductosRegionalesCheckbox")
  ) {
    habitosConsumoRP =
      habitosConsumoRP +
      constantesDataSV.datosValores[0].incorporadoHab.productosRegionales;
  }

  if (form.habitosSostCheckbox.toString().includes("NingunoCRCheckbox")) {
    habitosConsumoRP =
      habitosConsumoRP +
      constantesDataSV.datosValores[0].incorporadoHab.ningunoCR;
  }

  consumoRespTotal = habitosConsumoRP;

  return consumoRespTotal;
}
