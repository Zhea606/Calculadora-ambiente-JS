import { CCard, CCardBody, CCardHeader, CPopover } from "@coreui/react";
import { Form, Popover, OverlayTrigger } from "react-bootstrap";
import { isMobile } from "react-device-detect";
import { useFormContext, Controller } from "react-hook-form";
import { BiTrash } from "react-icons/bi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useRef, useState } from "react";

export function DatosReciclaje() {
  const methods = useFormContext();
  const [tipoReciclaje, setTipoReciclaje] = useState({
    Nada: false,
    Alguno: false,
    Varios: false,
    Todos: false,
  });
  const residuoElegido =
    tipoReciclaje.Nada ||
    tipoReciclaje.Alguno ||
    tipoReciclaje.Varios ||
    tipoReciclaje.Todos;

  const refDatos = useRef(null);

  const popover = (
    <Popover id="popover-Reciclaje" className="reciclajePopover">
      <Popover.Header as="h3" className="tituloPopover">
        ¿Qué significa?
      </Popover.Header>
      <Popover.Body className="popoverBodyReciclajeAlimentacionText">
        <p className="popoverSignoPregunta">
          <strong className="popoverBodyReciclajeAlimentacion">
            Nada o casi nada:{" "}
          </strong>
          No separo (o muy poco) mis residuos.
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
          placement="left"
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
        <div className="displayF1W">
          <label className="displayF1">
            <input
              {...methods.register("ReciclajeNada")}
              disabled={residuoElegido && !tipoReciclaje.Nada}
              type="checkbox"
              id="ReciclajeNadaRadio"
              className="checkboxes"
              name="ReciclajeNada"
              label="Nada o casi nada"
              onChange={() => [
                setTipoReciclaje({
                  ...tipoReciclaje,
                  Nada: !tipoReciclaje.Nada,
                }),
              ]}
              onFocus={() =>
                refDatos.current.scrollIntoView({ block: "center" })
              }
            />
            Nada o casi nada
          </label>

          <label className="displayF1">
            <input
              {...methods.register("ReciclajeAlguno")}
              disabled={residuoElegido && !tipoReciclaje.Alguno}
              type="checkbox"
              className="checkboxes"
              id="ReciclajeAlgunoRadio"
              name="ReciclajeAlguno"
              label="Algunos residuos"
              onChange={() => [
                setTipoReciclaje({
                  ...tipoReciclaje,
                  Alguno: !tipoReciclaje.Alguno,
                }),
              ]}
              onFocus={() =>
                refDatos.current.scrollIntoView({ block: "center" })
              }
            />
            Algunos residuos
          </label>
          <label className="displayF1">
            <input
              {...methods.register("ReciclajeVarios")}
              disabled={residuoElegido && !tipoReciclaje.Varios}
              type="checkbox"
              className="checkboxes"
              id="ReciclajeVariosRadio"
              name="ReciclajeVarios"
              label="Varios residuos"
              onChange={() => [
                setTipoReciclaje({
                  ...tipoReciclaje,
                  Varios: !tipoReciclaje.Varios,
                }),
              ]}
              onFocus={() =>
                refDatos.current.scrollIntoView({ block: "center" })
              }
            />
            Varios residuos
          </label>
          <label className="displayF1">
            <input
              {...methods.register("ReciclajeTodos")}
              disabled={residuoElegido && !tipoReciclaje.Todos}
              type="checkbox"
              className="checkboxes"
              id="ReciclajeTodosRadio"
              name="ReciclajeTodos"
              label="Todos mis residuos"
              onChange={() => [
                setTipoReciclaje({
                  ...tipoReciclaje,
                  Todos: !tipoReciclaje.Todos,
                }),
              ]}
              onFocus={() =>
                refDatos.current.scrollIntoView({ block: "center" })
              }
            />
            Todos mis residuos
          </label>
        </div>
      </CCardBody>
    </CCard>
  );
}
