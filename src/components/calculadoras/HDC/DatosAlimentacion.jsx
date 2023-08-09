import { CCard, CCardBody, CCardHeader, CPopover } from "@coreui/react";
import { Form, Popover, OverlayTrigger } from "react-bootstrap";
import { isMobile } from "react-device-detect";
import { useFormContext, Controller } from "react-hook-form";
import { BiBowlRice } from "react-icons/bi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useRef, useState } from "react";

export function DatosAlimentacion() {
  const methods = useFormContext();
  const [tipoAlimentacion, setTipoAlimentacion] = useState({
    MCarnivora: false,
    Carnivora: false,
    Equilibrada: false,
    Vegetariana: false,
    Vegana: false,
  });
  const alimentacionElegida =
    tipoAlimentacion.MCarnivora ||
    tipoAlimentacion.Carnivora ||
    tipoAlimentacion.Equilibrada ||
    tipoAlimentacion.Vegetariana ||
    tipoAlimentacion.Vegana;
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
              {...methods.register("AlimentacionMCarnivora")}
              defaultChecked={false}
              disabled={alimentacionElegida && !tipoAlimentacion.MCarnivora}
              className="checkboxes"
              type="checkbox"
              id="AlimentacionMCarnivora"
              name="AlimentacionMCarnivora"
              label="Muy carnívora"
              onChange={() => [
                setTipoAlimentacion({
                  ...tipoAlimentacion,
                  MCarnivora: !tipoAlimentacion.MCarnivora,
                }),
              ]}
              onFocus={() =>
                refDatos.current.scrollIntoView({ block: "center" })
              }
            />
            Muy carnívora
          </label>
          <label className="displayF1">
            <input
              {...methods.register("AlimentacionCarnivora")}
              className="checkboxes"
              type="checkbox"
              disabled={alimentacionElegida && !tipoAlimentacion.Carnivora}
              id="AlimentacionCarnivora"
              name="AlimentacionCarnivora"
              label="Carnivora"
              onClick={() => [
                setTipoAlimentacion({
                  ...tipoAlimentacion,
                  Carnivora: !tipoAlimentacion.Carnivora,
                }),
              ]}
              onFocus={() =>
                refDatos.current.scrollIntoView({ block: "center" })
              }
            />
            Carnívora
          </label>
          <label className="displayF1">
            <input
              {...methods.register("AlimentacionEquilibrada")}
              className="checkboxes"
              type="checkbox"
              disabled={alimentacionElegida && !tipoAlimentacion.Equilibrada}
              id="AlimentacionEquilibrada"
              name="AlimentacionEquilibrada"
              label="Equilibrada"
              onClick={() => [
                setTipoAlimentacion({
                  ...tipoAlimentacion,
                  Equilibrada: !tipoAlimentacion.Equilibrada,
                }),
              ]}
              onFocus={() =>
                refDatos.current.scrollIntoView({ block: "center" })
              }
            />
            Equilibrada
          </label>
          <label className="displayF1">
            <input
              {...methods.register("AlimentacionVegetariana")}
              disabled={alimentacionElegida && !tipoAlimentacion.Vegetariana}
              className="checkboxes"
              type="checkbox"
              id="AlimentacionVegetariana"
              name="AlimentacionVegetariana"
              label="Vegetariana"
              onClick={() => [
                setTipoAlimentacion({
                  ...tipoAlimentacion,
                  Vegetariana: !tipoAlimentacion.Vegetariana,
                }),
              ]}
              onFocus={() =>
                refDatos.current.scrollIntoView({ block: "center" })
              }
            />
            Vegetariana
          </label>
          <label className="displayF1">
            <input
              {...methods.register("AlimentacionVegana")}
              className="checkboxes"
              type="checkbox"
              disabled={alimentacionElegida && !tipoAlimentacion.Vegana}
              id="AlimentacionVegana"
              name="AlimentacionVegana"
              label="Vegana"
              onClick={() => [
                setTipoAlimentacion({
                  ...tipoAlimentacion,
                  Vegana: !tipoAlimentacion.Vegana,
                }),
              ]}
              onFocus={() =>
                refDatos.current.scrollIntoView({ block: "center" })
              }
            />
            Vegana
          </label>
        </div>
      </CCardBody>
    </CCard>
  );
}
