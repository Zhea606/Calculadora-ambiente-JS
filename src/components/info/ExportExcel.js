import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

const ExportExcel = async (excelDataHDC, excelDataVS) => {
  console.log("HDC", excelDataHDC);
  console.log("VS", excelDataVS);
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtensions = ".xlsx";
  const date = new Date().toLocaleDateString("es-AR").replace("/", "-");
  const ws1 = XLSX.utils.json_to_sheet(excelDataHDC);
  const ws2 = XLSX.utils.json_to_sheet(excelDataVS);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws1, "Huella de Carbono");
  XLSX.utils.book_append_sheet(wb, ws2, "Sostenibilidad Vivienda");
  const excelBuffer = XLSX.writeFile(
    wb,
    "DatosCalculadoras_" + date + fileExtensions
  );
  // const data = new Blob([excelBuffer], { type: fileType });
  // FileSaver.saveAs(data, "DatosCalculadoras_" + date + fileExtensions);
};
export default ExportExcel;
