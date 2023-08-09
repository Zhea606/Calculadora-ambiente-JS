import { CCard, CCardBody, CCardHeader } from "@coreui/react";
// import { isMobile } from "react-device-detect";
import { useFormContext } from "react-hook-form";
// import { lineaSeparacion } from "../../lineaSeparacion";
import React, { useRef, useState, useEffect } from "react";
import { BiBulb } from "react-icons/bi";
import constantesDataSV from "./constantesDataSV";

export function Energia({}) {
  const methods = useFormContext();
  const refDatosHeader = useRef(null);
  const refSeccion = useRef(null);

  //************************************* PROVISORIO: mejorar el código para deshabilitar y destildar */
  const [ningunoChecked, setNingunoChecked] = useState(false);
  const [calefonChecked, setCalefonChecked] = useState(false);
  const [panelesChecked, setPanelesChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ inf1: false });

  const verificarTodos = () => {
    let verificador = 0;
    if (ningunoChecked) {
      verificador++;
    } else if (calefonChecked) {
      verificador++;
    } else if (panelesChecked) {
      verificador++;
    }
    if (verificador === 0) {
      setErrorMessage({ ...errorMessage, inf1: true });
    } else {
      setErrorMessage({ ...errorMessage, inf1: false });
    }
  };
  useEffect(() => {
    verificarTodos();
  }, [ningunoChecked, calefonChecked, panelesChecked]);

  const handleNingunoChange = (event) => {
    const isChecked = event.target.checked;
    setNingunoChecked(isChecked);
    if (isChecked) {
      // Desmarcar los demás checkboxes
      setCalefonChecked(false);
      setPanelesChecked(false);
    }
  };

  const handleCalefonChange = (event) => {
    const isChecked = event.target.checked;
    setCalefonChecked(isChecked);

    if (isChecked) {
      // Desmarcar el checkbox de "Ninguno"
      setNingunoChecked(false);
    }
  };

  const handlePanelesChange = (event) => {
    const isChecked = event.target.checked;
    setPanelesChecked(isChecked);

    if (isChecked) {
      // Desmarcar el checkbox de "Ninguno"
      setNingunoChecked(false);
    }
  };

  /*************************************************************************** */

  return (
    <CCard className="cardComponent">
      <CCardHeader className="headerCardDatosElecCombTransp" ref={refSeccion}>
        <BiBulb size={75} className="iconHeader" />
        <p className="headerCardTitulo">ENERGÍA</p>
      </CCardHeader>
      <CCardBody
        className="bodyCardTransporte"
        style={{ flexDirection: "column" }}
      >
        <p className="question-tittle">
          1) ¿Qué tipo de lámparas tenés en tu hogar?
        </p>
        <div className="selectSV ">
          <select
            {...methods.register("lamparasTipo")}
            onFocus={() =>
              refSeccion.current.scrollIntoView({ block: "start" })
            }
            name="lamparasTipo"
            type="select"
            size={0}
            className="inputTypeCardMax"
          >
            <option value={""}>Selecciona una opción</option>
            {constantesDataSV.lamparas.map((lamparasTipo, key) => (
              <option value={lamparasTipo} key={key}>
                {lamparasTipo}
              </option>
            ))}
          </select>
        </div>
        <span>{methods.formState.errors.lamparasTipo?.message}</span>
      </CCardBody>
      <CCardBody
        className="bodyCardTransporte"
        style={{ flexDirection: "column" }}
      >
        <p className="question-tittle">
          2) A la hora de comprar aparatos eléctricos o electrónicos ¿considerás
          la etiqueta de eficiencia energética?
        </p>
        <div
          style={{
            display: "flex",
            marginTop: "25px",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <label>
            <input
              {...methods.register("consideraEficiencia")}
              type="radio"
              className="radios"
              value="siConsideraEfic"
              label="SI"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
            />
            SI
          </label>
          <label>
            <input
              {...methods.register("consideraEficiencia")}
              type="radio"
              className="radios"
              value="noConsideraEfic"
              label="NO"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
            />
            NO
          </label>
        </div>
        <span style={{ marginLeft: "25px" }}>
          {methods.formState.errors.consideraEficiencia?.message}
        </span>
      </CCardBody>
      <CCardBody
        className="bodyCardTransporte"
        style={{ flexDirection: "column" }}
      >
        <p className="question-tittle">
          3) ¿Tenés algúno de los sistemas de energías renovables? Podés marcar
          más de una opción.
        </p>
        <div className="checkSV">
          <label style={{ display: "flex" }}>
            <input
              {...methods.register("energiasRenovCheckbox")}
              type="checkbox"
              className="checkboxes"
              label="Calefón solar"
              value="CalefonSolarCheckbox"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
              checked={calefonChecked}
              onChange={handleCalefonChange}
              disabled={ningunoChecked}
            />
            Calefón solar
          </label>
          <label style={{ display: "flex" }}>
            <input
              {...methods.register("energiasRenovCheckbox")}
              type="checkbox"
              className="checkboxes"
              label="Paneles fotovoltaicos"
              value="PanelesCheckbox"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
              checked={panelesChecked}
              onChange={handlePanelesChange}
              disabled={ningunoChecked}
            />
            Paneles fotovoltaicos
          </label>
          <label style={{ display: "flex" }}>
            <input
              {...methods.register("energiasRenovCheckbox")}
              type="checkbox"
              className="checkboxes"
              label="Ninguno"
              value="NingunoERCheckbox"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
              checked={ningunoChecked}
              onChange={handleNingunoChange}
            />
            Ninguno
          </label>
        </div>
        {errorMessage.inf1 && (
          <span key={JSON.stringify("a" + errorMessage.inf1)}>
            {methods.formState.errors.energiasRenovCheckbox?.message}
          </span>
        )}
      </CCardBody>
    </CCard>
  );
}
