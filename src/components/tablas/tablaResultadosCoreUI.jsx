import { CTable } from "@coreui/react";

export function tablaResultadosCoreUI(
  electricidad,
  residuos,
  alimentacion,
  transporte,
  combustibles
) {
  const columns = [
    {
      key: "HDC",
      label: "Huella de Carbono",
      _props: {
        scope: "col",
        style: {
          fontFamily: "TitilliumBold",
          fontSize: "1.1rem",
          textAlign: "center",
        },
      },
    },

    {
      key: "ValortCO2e",
      label: "Valor en tCO2e",
      _props: {
        scope: "col",
        style: {
          fontFamily: "TitilliumBold",
          fontSize: "1.1rem",
          textAlign: "center",
        },
      },
    },
  ];
  const items = [
    {
      HDC: "Electricidad",
      ValortCO2e: electricidad + " tCO2e",
      _cellProps: { id: { scope: "row" } },
      _props: {
        style: {
          fontFamily: "TitilliumRegular",
          fontSize: ".9rem",
          textAlign: "center",
        },
      },
    },
    {
      HDC: "Combustibles",
      ValortCO2e: combustibles + " tCO2e",
      _cellProps: { id: { scope: "row" } },
      _props: {
        style: {
          fontFamily: "TitilliumRegular",
          fontSize: ".9rem",
          textAlign: "center",
        },
      },
    },
    {
      HDC: "Transporte",
      ValortCO2e: transporte + " tCO2e",
      _cellProps: { id: { scope: "row" } },
      _props: {
        style: {
          fontFamily: "TitilliumRegular",
          fontSize: ".9rem",
          textAlign: "center",
        },
      },
    },
    {
      HDC: "Residuos",
      ValortCO2e: residuos + " tCO2e",
      _cellProps: { id: { scope: "row" } },
      _props: {
        style: {
          fontFamily: "TitilliumRegular",
          fontSize: ".9rem",
          textAlign: "center",
        },
      },
    },
    {
      HDC: "Alimentación",
      ValortCO2e: alimentacion + " tCO2e",
      _cellProps: { id: { scope: "row" } },
      _props: {
        style: {
          fontFamily: "TitilliumRegular",
          fontSize: ".9rem",
          textAlign: "center",
        },
      },
    },
  ];
  return (
    <CTable
      columns={columns}
      items={items}
      bordered
      align="middle"
      style={{ flex: 1 }}
      className=""
    />
  );
}
