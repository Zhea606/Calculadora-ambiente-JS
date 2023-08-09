import { CCard, CCardBody, CCardHeader, CPopover } from "@coreui/react";
import { Form, Popover, OverlayTrigger } from "react-bootstrap";
import { isMobile } from "react-device-detect";
import { useFormContext, Controller } from "react-hook-form";
import { BiBowlRice } from "react-icons/bi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useRef, useState } from "react";

export function DatosAlimentacionRadio() {
  const methods = useFormContext();
  const refDatos = useRef(null);
  const popover = (
    <Popover id="popover-Reciclaje" className="alimentacionPopover">
      <Popover.Header as="h3" className="tituloPopover">
        ¿Qué significa?
      </Popover.Header>
      <Popover.Body className="popoverBodyReciclajeAlimentacionText">
        <p className="popoverSignoPregunta">
          <strong className="popoverBodyReciclajeAlimentacion">
            Muy carnívora:{" "}
          </strong>
          Consumo carne de vaca todos los días, pollo/cerdo/pescado alrededor de
          4 veces a la semana, entre otros (lácteos/huevos, cereales, frutas,
          verduras y grasas).
        </p>
        <p className="popoverSignoPregunta">
          <strong className="popoverBodyReciclajeAlimentacion">
            Carnívora:{" "}
          </strong>
          Consumo carne de vaca día por medio, pollo/cerdo alrededor de 3 veces
          a la semana, entre otros (lácteos/huevos, cereales, frutas, verduras y
          grasas).
        </p>
        <p className="popoverSignoPregunta">
          <strong className="popoverBodyReciclajeAlimentacion">
            Equilibrada:{" "}
          </strong>
          Consumo carne de vaca 1 vez a la semana, 1 vez a la semana pollo, 1
          vez a la semana cerdo, entre otros (lácteos/huevos, cereales, frutas,
          verduras y grasas).
        </p>
        <p className="popoverSignoPregunta">
          <strong className="popoverBodyReciclajeAlimentacion">
            Vegetariana:{" "}
          </strong>
          No consumo ningún tipo de carne. Consumo lácteos/huevos, entre otros
          (cereales, frutas, verduras y grasas).
        </p>
        <p className="popoverSignoPregunta">
          <strong className="popoverBodyReciclajeAlimentacion">Vegana: </strong>
          No consumo ningún tipo de carne, ni lácteos/huevos. Consumo cereales,
          frutas, verduras y grasas.
        </p>
      </Popover.Body>
    </Popover>
  );

  return (
    <CCard className="cardComponent" ref={refDatos}>
      <CCardHeader className="headerCardDatosReciAlim">
        <BiBowlRice size={75} className="iconHeader" />
        <p className="headerCardTitulo">Alimentación</p>
        <p className="headerCardSubtitulo">¿Cómo es tu alimentación semanal?</p>
        <OverlayTrigger
          trigger="click"
          placement="top"
          rootClose
          overlay={popover}
        >
          <a>
            <AiOutlineQuestionCircle
              className="popoverSignoPregunta"
              size={50}
            />
          </a>
        </OverlayTrigger>
      </CCardHeader>
      <CCardBody className="bodyCard">
        <div className="rowCheckboxes">
          <label className="displayRadios">
            <input
              {...methods.register("radioAlimentacion")}
              type="radio"
              className="radios"
              value="Muy carnívora"
              label="Muy carnívora"
              onFocus={() =>
                refDatos.current.scrollIntoView({ block: "center" })
              }
            />
            Muy carnívora
          </label>
          <label className="displayRadios">
            <input
              {...methods.register("radioAlimentacion")}
              type="radio"
              className="radios"
              value="Carnívora"
              label="Carnívora"
              onFocus={() =>
                refDatos.current.scrollIntoView({ block: "center" })
              }
            />
            Carnívora
          </label>
          <label className="displayRadios">
            <input
              {...methods.register("radioAlimentacion")}
              type="radio"
              className="radios"
              value="Equilibrada"
              label="Equilibrada"
              onFocus={() =>
                refDatos.current.scrollIntoView({ block: "center" })
              }
            />
            Equilibrada
          </label>
          <label className="displayRadios">
            <input
              {...methods.register("radioAlimentacion")}
              type="radio"
              className="radios"
              value="Vegetariana"
              label="Vegetariana"
              onFocus={() =>
                refDatos.current.scrollIntoView({ block: "center" })
              }
            />
            Vegetariana
          </label>
          <label className="displayRadios">
            <input
              {...methods.register("radioAlimentacion")}
              type="radio"
              className="radios"
              value="Vegana"
              label="Vegana"
              onFocus={() =>
                refDatos.current.scrollIntoView({ block: "center" })
              }
            />
            Vegana
          </label>
        </div>
        <span style={{ marginLeft: "25px" }}>
          {methods.formState.errors.radioAlimentacion?.message}
        </span>
      </CCardBody>
    </CCard>
  );
}
