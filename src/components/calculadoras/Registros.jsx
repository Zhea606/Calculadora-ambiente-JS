import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import { isMobile } from "react-device-detect";
import "../../styles.css";

export function Registros() {
  const token = import.meta.env.VITE_APITOKEN;
  const urlBK = import.meta.env.VITE_BK;
  const axiosConfig = {
    headers: {
      token: token,
      "Content-Type": "multipart/form-data",
    },
  };
  const [correo, setCorreo] = useState("");
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [mostrarResultadosHDC, setMostrarResultadosHDC] = useState(false);
  const [mostrarResultadosVS, setMostrarResultadosVS] = useState(false);
  const [resultadoVacioHDC, setResultadoVacioHDC] = useState(false);
  const [resultadoVacioVS, setResultadoVacioVS] = useState(false);
  const [mensajeResponseHDC, setMensajeResponseHDC] = useState("");
  const [mensajeResponseVS, setMensajeResponseVS] = useState("");
  const [respuestaHDC, setRespuestaHDC] = useState([
    {
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
  function traerInfo(correo, datossv, datoshdc) {
    axios
      .post(
        urlBK + "/api/mostrarRegistros",
        {
          correo: correo,
          tiposv: datossv,
          tipohdc: datoshdc,
        },
        axiosConfig
      )
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
            // setMostrarResultadosHDC(false);
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
            // setMostrarResultadosVS(false);
            setResultadoVacioVS(true);
          }
        }
        setMostrarResultados(true);
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
            <div
              style={{
                backgroundColor: variaciones,
                color: variacionesLetra,
                width: registros.total * 100,
              }}
              className="itemsRegistro"
            >
              {registros.tCO2e} tCO2e
            </div>
            <div style={{ textAlign: "center" }}>
              🌳 x {registros.arbolesNecesarios}
            </div>
          </Accordion.Header>
          <Accordion.Body className="accordionStyle">
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
            <div
              style={{
                backgroundColor: variaciones,
                color: variacionesLetra,
                width: registros.total * 100,
              }}
              className="itemsRegistro"
            >
              {registros.total}
            </div>
          </Accordion.Header>
          <Accordion.Body className="accordionStyle">
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

  function handleSumbit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      traerInfo(form.correo.value, form.VS.checked, form.HDC.checked);
    }
    setValidacion(true);
    return;
  }

  const [validacion, setValidacion] = useState(false);

  const [unCheckbox, setUnCheckbox] = useState([""]);
  const [checked, setChecked] = useState(false);
  function checkear(name) {
    unCheckbox.includes("")
      ? unCheckbox.splice(unCheckbox.indexOf(""), 1)
      : null;

    unCheckbox.includes(name)
      ? unCheckbox.splice(unCheckbox.indexOf(name), 1)
      : unCheckbox.push(name);

    setChecked(unCheckbox.length > 0);
  }

  return (
    <div className="Registros">
      <Form onSubmit={handleSumbit} noValidate validated={validacion}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "justify",
                  fontSize: "1.5rem",
                  marginTop: "4%",
                }}
              >
                Correo para realizar la búsqueda
              </Form.Label>
              <Form.Text
                muted
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  marginBottom: "1%",
                  marginLeft: "1rem",
                  marginRight: "1rem",
                }}
              >
                Tenga en cuenta que solo mostraremos los últimos 10 cálculos que
                realice. <br /> Si realiza cambios en el correo o la selección
                vuelva a hacer click en "Mostrar registros anteriores" para
                refrescar la información
              </Form.Text>
              <Form.Control
                className="correoRegistro"
                type="email"
                placeholder="Correo"
                name="correo"
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
              <Form.Control.Feedback
                type="invalid"
                style={{
                  marginLeft: isMobile ? "1rem" : "25.5%",
                  textAlign: "justify",
                  marginBottom: "1%",
                }}
              >
                Debe ingresar su correo
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="checkboxesRegistro">
          <h4
            style={{
              textAlign: "center",
              color: "red",
              fontSize: "90%",
            }}
            hidden={!validacion || checked}
          >
            Debe seleccionar al menos una opción
          </h4>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicCheckboxRegiHDC">
              <Form.Check
                name="HDC"
                type="checkbox"
                required={!checked}
                label="Huella de Carbono"
                inline
                onChange={() => [
                  checkear("HDC"),
                  setMostrarResultadosHDC(!mostrarResultadosHDC),
                ]}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicCheckboxRegiVS">
              <Form.Check
                name="VS"
                type="checkbox"
                required={!checked}
                label="Vivienda Sostenible"
                inline
                onChange={() => [
                  checkear("VS"),
                  setMostrarResultadosVS(!mostrarResultadosVS),
                ]}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="primary"
            type="submit"
            // style={{
            //   width: isMobile ? "90%" : "50%",
            //   fontSize: "1.5rem",
            //   marginBottom: "3%",
            // }}
            className="mostrarRegistroBtn"
          >
            Mostrar registros anteriores
          </Button>
        </Row>
      </Form>
      <Row
        hidden={!mostrarResultados}
        style={{ width: "90%", marginLeft: "5%" }}
      >
        <Col hidden={!mostrarResultadosHDC}>
          <header className="tituloRegistro">Huella De Carbono</header>
          {resultadoVacioHDC ? (
            <div className="huellaCarbReg">{mensajeResponseHDC}</div>
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

        <Col hidden={!mostrarResultadosVS}>
          <div className="tituloRegistro">Vivienda Sostenible</div>
          {resultadoVacioVS ? (
            <div className="huellaCarbReg">{mensajeResponseVS}</div>
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
