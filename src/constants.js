const localidades = [
  "General Alvear",
  "Godoy Cruz",
  "Guaymallén",
  "Junín",
  "La Paz",
  "Las Heras",
  "Luján de Cuyo",
  "Lavalle",
  "Maipú",
  "Malargüe",
  "Mendoza Capital",
  "Rivadavia",
  "San Martín",
  "San Rafael",
  "Santa Rosa",
  "Tunuyán",
  "Tupungato",
  "San Carlos",
];
const secciones = [
  "1.ª Sección Parque Central",
  "2.ª Sección Barrio Cívico",
  "3.ª Sección Parque O'Higgins",
  "4.ª Sección Área Fundacional",
  "5.ª Sección Residencial Sur",
  "6.ª Sección Residencial Norte",
  "7.ª Sección Residencial Parque",
  "8.ª Sección Aeroparque",
  "9.ª Sección Parque General San Martín",
  "10.ª Sección Residencial Los Cerros",
  "11.ª Sección San Agustín",
  "12.ª Sección Piedemonte",
];
const bimensual0_6 = ["Enero-Febrero", "Marzo-Abril", "Mayo-Junio"];
const bimensual7_12 = [
  "Julio-Agosto",
  "Septiembre-Octubre",
  "Noviembre-Diciembre",
];
const bimensual12 = [
  "Enero-Febrero",
  "Marzo-Abril",
  "Mayo-Junio",
  "Julio-Agosto",
  "Septiembre-Octubre",
  "Noviembre-Diciembre",
];
const factorEmisionCombustibleHogar = {
  GN: 0.01936,
  GL: 2.9846,
  LEÑA: 1.7472,
  CARBON: 2.4406,
};
const combustibleVehiculo = ["Eléctrico", "Gasoil", "GNC", "Nafta"];
const factorEmisionCombustibleVehiculo = {
  GASOIL: 2.6924235,
  NAFTA: 2.2229,
  GNC: 0.0019,
  ELECTRICIDAD: 0.000277,
  AEROKEROSEN: 2.54,
};
const tipoVehiculo = {
  GASOIL: "Auto Chico",
  NAFTA: "Auto familiar-mediano",
  GNC: "SUV",
  ELECTRICIDAD: "Pick Up, Utilitario, Auto Eléctrico",
};
const factorEmisionElectricidad = 0.000277;
const factorEmisionReciclaje = {
  Nada: 1,
  Algo: 0.9,
  Separo_algunos: 0.75,
  Separo_todo: 0.4,
};
const factorEmisionDieta = {
  MuyCarnivoro: 3.3,
  Carnivoro: 2.5,
  Equilibrada: 1.9,
  Vegetariano: 1.7,
  Vegano: 1.5,
};
const densidad = 0.81,
  ocupacion = 0.9,
  capacidad = 125.32,
  cruise = 3.09,
  lto = 802.3,
  kg_hab_dia = 0.9,
  kgCO2_kgresiduos = 1.54;
export default {
  bimensual0_6,
  bimensual7_12,
  bimensual12,
  capacidad,
  combustibleVehiculo,
  cruise,
  densidad,
  factorEmisionCombustibleHogar,
  factorEmisionCombustibleVehiculo,
  factorEmisionDieta,
  factorEmisionElectricidad,
  factorEmisionReciclaje,
  kgCO2_kgresiduos,
  kg_hab_dia,
  localidades,
  lto,
  ocupacion,
  secciones,
  tipoVehiculo,
};
