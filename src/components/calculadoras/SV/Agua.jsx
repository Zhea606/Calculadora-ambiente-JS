import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import { useFormContext } from "react-hook-form";
import React, { useRef, useState, useEffect } from "react";
import { BiWater } from "react-icons/bi";
import constantesDataSV from "./constantesDataSV";

export function Agua() {
  const methods = useFormContext();
  const refDatosHeader = useRef(null);
  const refSeccion = useRef(null);

  //************************************* PROVISORIO: mejorar el código para deshabilitar y destildar */
  const [ningunoChecked, setNingunoChecked] = useState(false);
  const [grifoChecked, setGrifoChecked] = useState(false);
  const [dobleDescChecked, setDobleDesChecked] = useState(false);
  const [reusoAguaChecked, setReusoAguaChecked] = useState(false);
  const [captacionAguaChecked, setCaptacionAguaChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ inf1: false });

  const verificarTodos = () => {
    let verificador = 0;
    if (ningunoChecked) {
      verificador++;
    } else if (grifoChecked) {
      verificador++;
    } else if (dobleDescChecked) {
      verificador++;
    } else if (reusoAguaChecked) {
      verificador++;
    } else if (captacionAguaChecked) {
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
  }, [
    ningunoChecked,
    grifoChecked,
    dobleDescChecked,
    reusoAguaChecked,
    captacionAguaChecked,
  ]);

  const handleNingunoChange = (event) => {
    const isChecked = event.target.checked;
    setNingunoChecked(isChecked);
    if (isChecked) {
      // Desmarcar los demás checkboxes
      setGrifoChecked(false);
      setDobleDesChecked(false);
      setReusoAguaChecked(false);
      setCaptacionAguaChecked(false);
    }
  };

  const handleGrifoChange = (event) => {
    const isChecked = event.target.checked;
    setGrifoChecked(isChecked);

    if (isChecked) {
      // Desmarcar el checkbox de "Ninguno"
      setNingunoChecked(false);
    }
  };

  const handleDobleDesChange = (event) => {
    const isChecked = event.target.checked;
    setDobleDesChecked(isChecked);

    if (isChecked) {
      // Desmarcar el checkbox de "Ninguno"
      setNingunoChecked(false);
    }
  };

  const handleReusoAgChange = (event) => {
    const isChecked = event.target.checked;
    setReusoAguaChecked(isChecked);
    if (isChecked) {
      // Desmarcar el checkbox de "Ninguno"
      setNingunoChecked(false);
    }
  };

  const handleCaptacionAgAgChange = (event) => {
    const isChecked = event.target.checked;
    setCaptacionAguaChecked(isChecked);
    if (isChecked) {
      // Desmarcar el checkbox de "Ninguno"
      setNingunoChecked(false);
    }
  };

  /************************************************************************ */

  return (
    <CCard className="cardComponent">
      <CCardHeader className="headerCardDatosElecCombTransp" ref={refSeccion}>
        <BiWater size={75} className="iconHeader" />
        <p className="headerCardTitulo">AGUA</p>
      </CCardHeader>
      <CCardBody
        className="bodyCardTransporte"
        style={{ flexDirection: "column" }}
      >
        <p className="question-tittle">
          1) ¿Tenés algún dispositivo ahorrador de agua en tu hogar? <br />
        </p>
        <div className="checkSV-agua ">
          <label
            className="displayAgua"
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            <input
              {...methods.register("dispAhorradorAguaCheckbox")}
              type="checkbox"
              className="checkboxes-agua"
              label="Grifos reguladores de flujo (aireador o rociador) o con temporizadores"
              value="GrifosCheckbox"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
              checked={grifoChecked}
              onChange={handleGrifoChange}
              disabled={ningunoChecked}
            />
            Grifos reguladores de flujo (aireador o rociador) o con
            temporizadores
          </label>
          <label
            className="displayAgua"
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            <input
              {...methods.register("dispAhorradorAguaCheckbox")}
              type="checkbox"
              className="checkboxes-agua "
              label="Mecanismo/boton de doble descarga en inodoros"
              value="DobleDescargaCheckbox"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
              checked={dobleDescChecked}
              onChange={handleDobleDesChange}
              disabled={ningunoChecked}
              // style={{ flexBasis: "2rem" }}
            />
            Mecanismo/boton de doble descarga en inodoros
          </label>
          <label className="displayAgua" style={{ display: "flex" }}>
            <input
              {...methods.register("dispAhorradorAguaCheckbox")}
              type="checkbox"
              className="checkboxes-agua "
              label="Mecanismo de reúso de agua"
              value="MecanismoReusoCheckbox"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
              checked={reusoAguaChecked}
              onChange={handleReusoAgChange}
              disabled={ningunoChecked}
              // style={{ flexBasis: "1.6rem" }}
            />
            Mecanismo de reúso de agua
          </label>
          <label
            className="displayAgua"
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            <input
              {...methods.register("dispAhorradorAguaCheckbox")}
              type="checkbox"
              className="checkboxes-agua"
              label="Mecanismos de captación de agua de lluvia"
              value="CaptacionLluviaCheckbox"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
              checked={captacionAguaChecked}
              onChange={handleCaptacionAgAgChange}
              disabled={ningunoChecked}
              // style={{ flexBasis: "1.8rem" }}
            />
            Mecanismos de captación de agua de lluvia
          </label>
          <label
            className="displayAgua"
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            <input
              {...methods.register("dispAhorradorAguaCheckbox")}
              type="checkbox"
              className="checkboxes-agua "
              label="Ninguno"
              value="NingunoAgCheckbox"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
              checked={ningunoChecked}
              onChange={handleNingunoChange}
              // style={{ flexBasis: "1.6rem" }}
            />
            Ninguno
          </label>
        </div>
        {errorMessage.inf1 && (
          <span key={JSON.stringify("a" + errorMessage.inf1)}>
            {methods.formState.errors.dispAhorradorAguaCheckbox?.message}
          </span>
        )}
      </CCardBody>
      <CCardBody
        className="bodyCardTransporte"
        style={{ flexDirection: "column" }}
      >
        <p className="question-tittle">
          2) En tu jardín, ¿las especies vegetales son de bajo requerimiento
          hídrico y/o nativas?
        </p>
        <div
          style={{
            display: "flex",
            marginTop: "25px",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <label style={{ display: "flex" }}>
            <input
              {...methods.register("bajoRequerimiento")}
              type="radio"
              className="radios"
              value="sonBajoRequerim"
              label="SI"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
            />
            SI
          </label>
          <label style={{ display: "flex" }}>
            <input
              {...methods.register("bajoRequerimiento")}
              type="radio"
              className="radios"
              value="noSonBajoRequerim"
              label="NO"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
            />
            NO
          </label>
          <label style={{ display: "flex" }}>
            <input
              {...methods.register("bajoRequerimiento")}
              type="radio"
              className="radios"
              value="noTieneJardin"
              label="NO"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
            />
            No tengo jardín
          </label>
        </div>
        <span style={{ marginLeft: "25px" }}>
          {methods.formState.errors.bajoRequerimiento?.message}
        </span>
      </CCardBody>
      <CCardBody
        className="bodyCardTransporte"
        style={{ flexDirection: "column" }}
      >
        <p className="question-tittle">
          3) Generalmente, ¿cómo regás tu jardín o plantas?
        </p>
        <div className="selectSV ">
          <select
            {...methods.register("formaRiego")}
            onFocus={() =>
              refSeccion.current.scrollIntoView({ block: "start" })
            }
            name="formaRiego"
            type="select"
            size={0}
            className="inputTypeCardMax"
            style={{ width: "100%", maxWidth: "100%", boxSizing: "border-box" }}
          >
            <option value={""}>Selecciona una opción</option>
            {constantesDataSV.formaRiegoJardin.map((formaRieg, key) => (
              <option value={formaRieg} key={key}>
                {formaRieg}
              </option>
            ))}
          </select>
        </div>
        <span>{methods.formState.errors.formaRiego?.message}</span>
      </CCardBody>
    </CCard>
  );
}
