import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { graficoComparaciones } from "./graficoComparaciones";
import { isMobile } from "react-device-detect";
import { tablaResultadosCoreUI } from "../tablas/tablaResultadosCoreUI";

ChartJS.register(ArcElement, Tooltip, Legend);

export function GraficoResultados({
  consumoElectrico,
  gasNatural,
  gasLiquido,
  Leña,
  Carbon,
  bici_pie,
  moto_auto,
  colectivo,
  avion,
  reciclajeValor,
  dietaValor,
}) {
  const combustible = parseFloat(
    (gasNatural + gasLiquido + Leña + Carbon).toFixed(2)
  );
  let electricidad = 0;
  electricidad = parseFloat(consumoElectrico.toFixed(2));
  const transporte = parseFloat((moto_auto + colectivo + avion).toFixed(2));
  // const viajeAereo = parseFloat(avion.toFixed(2));
  const residuos = parseFloat(reciclajeValor.toFixed(2));
  const alimentacion = parseFloat(dietaValor.toFixed(2));
  const sumaPrevia =
    combustible +
    electricidad +
    transporte +
    // viajeAereo +
    residuos +
    alimentacion;
  let cartTotal;
  cartTotal = sumaPrevia;
  const porcentajes = {
    combustible: parseFloat(((combustible * 100) / cartTotal).toFixed(2)),
    electricidad: parseFloat(((electricidad * 100) / cartTotal).toFixed(2)),
    transporte: parseFloat(((transporte * 100) / cartTotal).toFixed(2)),
    // viajeAereo: parseFloat(((viajeAereo * 100) / cartTotal).toFixed(2)),
    residuos: parseFloat(((residuos * 100) / cartTotal).toFixed(2)),
    alimentacion: parseFloat(((alimentacion * 100) / cartTotal).toFixed(2)),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: true,
      },
      title: {
        display: true,
        text: "Porcentajes de Huella de Carbono",
      },
    },
  };

  const data = {
    labels: [
      "Combustibles " + porcentajes.combustible + "%",
      "Electricidad " + porcentajes.electricidad + "%",
      "Transporte " + porcentajes.transporte + "%",
      // "Viajes aéreos " + porcentajes.viajeAereo + "%",
      "Residuos " + porcentajes.residuos + "%",
      "Alimentación " + porcentajes.alimentacion + "%",
    ],
    labelsSP: [
      "Combustibles",
      "Electricidad",
      "Transporte",
      "Viajes aéreos",
      "Residuos",
      "Alimentación",
    ],
    datasets: [
      {
        label: "Huella de Carbono",
        dataCP: [
          porcentajes.combustible,
          porcentajes.electricidad,
          porcentajes.transporte,
          // porcentajes.viajeAereo,
          porcentajes.residuos,
          porcentajes.alimentacion,
        ],
        data: [
          combustible,
          electricidad,
          transporte,
          // viajeAereo,
          residuos,
          alimentacion,
        ],
        backgroundColor: [
          "#D5A3FF",
          "#FFE1B0",
          "#9696FF",
          "rgb(52,168,83)",
          "#8AC7FF",
          "#F6FF7D",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const variaciones =
    cartTotal > 4.12 + 4.12 * 0.1
      ? "rgb(255,0,0)"
      : cartTotal > 4.12 - 4.12 * 0.1
      ? "rgb(255,255,0)"
      : "rgb(0,255,0)";

  return (
    <div className="CalcHDC">
      <Row className="tablaGrafico">
        <Col className="tablaGrafico">
          {tablaResultadosCoreUI(
            electricidad,
            residuos,
            alimentacion,
            transporte,
            combustible
          )}
        </Col>
        <Col className="graficoDona">
          <Doughnut className="dona" data={data} options={options} />
        </Col>
      </Row>
      <div className="cuadroGraficosCentrado">
        <Row className="graficoSudamericaROW">
          <Col className="graficoSudamericaCOL">
            <div className="graficoSudamericaCuadros">
              Tu Huella de Carbono es de: <br />
              <strong>{parseFloat(cartTotal.toFixed(2))}</strong> toneladas de dióxido de carbono equivalente.
            </div>
            <div className="graficoSudamericaCuadros">
              Para mitigar tu Huella necesitarías plantar: <br />
              <strong>
                {Math.round(parseFloat((cartTotal / 0.167).toFixed(2)))}
              </strong>{" "}
              árboles.
            </div>
          </Col>

          <Col className="graficoBarras">{graficoComparaciones(cartTotal)}</Col>
          <Col
            // style={{
            //   flex: 1,
            //   textAlign: "center",
            //   backgroundColor: "#B6D7A8",
            //   padding: 20,
            //   fontSize: "130%",
            //   borderRadius: 15,
            //   maxWidth: "20%",
            //   position: "initial",
            // }}
            className="graficoSudamericaCOL"
          >
            <div className="graficoSudamericaCuadros">
              {variaciones == "rgb(0,255,0)" ? (
                <div>
                  Excelente! Tu huella se encuentra por debajo del promedio de
                  emisiones por habitanto por año de argentina.
                  <br />
                  <strong> Animate a seguir mejorando!</strong>
                </div>
              ) : variaciones == "rgb(255,255,0)" ? (
                <div>
                  Bien! Tu huella se encuentra dentro del promedio de emisiones
                  por habitante por año de Argentina.
                  <br />
                  <strong>Sumate al desafío de reducirla!</strong>
                </div>
              ) : (
                <div>
                  Uups! Tu huella se encuentra por encima del promedio de
                  emisiones por habitante por año de Argentina.
                  <br />
                  <strong>Sumate al desafío de reducirla!</strong>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>

      <Row
        // style={{
        //   flex: 1,
        //   display: "flex",
        //   marginTop: 20,
        //   alignItems: "center",
        //   justifyContent: "center",
        // }}
        className="tablaGrafico"
      >
        <Col className="recomendacionesFinales">
          <div className="recomendacionesFinalesBody">
            ¿Sabías que la meta de emisiones al año 2050 es de 2.3 tCO2e por
            persona al año?*
            <br />
            <div className="textPequeño">
              *Meta establecida en el Acuerdo de París.
            </div>
            <br />
            Por otro lado, en el Municipio de Ciudad de Mendoza, queremos lograr
            reducir las emisiones totales un 51% al año 2030.
            <br />
            <br />
            <strong>¡Ayudanos a cumplirlo! ¡Tus acciones cuentan!</strong>
            <br />
            <br />
            ¿Sabés cómo podes reducir tu Huella de Carbono?
            <br />
            Te dejamos el manual de buenas prácticas ambientales.
            <br />
            Descargalo haciendo click{" "}
            <a
              href="https://drive.google.com/drive/folders/1q5S3av16iFkjtMFY8vi2zPgdD2oTxBmV?usp=drive_link"
              target="_blank"
            >
              acá
            </a>
          </div>
        </Col>
      </Row>
    </div>
  );
}
