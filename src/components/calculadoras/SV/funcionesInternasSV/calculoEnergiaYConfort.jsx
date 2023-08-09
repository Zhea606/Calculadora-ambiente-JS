import constantesDataSV from "../constantesDataSV";

export function calculoEnergiaYConfort(form) {
  let habitosEnergCheck = 0;
  let buenConfCheck = 0;
  let ventilaRadio = 0;
  let energiaYconfortTotal = 0;

  if (form.habitosEnergiaCheckbox.toString().includes("DesenchufoCheckbox")) {
    habitosEnergCheck =
      habitosEnergCheck +
      constantesDataSV.datosValores[0].practicaHabEnerg.desenchufa;
  }

  if (form.habitosEnergiaCheckbox.toString().includes("SecoRopaCheckbox")) {
    habitosEnergCheck =
      habitosEnergCheck +
      constantesDataSV.datosValores[0].practicaHabEnerg.secarRopa;
  }

  if (form.habitosEnergiaCheckbox.toString().includes("ApagarTermotCheckbox")) {
    habitosEnergCheck =
      habitosEnergCheck +
      constantesDataSV.datosValores[0].practicaHabEnerg.apagaTermotanque;
  }

  if (form.habitosEnergiaCheckbox.toString().includes("ApagaLucesCheckbox")) {
    habitosEnergCheck =
      habitosEnergCheck +
      constantesDataSV.datosValores[0].practicaHabEnerg.apagarLuces;
  }

  if (
    form.habitosEnergiaCheckbox.toString().includes("AprovechoLuzSolarCheckbox")
  ) {
    habitosEnergCheck =
      habitosEnergCheck +
      constantesDataSV.datosValores[0].practicaHabEnerg.ambientes;
  }

  if (form.habitosEnergiaCheckbox.toString().includes("NingunoHECheckbox")) {
    habitosEnergCheck =
      habitosEnergCheck +
      constantesDataSV.datosValores[0].practicaHabEnerg.ningunoHE;
  }

  /********************************************/

  if (form.buenConfortCheckbox.toString().includes("ApagoAireCheckbox")) {
    buenConfCheck =
      buenConfCheck +
      constantesDataSV.datosValores[0].habitosConfortTermico.apagaAireAC;
  }

  if (form.buenConfortCheckbox.toString().includes("ApagoEstufaCheckbox")) {
    buenConfCheck =
      buenConfCheck +
      constantesDataSV.datosValores[0].habitosConfortTermico.apagaEstufa;
  }

  if (form.buenConfortCheckbox.toString().includes("AireAcEstacCheckbox")) {
    buenConfCheck =
      buenConfCheck +
      constantesDataSV.datosValores[0].habitosConfortTermico.utilizaAireACMeses;
  }

  if (form.buenConfortCheckbox.toString().includes("NingunoHECCheckbox")) {
    buenConfCheck =
      buenConfCheck +
      constantesDataSV.datosValores[0].habitosConfortTermico.ningunoCT;
  }

  switch (form.ventilaAmbientes) {
    case "siVentilaAmb":
      ventilaRadio =
        ventilaRadio + constantesDataSV.datosValores[0].ventilaRef.siVent;
      break;

    case "noVentilaAmb":
      ventilaRadio =
        ventilaRadio + constantesDataSV.datosValores[0].ventilaRef.noVent;
      break;
    default:
      break;
  }

  energiaYconfortTotal = habitosEnergCheck + buenConfCheck + ventilaRadio;

  return energiaYconfortTotal;
}
