import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import { Popover, OverlayTrigger } from "react-bootstrap";
import { isMobile } from "react-device-detect";
import { useFormContext } from "react-hook-form";
import { BiBulb } from "react-icons/bi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import React from "react";
//import { FaRegChartBar } from "react-icons/fa";
import constantes from "../../../constants";
import { useRef } from "react";
import barra from "../../../assets/graficoBarras.png";
import barraFact from "../../../assets/visualizacionkWh.png";

export function DatosElectricidad() {
  const methods = useFormContext();
  const refDatos = useRef(null);
  const popover = (
    <Popover id="popover-electricidad" className="electricidadPopover">
      <Popover.Header as="h3" className="tituloPopover">
        ¿De dónde obtengo el consumo de electricidad?
      </Popover.Header>
      <Popover.Body className="popoverBodyElectricidad">
        <img src={barraFact} className="imgBarra" />
        {/* <img src={barra} className="imgBarra" /> */}
        {/* <FaRegChartBar className="chartElectricidad" size={150} /> */}
        {/* <p className="popoverBodyElectricidad">
          En tu boleta de electricidad, podes encontrar este cuadro con la
          información necesaria
        </p> */}
      </Popover.Body>
    </Popover>
  );
  return (
    <CCard className="cardComponent" ref={refDatos}>
      <CCardHeader className="headerCardDatosElecCombTransp">
        <BiBulb size={75} className="iconHeader" />
        <p className="headerCardTitulo">Consumo Eléctrico</p>
        <p className="headerCardSubtitulo">
          Indicá el consumo de electricidad bimensual de tu vivienda en kWh
          (solo del año anterior)
        </p>
        <OverlayTrigger
          trigger="click"
          placement="auto" //antes estaba left
          rootClose
          overlay={popover}
        >
          <a>
            <AiOutlineQuestionCircle
              className="popoverSignoPregunta"
              size={51}
            />
          </a>
        </OverlayTrigger>
      </CCardHeader>
      <CCardBody className="bodyCard">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "5px 5px",
            alignItems: "center",
          }}
        >
          {constantes.bimensual12.map((periodo, key) => (
            <input
              {...methods.register("Electricidad" + (key + 1))}
              required
              type="number"
              step="0.01"
              min={0}
              key={key + 1}
              name={"Electricidad" + (key + 1)}
              placeholder={"Período " + periodo}
              className="inputTypeCard periodoInputs"
              onFocus={() =>
                refDatos.current.scrollIntoView({ block: "center" })
              }
            />
          ))}
        </div>
        {/* <div className="displayF1">
          {constantes.bimensual0_6.map((periodo, key) => (
            <div
              style={{ display: "flex", flexDirection: "column", flex: 1 }}
              key={key}
            >
              <input
                {...methods.register("Electricidad" + (key + 1))}
                required
                type={isMobile ? "number" : "text"}
                step="0.01"
                min={0}
                key={key + 1}
                name={"Electricidad" + (key + 1)}
                placeholder={"Período " + periodo}
                className="inputTypeCard"
                onFocus={() =>
                  refDatos.current.scrollIntoView({ block: "center" })
                }
              />
            </div>
          ))}
        </div>
        <div className="displayF1">
          {constantes.bimensual7_12.map((periodo, key) => (
            <div
              style={{ display: "flex", flexDirection: "column", flex: 1 }}
              key={key}
            >
              <input
                {...methods.register("Electricidad" + (key + 4))}
                required
                type={isMobile ? "number" : "text"}
                step="0.01"
                min={0}
                key={key + 4}
                name={"Electricidad" + (key + 4)}
                placeholder={"Período " + periodo}
                onFocus={() =>
                  refDatos.current.scrollIntoView({ block: "center" })
                }
                className="inputTypeCard"
              />
            </div>
          ))}
        </div> */}

        <span>
          {(methods.formState.errors.Electricidad1 ||
            methods.formState.errors.Electricidad2 ||
            methods.formState.errors.Electricidad3 ||
            methods.formState.errors.Electricidad4 ||
            methods.formState.errors.Electricidad5 ||
            methods.formState.errors.Electricidad6) &&
            "Es necesario que ingreses un valor para cada período."}
          {/* {methods.formState.errors.Electricidad1?.message} */}
        </span>
      </CCardBody>
    </CCard>
  );
}
