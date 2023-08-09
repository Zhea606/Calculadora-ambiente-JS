import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: false,
    },
    title: {
      display: true,
      text: "Comparación de la Huella de Carbono (Sudamérica) (tCO2e/año)/promedio persona",
    },
  },
};

export function graficoComparaciones(cartTotal) {
  let arrayLabel = [
    "Argentina",
    "Bolivia",
    "Brasil",
    "Chile",
    "Colombia",
    "Ecuador",
    "Guyana",
    "Paraguay",
    "Perú",
    "Surinam",
    "Uruguay",
    "Venezuela",
    "Vos",
  ];

  let arrayData = [
    4.12,
    1.92,
    2.28,
    4.61,
    1.53,
    2.34,
    3.65,
    1.24,
    1.64,
    4.64,
    1.94,
    3.12,
    parseFloat(cartTotal.toFixed(2)),
  ];

  let arrayColor = [
    "rgb(234,67,53, 0.2)",
    "rgb(521,188,4, 0.2)",
    "rgb(255,109,1, 0.2)",
    "rgb(234,67,53, 0.2)",
    "rgb(52,168,83, 0.2)",
    "rgb(255,109,1, 0.2)",
    "rgb(255,109,1, 0.2)",
    "rgb(52,168,83, 0.2)",
    "rgb(521,188,4, 0.2)",
    "rgb(234,67,53, 0.2)",
    "rgb(521,188,4, 0.2)",
    "rgb(255,109,1, 0.2)",
    cartTotal > 4.12 + 4.12 * 0.1
      ? "rgb(255,0,0)"
      : cartTotal > 4.12 - 4.12 * 0.1
      ? "rgb(255,255,0)"
      : "rgb(0,255,0)",
  ];

  let arrayBoderColor = [
    "rgb(234,67,53)",
    "rgb(521,188,4)",
    "rgb(255,109,1)",
    "rgb(234,67,53)",
    "rgb(52,168,83)",
    "rgb(255,109,1)",
    "rgb(255,109,1)",
    "rgb(52,168,83)",
    "rgb(521,188,4)",
    "rgb(234,67,53)",
    "rgb(521,188,4)",
    "rgb(255,109,1)",
    "rgb(100,100,100)",
  ];
  let arrayOfObj = arrayLabel.map(function (d, i) {
    return {
      label: d,
      data: arrayData[i] || 0,
      color: arrayColor[i],
      borderColor: arrayBoderColor[i],
    };
  });

  let sortedArrayOfObj = arrayOfObj.sort(function (a, b) {
    return b.data - a.data;
  });

  let newArrayLabel = [];
  let newArrayData = [];
  let newArrayColor = [];
  let newArrayBorderColor = [];
  sortedArrayOfObj.forEach(function (d) {
    newArrayLabel.push(d.label);
    newArrayData.push(d.data);
    newArrayColor.push(d.color);
    newArrayBorderColor.push(d.borderColor);
  });

  const dataPaises = {
    labels: newArrayLabel,
    datasets: [
      {
        label: "tCO2e/año",
        data: newArrayData,
        backgroundColor: newArrayColor,
        borderColor: newArrayBorderColor,
        borderWidth: 1,
      },
    ],
  };

  return (
    <Bar
      data={dataPaises}
      options={options}
      style={{
        backgroundColor: "rgb(255,255,255, 0.7)",
        flex: 1,
        width: "45rem",
      }}
    />
  );
}
