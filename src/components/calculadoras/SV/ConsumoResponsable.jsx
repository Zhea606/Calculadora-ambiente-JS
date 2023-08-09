import { CCard, CCardBody, CCardHeader } from "@coreui/react";
// import { isMobile } from "react-device-detect";
import { useFormContext } from "react-hook-form";
import { BiCoffee } from "react-icons/bi";
import React, { useRef, useState, useEffect } from "react";

export function ConsumoResponsable() {
  const methods = useFormContext();
  const refDatosHeader = useRef(null);
  const refSeccion = useRef(null);

  //************************************* PROVISORIO: mejorar el código para deshabilitar y destildar */
  const [ningunoChecked, setNingunoChecked] = useState(false);
  const [huertaChecked, setHuertaChecked] = useState(false);
  const [bolsasTelaChecked, setBolsasTelaChecked] = useState(false);
  const [tazaChecked, setTazaChecked] = useState(false);
  const [prodAmigablesChecked, setProdAmigablesChecked] = useState(false);
  const [prodSustChecked, setProdSustChecked] = useState(false);
  const [prodRegionalesChecked, setProdRegionalesChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ inf1: false });

  const verificarTodos = () => {
    let verificador = 0;
    if (ningunoChecked) {
      verificador++;
    } else if (huertaChecked) {
      verificador++;
    } else if (bolsasTelaChecked) {
      verificador++;
    } else if (tazaChecked) {
      verificador++;
    } else if (prodAmigablesChecked) {
      verificador++;
    } else if (prodSustChecked) {
      verificador++;
    } else if (prodRegionalesChecked) {
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
    huertaChecked,
    bolsasTelaChecked,
    tazaChecked,
    prodAmigablesChecked,
    prodSustChecked,
    prodRegionalesChecked,
  ]);

  const handleNingunoChange = (event) => {
    const isChecked = event.target.checked;
    setNingunoChecked(isChecked);
    if (isChecked) {
      // Desmarcar los demás checkboxes
      setHuertaChecked(false);
      setBolsasTelaChecked(false);
      setTazaChecked(false);
      setProdAmigablesChecked(false);
      setProdSustChecked(false);
      setProdRegionalesChecked(false);
    }
  };

  const handleHuertaChange = (event) => {
    const isChecked = event.target.checked;
    setHuertaChecked(isChecked);

    if (isChecked) {
      // Desmarcar el checkbox de "Ninguno"
      setNingunoChecked(false);
    }
  };

  const handleBolsasTelChange = (event) => {
    const isChecked = event.target.checked;
    setBolsasTelaChecked(isChecked);

    if (isChecked) {
      // Desmarcar el checkbox de "Ninguno"
      setNingunoChecked(false);
    }
  };

  const handleTazaChange = (event) => {
    const isChecked = event.target.checked;
    setTazaChecked(isChecked);
    if (isChecked) {
      // Desmarcar el checkbox de "Ninguno"
      setNingunoChecked(false);
    }
  };

  const handleProducAmigChange = (event) => {
    const isChecked = event.target.checked;
    setProdAmigablesChecked(isChecked);
    if (isChecked) {
      // Desmarcar el checkbox de "Ninguno"
      setNingunoChecked(false);
    }
  };

  const handleProducSustChange = (event) => {
    const isChecked = event.target.checked;
    setProdSustChecked(isChecked);
    if (isChecked) {
      // Desmarcar el checkbox de "Ninguno"
      setNingunoChecked(false);
    }
  };

  const handleProducRegionChange = (event) => {
    const isChecked = event.target.checked;
    setProdRegionalesChecked(isChecked);
    if (isChecked) {
      // Desmarcar el checkbox de "Ninguno"
      setNingunoChecked(false);
    }
  };
  /************************************************************************ */

  return (
    <CCard className="cardComponent">
      <CCardHeader className="headerCardDatosElecCombTransp" ref={refSeccion}>
        <BiCoffee size={75} className="iconHeader" />
        <p className="headerCardTitulo">CONSUMO RESPONSABLE</p>
      </CCardHeader>
      <CCardBody
        className="bodyCardTransporte"
        style={{ flexDirection: "column" }}
      >
        <p className="question-tittle">
          1) ¿Practicás alguno de los siguientes hábitos?
        </p>
        <div className="checkSV-agua ">
          <label
            className="displayAgua"
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            <input
              {...methods.register("habitosSostCheckbox")}
              type="checkbox"
              className="checkboxes-agua "
              label="Realizo huerta en casa"
              value="HuertaCheckbox"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
              disabled={ningunoChecked}
              checked={huertaChecked}
              onChange={handleHuertaChange}
            />
            Realizo huerta en casa
          </label>
          <label
            className="displayAgua"
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            <input
              {...methods.register("habitosSostCheckbox")}
              type="checkbox"
              className="checkboxes-agua "
              label="Utilizo bolsas de tela para hacer las comprasros"
              value="BolsasTelaCheckbox"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
              disabled={ningunoChecked}
              checked={bolsasTelaChecked}
              onChange={handleBolsasTelChange}
            />
            Utilizo bolsas de tela para hacer las compras
          </label>
          <label
            className="displayAgua"
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            <input
              {...methods.register("habitosSostCheckbox")}
              type="checkbox"
              className="checkboxes-agua "
              label="Llevo mi propia taza/botella/tupper"
              value="LlevarTazaCheckbox"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
              disabled={ningunoChecked}
              checked={tazaChecked}
              onChange={handleTazaChange}
            />
            Llevo mi propia taza/botella/tupper
          </label>
          <label
            className="displayAgua"
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            <input
              {...methods.register("habitosSostCheckbox")}
              type="checkbox"
              className="checkboxes-agua "
              label="Utilizo productos amigables con el ambiente"
              value="ProductosAmigablesCheckbox"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
              disabled={ningunoChecked}
              checked={prodAmigablesChecked}
              onChange={handleProducAmigChange}
            />
            Utilizo productos amigables con el ambiente
          </label>
          <label
            className="displayAgua"
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            <input
              {...methods.register("habitosSostCheckbox")}
              type="checkbox"
              className="checkboxes-agua "
              label="Utilizo productos sustentables y compro lo necesario"
              value="ProductosSustCheckbox"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
              disabled={ningunoChecked}
              checked={prodSustChecked}
              onChange={handleProducSustChange}
            />
            Utilizo productos sustentables y compro lo necesario
          </label>
          <label
            className="displayAgua"
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            <input
              {...methods.register("habitosSostCheckbox")}
              type="checkbox"
              className="checkboxes-agua "
              label="Elijo productos regionales o locales"
              value="ProductosRegionalesCheckbox"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
              disabled={ningunoChecked}
              checked={prodRegionalesChecked}
              onChange={handleProducRegionChange}
            />
            Elijo productos regionales o locales
          </label>
          <label
            className="displayAgua"
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            <input
              {...methods.register("habitosSostCheckbox")}
              type="checkbox"
              className="checkboxes-agua "
              label="Ninguno"
              value="NingunoCRCheckbox"
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
            {methods.formState.errors.habitosSostCheckbox?.message}
          </span>
        )}
      </CCardBody>
    </CCard>
  );
}
