//#region selects valores
const ventanas = [
  "Corrediza vidrio simple",
  "Corrediza vidrio doble",
  "Abatibles vidrio simple",
  "Abatibles vidrio doble",
];
const lamparas = [
  "Lámparas incandecentes",
  "Lámparas halógenas",
  "Lámparas fluorescentes",
  "Lámparas LED",
];
const tipoEstructHogar = [
  "Sistema de construcción tradicional con aislamiento",
  "Sistema de construcción tradicional",
  "Sistema de construcción no tradicional (seco, vivienda prefabricada)",
  "Vivienda informal",
];

const formaRiegoJardin = [
  "Riego tecnificado (aspersión, goteo)",
  "Con manguera",
  "Con regadera o botella",
  "Manto (inundación)",
];

const residuos = [
  "No separo mis residuos",
  "Separo residuos secos reciclables y húmedos",
  "Separo mis residuos en mayores categorías (Ej. papel, vidrio, orgánicos, electrónicos, etc.)",
];

//#endregion selects

//#region valores de los items

///***valores de cada item, para hacer el calculo final
const datosValores = [
  {
    ///***SECCION INFRAESTRUCTURA
    aislacionTermica: {
      techos: 0.33,
      muros: 0.34,
      piso: 0.33,
      ningunoAisT: 0,
    },
    ventanasHogar: {
      corredizaSimple: 0,
      corredizaDoble: 0.5,
      abatiblesSimple: 0.5,
      abatiblesDoble: 1,
    },
    orientacion: {
      siOR: 1,
      noOR: 0,
    },
    tipoInfraHogar: {
      construccionAislamiento: 1,
      construccionTradicional: 0.5,
      construccionNoTradicional: 0.3,
      viviendaInformal: 0,
    },

    ///***SECCION ENERGIA
    lamparas: {
      incandecentes: 0,
      halogenas: 0,
      fluorescentes: 0.25,
      led: 1,
    },
    etiquetaEf: {
      siEF: 1,
      noEF: 0,
    },
    renovables: {
      calefonSol: 0.5,
      panelesFot: 0.5,
      ninguno: 0,
    },

    ///***SECCION CONFORT TERMICO
    ingresaAir: {
      siTieneB: 1,
      noTieneB: 0,
    },
    ventanasGotean: {
      siGOT: 0,
      noGOT: 1,
    },

    ///***SECCION AGUA
    dispAhorrador: {
      grifos: 0.25,
      dobleDescarga: 0.25,
      rehusoAgua: 0.25,
      captacionLluvia: 0.25,
      ningunoDA: 0,
    },
    bajoRequerim: {
      siBR: 1,
      noBR: 0,
      noTieneJardin: 0,
    },
    regarJardin: {
      riegoTecnificado: 1,
      conManguera: 0.3,
      regaderaBotella: 1,
      manto: 0,
    },

    ///***SECCION CONSUMO RESPONSABLE
    incorporadoHab: {
      huerta: 0.167,
      bolsasTela: 0.167,
      llevarTaza: 0.167,
      productosAmigables: 0.167,
      productosSustentables: 0.166,
      productosRegionales: 0.166,
      ningunoCR: 0,
    },

    ///***SECCION HABITOS ENERGIA Y CONFORT TERMICO
    practicaHabEnerg: {
      desenchufa: 0.2,
      secarRopa: 0.2,
      apagaTermotanque: 0.2,
      apagarLuces: 0.2,
      ambientes: 0.2,
      ningunoHE: 0,
    },

    habitosConfortTermico: {
      apagaAireAC: 0.34,
      apagaEstufa: 0.33,
      utilizaAireACMeses: 0.33,
      ningunoCT: 0,
    },

    ventilaRef: {
      siVent: 1,
      noVent: 0,
    },

    ///***SECCION RESIDUOS
    separaResid: {
      noSep: 0,
      separaSecHum: 0.5,
      residuosMayor: 1,
    },
    compostRO: {
      siHace: 1,
      noHace: 0,
    },

    ///***SECCION HABITOS AGUA

    habitosConsumoAgua: {
      noDerrocha: 0.25,
      lavadoAutoBalde: 0.25,
      lavarropasCargaCompleta: 0.25,
      reparaPerdidas: 0.25,
      ningunoCA: 0,
    },
  },
];

//#endregion valores items

export default {
  ventanas,
  lamparas,
  tipoEstructHogar,
  formaRiegoJardin,
  residuos,
  datosValores,
};
