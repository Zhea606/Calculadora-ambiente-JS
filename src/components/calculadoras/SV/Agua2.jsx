import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import React, { useRef, useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { BiShower } from "react-icons/bi";

export function Agua2() {
  const methods = useFormContext();
  const refDatosHeader = useRef(null);
  const refSeccion = useRef(null);

  //************************************* PROVISORIO: mejorar el código para deshabilitar y destildar */
  const [ningunoChecked, setNingunoChecked] = useState(false);
  const [noDerrochaChecked, setNoDerrochaChecked] = useState(false);
  const [lavaAutoChecked, setLavaAutoChecked] = useState(false);
  const [lavarropasChecked, setLavarropasChecked] = useState(false);
  const [reparoChecked, setReparoChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ inf1: false });

  const verificarTodos = () => {
    let verificador = 0;
    if (ningunoChecked) {
      verificador++;
    } else if (noDerrochaChecked) {
      verificador++;
    } else if (lavaAutoChecked) {
      verificador++;
    } else if (lavarropasChecked) {
      verificador++;
    } else if (reparoChecked) {
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
    noDerrochaChecked,
    lavaAutoChecked,
    lavarropasChecked,
    reparoChecked,
  ]);

  const handleNingunoChange = (event) => {
    const isChecked = event.target.checked;
    setNingunoChecked(isChecked);
    if (isChecked) {
      // Desmarcar los demás checkboxes
      setNoDerrochaChecked(false);
      setLavaAutoChecked(false);
      setLavarropasChecked(false);
      setReparoChecked(false);
    }
  };

  const handleNoDerrochaChange = (event) => {
    const isChecked = event.target.checked;
    setNoDerrochaChecked(isChecked);

    if (isChecked) {
      // Desmarcar el checkbox de "Ninguno"
      setNingunoChecked(false);
    }
  };

  const handleLavaAutoChange = (event) => {
    const isChecked = event.target.checked;
    setLavaAutoChecked(isChecked);

    if (isChecked) {
      // Desmarcar el checkbox de "Ninguno"
      setNingunoChecked(false);
    }
  };

  const handleLavarropasChange = (event) => {
    const isChecked = event.target.checked;
    setLavarropasChecked(isChecked);
    if (isChecked) {
      // Desmarcar el checkbox de "Ninguno"
      setNingunoChecked(false);
    }
  };

  const handleReparoChange = (event) => {
    const isChecked = event.target.checked;
    setReparoChecked(isChecked);
    if (isChecked) {
      // Desmarcar el checkbox de "Ninguno"
      setNingunoChecked(false);
    }
  };

  /************************************************************************ */

  return (
    <CCard className="cardComponent">
      <CCardHeader className="headerCardDatosElecCombTransp" ref={refSeccion}>
        <BiShower size={75} className="iconHeader" />
        <p className="headerCardTitulo">HÁBITOS AGUA</p>
      </CCardHeader>
      <CCardBody
        className="bodyCardTransporte"
        style={{ flexDirection: "column" }}
      >
        <p className="question-tittle">
          1) ¿Practicás alguno de los siguientes hábitos en cuanto al consumo de
          agua?
        </p>
        <div className="checkSV-agua ">
          <label
            className="displayAgua"
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            <input
              {...methods.register("habitosConsumoAguaCheckbox")}
              type="checkbox"
              className="checkboxes-agua"
              label="No derrocho agua al higienizarme (ducha, lavado de manos, lavado de dientes, afeitado,etc)"
              value="NoDerrochaAguaCheckbox"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
              checked={noDerrochaChecked}
              onChange={handleNoDerrochaChange}
              disabled={ningunoChecked}
            />
            No derrocho agua al higienizarme (ducha, lavado de manos, lavado de
            dientes, afeitado,etc)
          </label>
          <label
            className="displayAgua"
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            <input
              {...methods.register("habitosConsumoAguaCheckbox")}
              type="checkbox"
              className="checkboxes-agua"
              label="Lavo el auto con balde"
              value="LavaBaldeCheckbox"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
              checked={lavaAutoChecked}
              onChange={handleLavaAutoChange}
              disabled={ningunoChecked}
            />
            Lavo el auto con balde
          </label>
          <label
            className="displayAgua"
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            <input
              {...methods.register("habitosConsumoAguaCheckbox")}
              type="checkbox"
              className="checkboxes-agua"
              label="Utilizo el lavarropas con carga completa"
              value="CargaLavarropasCheckbox"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
              checked={lavarropasChecked}
              onChange={handleLavarropasChange}
              disabled={ningunoChecked}
            />
            Utilizo el lavarropas con carga completas
          </label>
          <label
            className="displayAgua"
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            <input
              {...methods.register("habitosConsumoAguaCheckbox")}
              type="checkbox"
              className="checkboxes-agua"
              label="Reparo pérdidas en mochilas de inodoros y goteos en grifos"
              value="ReparaPerdidasCheckbox"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
              checked={reparoChecked}
              onChange={handleReparoChange}
              disabled={ningunoChecked}
            />
            Reparo pérdidas en mochilas de inodoros y goteos en grifos
          </label>
          <label
            className="displayAgua"
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            <input
              {...methods.register("habitosConsumoAguaCheckbox")}
              type="checkbox"
              className="checkboxes-agua"
              label="Ninguno"
              value="NingunoCACheckbox"
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
            {methods.formState.errors.habitosConsumoAguaCheckbox?.message}
          </span>
        )}
      </CCardBody>
    </CCard>
  );
}
