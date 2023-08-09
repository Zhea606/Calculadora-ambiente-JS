import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  correo: "",
  //H.D.C.
  consumoElectrico: 0,
  gasNatural: 0,
  gasLiquido: 0,
  leña: 0,
  carbon: 0,
  bici_pie: 0,
  moto_auto: 0,
  colectivo: 0,
  avion: 0,
  reciclajeValor: 0,
  dietaValor: 0,
  //V.S.
  infraestructura: 0,
  energia: 0,
  confort: 0,
  agua: 0,
  consumoResponsable: 0,
  confort2: 0,
  residuos: 0,
  agua2: 0,

  //modal
  active: false,

  //resultados
  mostrarResultados: false,
  // validacion: false,
};

export const valueSlice = createSlice({
  name: "valueSlice",
  initialState,
  reducers: {
    recibirDatosHDC: (state, action) => {
      state.consumoElectrico = action.payload.consumoElectrico;
      state.gasNatural = action.payload.gasNatural;
      state.gasLiquido = action.payload.gasLiquido;
      state.leña = action.payload.leña;
      state.carbon = action.payload.carbon;
      state.bici_pie = action.payload.bici_pie;
      state.moto_auto = action.payload.moto_auto;
      state.colectivo = action.payload.colectivo;
      state.avion = action.payload.avion;
      state.reciclajeValor = action.payload.reciclajeValor;
      state.dietaValor = action.payload.dietaValor;
      state.correo = action.payload.correo;
    },
    recibirDatosSV: (state, action) => {
      state.infraestructura = action.payload.infraestructura;
      state.energia = action.payload.energia;
      state.confort = action.payload.confort;
      state.agua = action.payload.agua;
      state.consumoResponsable = action.payload.consumoResponsable;
      state.confort2 = action.payload.confort2;
      state.residuos = action.payload.residuos;
      state.agua2 = action.payload.agua2;
      state.correo = action.payload.correo;
    },
    mostrarModal: (state, action) => {
      state.active = action.payload;
    },
    mostrarResultados: (state, action) => {
      state.mostrarResultados = action.payload;
    },
    // esValido: (state, action) => {
    //   state.validacion = action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const {
  recibirDatosHDC,
  recibirDatosSV,
  mostrarModal,
  mostrarResultados,
  // esValido,
} = valueSlice.actions;
export const selectValueState = (state) => state.valueState;
export default valueSlice.reducer;
