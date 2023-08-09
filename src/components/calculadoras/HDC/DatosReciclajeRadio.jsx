import { CCard, CCardBody, CCardHeader, CPopover } from "@coreui/react";
import { Form, Popover, OverlayTrigger } from "react-bootstrap";
import { isMobile } from "react-device-detect";
import { useFormContext, Controller } from "react-hook-form";
import { BiTrash } from "react-icons/bi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useRef, useState } from "react";

export function DatosReciclajeRadio() {
  const methods = useFormContext();
  const refDatos = useRef(null);

  const popover = (
    <Popover id="popover-Reciclaje" className="reciclajePopover">
      <Popover.Header as="h3" className="tituloPopover">
        ¿Qué significa?
      </Popover.Header>
      <Popover.Body className="popoverBodyReciclajeAlimentacionText">
        <p className="popoverSignoPregunta">
          <p className="displayF1">
            <strong className="popoverBodyReciclajeAlimentacion">
              Nada o casi nada:{" "}
            </strong>
            No separo (o muy poco) mis residuos.
          </p>
        </p>
        <p className="displayF1">
          <strong className="popoverBodyReciclajeAlimentacion">
            Algunos residuos:{" "}
          </strong>
          Sobre todo papel y cartón.
        </p>
        <p className="displayF1">
          <strong className="popoverBodyReciclajeAlimentacion">
            Varios residuos:{" "}
          </strong>
          Papel, cartón, plástico y metales.
        </p>
        <p className="displayF1">
          <strong className="popoverBodyReciclajeAlimentacion">
            Todos mis residuos:{" "}
          </strong>
          Papel, cartón, plástico, metales y orgánico.
        </p>
      </Popover.Body>
    </Popover>
  );

  return (
    <CCard className="cardComponent" ref={refDatos}>
      <CCardHeader className="headerCardDatosReciAlim">
        <BiTrash size={75} className="iconHeader" />
        <p className="headerCardTitulo">Reciclaje</p>
        <p className="headerCardSubtitulo">
          ¿Cuál es tu nivel de separación de residuos?
        </p>
        <OverlayTrigger
          trigger="click"
          placement="auto"
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
              {...methods.register("radioReciclaje")}
              type="radio"
              className="radios"
              value="Nada o casi nada"
              label="Nada o casi nada"
              onFocus={() =>
                refDatos.current.scrollIntoView({ block: "center" })
              }
            />
            Nada o casi nada
          </label>

          <label className="displayRadios">
            <input
              {...methods.register("radioReciclaje")}
              type="radio"
              className="radios"
              value="Algunos residuos"
              label="Algunos residuos"
              onFocus={() =>
                refDatos.current.scrollIntoView({ block: "center" })
              }
            />
            Algunos residuos
          </label>
          <label className="displayRadios">
            <input
              {...methods.register("radioReciclaje")}
              type="radio"
              className="radios"
              value="Varios residuos"
              label="Varios residuos"
              onFocus={() =>
                refDatos.current.scrollIntoView({ block: "center" })
              }
            />
            Varios residuos
          </label>

          <label className="displayRadios">
            <input
              {...methods.register("radioReciclaje")}
              type="radio"
              className="radios"
              value="Todos mis residuos"
              label="Todos mis residuos"
              onFocus={() =>
                refDatos.current.scrollIntoView({ block: "center" })
              }
            />
            Todos mis residuos
          </label>
        </div>
        <span style={{ marginLeft: "25px" }}>
          {methods.formState.errors.radioReciclaje?.message}
        </span>
      </CCardBody>
    </CCard>
  );
}
