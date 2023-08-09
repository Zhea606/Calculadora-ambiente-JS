import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import { isMobile } from "react-device-detect";
import "../../styles.css";
import ExportExcel from "./ExportExcel";

export function RegistrosTotales() {
  const token = import.meta.env.VITE_APITOKEN;
  const urlBK = import.meta.env.VITE_BK;
  const axiosConfig = {
    headers: {
      token: token,
      "Content-Type": "multipart/form-data",
    },
  };
  const [resultadoVacioHDC, setResultadoVacioHDC] = useState(false);
  const [resultadoVacioVS, setResultadoVacioVS] = useState(false);
  const [mensajeResponseHDC, setMensajeResponseHDC] = useState("");
  const [mensajeResponseVS, setMensajeResponseVS] = useState("");
  const [respuestaHDC, setRespuestaHDC] = useState([
    {
      correo: "",
      alimentacion: 0,
      arbolesNecesarios: 0,
      combustibles: 0,
      electricidad: 0,
      id_persona: 0,
      idhdc: 0,
      residuos: 0,
      tCO2e: 0,
      timestamp: "",
      transporte: 0,
    },
  ]);
  const [respuestaVS, setRespuestaVS] = useState([
    {
      correo: "",
      infraestructura: 0,
      energia: 0,
      confort_termico: 0,
      agua: 0,
      consumo_responsable: 0,
      energia_confort: 0,
      residuos: 0,
      habitos_agua: 0,
      id_persona: 0,
      id_viviendaSostenible: 0,
      timestamp: "",
      total: 0,
    },
  ]);

  function imprimirInfo() {
    axios
      .post(urlBK + "/api/mostrarRegistrosTotales", {}, axiosConfig)
      .then((response) => {
        if (response.data.status !== false) {
          const JSON_hdc = JSON.parse(JSON.stringify(response.data.datosHDC));
          const JSON_vs = JSON.parse(JSON.stringify(response.data.datosVS));
          ExportExcel(JSON_hdc, JSON_vs);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function traerInfoTotal() {
    axios
      .post(urlBK + "/api/mostrarRegistrosTotales", {}, axiosConfig)
      .then((response) => {
        if (response.data.status === false) {
          setMensajeResponseHDC(response.data.message);
          setMensajeResponseVS(response.data.message);
          setResultadoVacioHDC(true);
          setResultadoVacioVS(true);
        } else {
          if (
            response.data.datosHDC !== undefined &&
            response.data.datosHDC.length !== 0
          ) {
            setResultadoVacioHDC(false);
            setRespuestaHDC(response.data.datosHDC);
          } else {
            setMensajeResponseHDC(
              "No se encuentrar registros de Huella de Carbono con el correo ingresado."
            );
            setResultadoVacioHDC(true);
          }
          if (
            response.data.datosVS !== undefined &&
            response.data.datosVS.length !== 0
          ) {
            setResultadoVacioVS(false);
            setRespuestaVS(response.data.datosVS);
          } else {
            setMensajeResponseVS(
              "No se encuentrar registros de Vivienda Sostenible con el correo ingresado."
            );
            setResultadoVacioVS(true);
          }
          // const JSON_hdc = JSON.parse(JSON.stringify(response.data.datosHDC));
          // const JSON_vs = JSON.parse(JSON.stringify(response.data.datosVS));
          // ExportExcel(JSON_hdc, JSON_vs);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function registrosAnterioresHDC() {
    return respuestaHDC.map((registros, index) => {
      const variaciones =
        registros.tCO2e > 4.12 + 4.12 * 0.1
          ? "rgb(255,0,0)"
          : registros.tCO2e > 4.12 - 4.12 * 0.1
          ? "rgb(255,255,0)"
          : "rgb(0,255,0)";

      const variacionesLetra =
        registros.tCO2e > 4.12 + 4.12 * 0.1
          ? "rgb(255,255,255)"
          : registros.tCO2e > 4.12 - 4.12 * 0.1
          ? "rgb(0,0,0)"
          : "rgb(0,0,0)";
      let timestamp = registros.timestamp;
      let date = new Date(Date.parse(timestamp)).toLocaleString([], {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      return (
        <Accordion.Item eventKey={registros.idhdc.toString()} key={index}>
          <Accordion.Header>
            {date}
            <br />
            {registros.correo}
            <div
              style={{
                marginLeft: "1rem",
                marginRight: "1rem",
                backgroundColor: variaciones,
                color: variacionesLetra,
                borderRadius: 10,
                minWidth: "5%",
                width: registros.tCO2e * 100,
                maxWidth: isMobile ? "50%" : "80%",
                textAlign: "center",
                padding: isMobile ? "0.5rem" : "1rem",
                fontSize: "1.5rem",
              }}
            >
              {registros.tCO2e} tCO2e
            </div>
            <div style={{ textAlign: "center" }}>
              🌳 x {registros.arbolesNecesarios}
            </div>
          </Accordion.Header>
          <Accordion.Body style={{ fontSize: "1.5rem" }}>
            Según los datos provistos: <br />
            La electricidad usada emitió {registros.electricidad} tCO2e
            <br />
            Los combustibles utilizados en el hogar emitieron{" "}
            {registros.combustibles} tCO2e
            <br />
            Los medios de transporte utilizados emitieron {
              registros.transporte
            }{" "}
            tCO2e
            <br />
            Tu separación de residuos emitió {registros.residuos} tCO2e
            <br />
            Tu alimentación emitió {registros.alimentacion} tCO2e
            <br />
            Tu resultado fue de un total de {registros.tCO2e} tCO2e/año!
          </Accordion.Body>
        </Accordion.Item>
      );
    });
  }

  function registrosAnterioresVS() {
    return respuestaVS.map((registros, index) => {
      const variaciones =
        registros.total > 16
          ? "#1F8A70"
          : registros.total > 8
          ? "#F2CD5C"
          : "rgb(255,0,0)";

      const variacionesLetra =
        registros.total > 16 ? "#FFF" : registros.total > 8 ? "#000" : "#FFF";
      let timestamp = registros.timestamp;
      let date = new Date(Date.parse(timestamp)).toLocaleString([], {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      return (
        <Accordion.Item
          eventKey={registros.id_viviendaSostenible.toString()}
          key={index}
        >
          <Accordion.Header>
            {date}
            <br />
            {registros.correo}
            <div
              style={{
                marginLeft: "1rem",
                marginRight: "1rem",
                backgroundColor: variaciones,
                color: variacionesLetra,
                borderRadius: 10,
                minWidth: "10%",
                width: registros.total * 100,
                maxWidth: isMobile ? "50%" : "80%",
                textAlign: "center",
                padding: isMobile ? "0.5rem" : "1rem",
                fontSize: "1.5rem",
              }}
            >
              {registros.total}
            </div>
          </Accordion.Header>
          <Accordion.Body style={{ fontSize: "1.5rem" }}>
            Según los datos provistos se considera: <br />
            La sección Infraestructura registró un puntaje de{" "}
            {registros.infraestructura}
            <br />
            La sección Energia registró un puntaje de {registros.energia}
            <br />
            La sección Confort Térmico registró un puntaje de{" "}
            {registros.confort_termico}
            <br />
            La sección Agua registró un puntaje de {registros.agua}
            <br />
            La sección Consumo Responsable registró un puntaje de{" "}
            {registros.consumo_responsable}
            <br />
            La sección Energía y Confort Térmico registró un puntaje de{" "}
            {registros.energia_confort}
            <br />
            La sección Residuos registró un puntaje de {registros.residuos}
            <br />
            La sección Hábitos Agua registró un puntaje de{" "}
            {registros.habitos_agua}
            <br />
            Obteniendo un puntaje total de {registros.total}/19
          </Accordion.Body>
        </Accordion.Item>
      );
    });
  }

  useEffect(() => {
    traerInfoTotal();
  }, []);

  return (
    <div className="Registros">
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="primary"
          type="submit"
          style={{
            width: isMobile ? "90%" : "50%",
            fontSize: "1.5rem",
            marginTop: "1%",
            marginBottom: "1%",
          }}
          onClick={() => imprimirInfo()}
        >
          Descargar datos
        </Button>
      </Row>
      <Row
        style={{
          marginRight: "2.5%",
          marginLeft: "2.5%",
          display: "flex",
        }}
      >
        <Col md="6">
          <div className="tituloRegistro">Huella De Carbono</div>
          {resultadoVacioHDC ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "1.5rem",
              }}
            >
              {mensajeResponseHDC}
            </div>
          ) : (
            <Accordion
              style={{
                flex: 1,
              }}
            >
              {registrosAnterioresHDC()}
            </Accordion>
          )}
        </Col>

        <Col md="6">
          <div className="tituloRegistro">Vivienda Sostenible</div>
          {resultadoVacioVS ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "1.5rem",
              }}
            >
              {mensajeResponseVS}
            </div>
          ) : (
            <Accordion
              style={{
                flex: 1,
              }}
            >
              {registrosAnterioresVS()}
            </Accordion>
          )}
        </Col>
      </Row>
    </div>
  );
}
