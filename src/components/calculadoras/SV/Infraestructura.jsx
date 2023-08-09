import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { BiHome } from "react-icons/bi";
import constantesDataSV from "./constantesDataSV";

export function Infraestructura() {
  /*** registra y valida input.Observa esos input y retorna los valores. Errors trae los campos con errores y un mensaje */
  const methods = useFormContext();
  const refSeccion = useRef(null);

  //************************************* PROVISORIO: mejorar el código para deshabilitar y destildar */
  const [ningunoChecked, setNingunoChecked] = useState(false);
  const [techoChecked, setTechoChecked] = useState(false);
  const [murosChecked, setMurosChecked] = useState(false);
  const [pisoChecked, setPisoChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ inf1: false });
  const verificarTodos = () => {
    let verificador = 0;
    if (ningunoChecked) {
      verificador++;
    } else if (techoChecked) {
      verificador++;
    } else if (murosChecked) {
      verificador++;
    } else if (pisoChecked) {
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
  }, [ningunoChecked, techoChecked, murosChecked, pisoChecked]);

  const handleNingunoChange = (event) => {
    const isChecked = event.target.checked;
    setNingunoChecked(isChecked);
    if (isChecked) {
      // Desmarcar los demás checkboxes
      setTechoChecked(false);
      setMurosChecked(false);
      setPisoChecked(false);
    }
  };

  const handleTechoChange = (event) => {
    const isChecked = event.target.checked;
    setTechoChecked(isChecked);

    if (isChecked) {
      // Desmarcar el checkbox de "Ninguno"
      setNingunoChecked(false);
    }
  };

  const handleMurosChange = (event) => {
    const isChecked = event.target.checked;
    setMurosChecked(isChecked);

    if (isChecked) {
      // Desmarcar el checkbox de "Ninguno"
      setNingunoChecked(false);
    }
  };

  const handlePisoChange = (event) => {
    const isChecked = event.target.checked;
    setPisoChecked(isChecked);
    if (isChecked) {
      // Desmarcar el checkbox de "Ninguno"
      setNingunoChecked(false);
    }
  };

  /************************************************************************ */

  return (
    <CCard className="cardComponent">
      <CCardHeader className="headerCardDatosElecCombTransp" ref={refSeccion}>
        <BiHome size={75} className="iconHeader" />
        <p className="headerCardTitulo">INFRAESTRUCTURA</p>
      </CCardHeader>
      <CCardBody className="bodyCardSV">
        <p className="question-tittle">
          1) ¿Tenés algún sistema de aislación térmica en tu hogar? <br /> {""}
          Por ejemplo: placas de telgopor, espuma de poliuretano, lana de
          vidrio, etc. (Podés marcar más de una opción)
        </p>
        <div className="checkSV">
          <label style={{ display: "flex" }}>
            <input
              {...methods.register("aislacionCheckbox")}
              type="checkbox"
              className="checkboxes"
              label="Techos"
              value="TechosCheckbox"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
              checked={techoChecked}
              onChange={handleTechoChange}
              disabled={ningunoChecked}
            />
            Techos
          </label>
          <label style={{ display: "flex" }}>
            <input
              {...methods.register("aislacionCheckbox")}
              type="checkbox"
              className="checkboxes"
              label="Muros"
              value="MurosCheckbox"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
              checked={murosChecked}
              onChange={handleMurosChange}
              disabled={ningunoChecked}
            />
            Muros
          </label>
          <label style={{ display: "flex" }}>
            <input
              {...methods.register("aislacionCheckbox")}
              type="checkbox"
              className="checkboxes"
              label="Piso"
              value="PisoCheckbox"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
              disabled={ningunoChecked}
              checked={pisoChecked}
              onChange={handlePisoChange}
            />
            Piso
          </label>
          <label style={{ display: "flex" }}>
            <input
              {...methods.register("aislacionCheckbox")}
              type="checkbox"
              className="checkboxes"
              label="Ninguno"
              value="NingunoCheckbox"
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
            {methods.formState.errors.aislacionCheckbox?.message}
          </span>
        )}
      </CCardBody>
      <CCardBody className="bodyCardSV">
        <p className="question-tittle">
          2) ¿Cómo son las ventanas? <br /> {""}
        </p>
        <div className="selectSV">
          <select
            {...methods.register("ventanaTipo")}
            onFocus={() =>
              refSeccion.current.scrollIntoView({ block: "start" })
            }
            name="ventanaTipo"
            type="select"
            size={0}
            className="inputTypeCardMax"
          >
            <option value={""}>Selecciona una opción</option>
            {constantesDataSV.ventanas.map((ventanaTipo, key) => (
              <option value={ventanaTipo} key={key}>
                {ventanaTipo}
              </option>
            ))}
          </select>
        </div>
        <span>{methods.formState.errors.ventanaTipo?.message}</span>
      </CCardBody>
      <CCardBody className="bodyCardSV">
        <p className="question-tittle" style={{ marginTop: "20px" }}>
          3) ¿Las ventanas de tu hogar que están ubicadas en las orientaciones
          de mayor soleamiento (hacia el norte) tienen protecciones solares,
          como voladizos, lamas o toldos, para reducir el calor en verano?
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
              {...methods.register("proteccionSolar")}
              type="radio"
              className="radios"
              value="siProteccionSolar"
              label="SI"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
            />
            SI
          </label>
          <label style={{ display: "flex" }}>
            <input
              {...methods.register("proteccionSolar")}
              type="radio"
              className="radios"
              value="noProteccionSolar"
              label="NO"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
            />
            NO
          </label>
        </div>
        <span style={{ marginLeft: "25px" }}>
          {methods.formState.errors.proteccionSolar?.message}
        </span>
      </CCardBody>
      <CCardBody className="bodyCardSV">
        <p className="question-tittle">
          4) ¿Qué tipo de infraestructura tenés en tu hogar?
        </p>
        <div className="selectSV ">
          <select
            {...methods.register("tipoInfraestructura")}
            onFocus={() =>
              refSeccion.current.scrollIntoView({
                block: "start",
              })
            }
            name="tipoInfraestructura"
            type="select"
            size={0}
            className="inputTypeCardMax"
            style={{ width: "100%", maxWidth: "100%", boxSizing: "border-box" }}
          >
            <option value={""}>Selecciona una opción</option>
            {constantesDataSV.tipoEstructHogar.map((tipoEstruHo, key) => (
              <option value={tipoEstruHo} key={key}>
                {tipoEstruHo}
              </option>
            ))}
          </select>
        </div>
        <span>{methods.formState.errors.tipoInfraestructura?.message}</span>
      </CCardBody>
    </CCard>
  );
}
