import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import React, { useRef, useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { BiSun } from "react-icons/bi";

export function ConfortTermico2() {
  const methods = useFormContext();
  const refDatosHeader = useRef(null);
  const refSeccion = useRef(null);

  //************************************* PROVISORIO: mejorar el código para deshabilitar y destildar */
  const [ningunCEChecked, setNingunoCEChecked] = useState(false);
  const [desenchufoChecked, setDesenchufoChecked] = useState(false);
  const [secaRopaChecked, setSecaRopaChecked] = useState(false);
  const [apagaTermoChecked, setApagaTermoChecked] = useState(false);
  const [apagaLucesChecked, setApagaLucesChecked] = useState(false);
  const [luzSolarChecked, setLuzSolarChecked] = useState(false);
  /***/
  const [apagaAireACChecked, setApagaAireACChecked] = useState(false);
  const [apagaEstufaChecked, setApagaEstufaCChecked] = useState(false);
  const [usoACChecked, setUsoACChecked] = useState(false);
  const [ningunoCTChecked, setNingunoCTChecked] = useState(false);

  const [errorMessage, setErrorMessage] = useState({ inf1: false });

  const verificarTodos = () => {
    let verificador = 0;
    if (ningunCEChecked) {
      verificador++;
    } else if (desenchufoChecked) {
      verificador++;
    } else if (secaRopaChecked) {
      verificador++;
    } else if (apagaTermoChecked) {
      verificador++;
    } else if (apagaLucesChecked) {
      verificador++;
    } else if (luzSolarChecked) {
      verificador++;
    }
    if (ningunoCTChecked) {
      verificador++;
    } else if (apagaAireACChecked) {
      verificador++;
    } else if (apagaEstufaChecked) {
      verificador++;
    } else if (usoACChecked) {
      verificador++;
    }
    if (verificador === 0) {
      setErrorMessage({ ...errorMessage, inf1: true });
    } else {
      setErrorMessage({ ...errorMessage, inf1: false });
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
    ningunCEChecked,
    desenchufoChecked,
    secaRopaChecked,
    apagaTermoChecked,
    apagaLucesChecked,
    luzSolarChecked,
    /**/
    ningunoCTChecked,
    apagaAireACChecked,
    apagaEstufaChecked,
    apagaTermoChecked,
    usoACChecked,
  ]);

  const handleNingunoCEChange = (event) => {
    const isChecked = event.target.checked;
    setNingunoCEChecked(isChecked);
    if (isChecked) {
      // Desmarcar los demás checkboxes
      setDesenchufoChecked(false);
      setSecaRopaChecked(false);
      setApagaTermoChecked(false);
      setApagaLucesChecked(false);
      setLuzSolarChecked(false);
    }
  };

  const handleNingunoCTChange = (event) => {
    const isChecked = event.target.checked;
    setNingunoCTChecked(isChecked);
    if (isChecked) {
      // Desmarcar los demás checkboxes
      setApagaAireACChecked(false);
      setApagaEstufaCChecked(false);
      setUsoACChecked(false);
    }
  };

  const handleDesenchufaChange = (event) => {
    const isChecked = event.target.checked;
    setDesenchufoChecked(isChecked);

    if (isChecked) {
      // Desmarcar el checkbox de "Ninguno"
      setNingunoCEChecked(false);
    }
  };

  const handleSecaRopChange = (event) => {
    const isChecked = event.target.checked;
    setSecaRopaChecked(isChecked);

    if (isChecked) {
      // Desmarcar el checkbox de "Ninguno"
      setNingunoCEChecked(false);
    }
  };

  const handleApagaTerChange = (event) => {
    const isChecked = event.target.checked;
    setApagaTermoChecked(isChecked);
    if (isChecked) {
      // Desmarcar el checkbox de "Ninguno"
      setNingunoCEChecked(false);
    }
  };
  const handleApagaLucesChange = (event) => {
    const isChecked = event.target.checked;
    setApagaLucesChecked(isChecked);
    if (isChecked) {
      // Desmarcar el checkbox de "Ninguno"
      setNingunoCEChecked(false);
    }
  };

  const handleLuzSolarChange = (event) => {
    const isChecked = event.target.checked;
    setLuzSolarChecked(isChecked);
    if (isChecked) {
      // Desmarcar el checkbox de "Ninguno"
      setNingunoCEChecked(false);
    }
  };

  /***/

  const handleApagaAireChange = (event) => {
    const isChecked = event.target.checked;
    setApagaAireACChecked(isChecked);
    if (isChecked) {
      // Desmarcar el checkbox de "Ninguno"
      setNingunoCTChecked(false);
    }
  };

  const handleApagaEstufaChange = (event) => {
    const isChecked = event.target.checked;
    setApagaEstufaCChecked(isChecked);
    if (isChecked) {
      // Desmarcar el checkbox de "Ninguno"
      setNingunoCTChecked(false);
    }
  };
  const handleUsoACChange = (event) => {
    const isChecked = event.target.checked;
    setUsoACChecked(isChecked);
    if (isChecked) {
      // Desmarcar el checkbox de "Ninguno"
      setNingunoCTChecked(false);
    }
  };

  /************************************************************************ */

  return (
    <CCard className="cardComponent">
      <CCardHeader className="headerCardDatosElecCombTransp" ref={refSeccion}>
        <BiSun size={75} className="iconHeader" />
        <p className="headerCardTitulo">ENERGÍA Y CONFORT TÉRMICO</p>
      </CCardHeader>
      <CCardBody
        className="bodyCardTransporte"
        style={{ flexDirection: "column" }}
      >
        <p className="question-tittle">
          1) ¿Practicás alguno de los siguientes hábitos en cuanto al consumo
          energético?
        </p>
        <div className="checkSV-agua ">
          <label
            className="displayAgua"
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            <input
              {...methods.register("habitosEnergiaCheckbox")}
              type="checkbox"
              className="checkboxes-agua"
              label="Desenchufo los aparatos electrónicos cuando no los estoy usando"
              value="DesenchufoCheckbox"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
              checked={desenchufoChecked}
              onChange={handleDesenchufaChange}
              disabled={ningunCEChecked}
            />
            Desenchufo los aparatos electrónicos cuando no los estoy usando.
          </label>
          <label
            className="displayAgua"
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            <input
              {...methods.register("habitosEnergiaCheckbox")}
              type="checkbox"
              className="checkboxes-agua"
              label="Seco la ropa de manera natural sin necesidad de usar la secadora"
              value="SecoRopaCheckbox"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
              checked={secaRopaChecked}
              onChange={handleSecaRopChange}
              disabled={ningunCEChecked}
            />
            Seco la ropa de manera natural sin necesidad de usar la secadora
          </label>
          <label
            className="displayAgua"
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            <input
              {...methods.register("habitosEnergiaCheckbox")}
              type="checkbox"
              className="checkboxes-agua"
              label="Apago el termotanque cuando no lo utilizo"
              value="ApagarTermotCheckbox"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
              checked={apagaTermoChecked}
              onChange={handleApagaTerChange}
              disabled={ningunCEChecked}
            />
            Apago el termotanque cuando no lo utilizo
          </label>
          <label
            className="displayAgua"
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            <input
              {...methods.register("habitosEnergiaCheckbox")}
              type="checkbox"
              className="checkboxes-agua"
              label="Apago las luces cuando salgo de una habitación"
              value="ApagaLucesCheckbox"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
              checked={apagaLucesChecked}
              onChange={handleApagaLucesChange}
              disabled={ningunCEChecked}
            />
            Apago las luces cuando salgo de una habitación
          </label>
          <label
            className="displayAgua"
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            <input
              {...methods.register("habitosEnergiaCheckbox")}
              type="checkbox"
              className="checkboxes-agua"
              label="Aprovecho la luz solar en la iluminación de ambientes"
              value="AprovechoLuzSolarCheckbox"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
              checked={luzSolarChecked}
              onChange={handleLuzSolarChange}
              disabled={ningunCEChecked}
            />
            Aprovecho la luz solar en la iluminación de ambientes
          </label>
          <label
            className="displayAgua"
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            <input
              {...methods.register("habitosEnergiaCheckbox")}
              type="checkbox"
              className="checkboxes-agua"
              label="Ninguno"
              value="NingunoHECheckbox"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
              checked={ningunCEChecked}
              onChange={handleNingunoCEChange}
            />
            Ninguno
          </label>
        </div>
        {errorMessage.inf1 && (
          <span key={JSON.stringify("a" + errorMessage.inf1)}>
            {methods.formState.errors.habitosEnergiaCheckbox?.message}
          </span>
        )}
      </CCardBody>
      <CCardBody
        className="bodyCardTransporte"
        style={{ flexDirection: "column" }}
      >
        <p className="question-tittle">
          2) ¿Cuáles son tus hábitos para mantener un buen confort térmico en tu
          casa?
        </p>
        <div className="checkSV-agua ">
          <label
            className="displayAgua"
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            <input
              {...methods.register("buenConfortCheckbox")}
              type="checkbox"
              className="checkboxes-agua"
              label="Apago el aire acondicionado cuando no se está usando o cuando no estás en tu hogar"
              value="ApagoAireCheckbox"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
              checked={apagaAireACChecked}
              onChange={handleApagaAireChange}
              disabled={ningunoCTChecked}
            />
            Apago el aire acondicionado cuando no se está usando o cuando no
            estás en tu hogar
          </label>
          <label
            className="displayAgua"
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            <input
              {...methods.register("buenConfortCheckbox")}
              type="checkbox"
              className="checkboxes-agua"
              label="Apago la estufa cuando no la estoy usando o cuando no estoy en casa"
              value="ApagoEstufaCheckbox"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
              checked={apagaEstufaChecked}
              onChange={handleApagaEstufaChange}
              disabled={ningunoCTChecked}
            />
            Apago la estufa cuando no la estoy usando o cuando no estoy en casa
          </label>
          <label
            className="displayAgua"
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            <input
              {...methods.register("buenConfortCheckbox")}
              type="checkbox"
              className="checkboxes-agua"
              label="Utilizo el aire acondicionado y/o calefacción a 24°C en los meses de verano y 20°C en los meses invernales"
              value="AireAcEstacCheckbox"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
              checked={usoACChecked}
              onChange={handleUsoACChange}
              disabled={ningunoCTChecked}
            />
            Utilizo el aire acondicionado y/o calefacción a 24°C en los meses de
            verano y 20°C en los meses invernales
          </label>
          <label
            className="displayAgua"
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            <input
              {...methods.register("buenConfortCheckbox")}
              type="checkbox"
              className="checkboxes-agua"
              label="Ninguno"
              value="NingunoHECCheckbox"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
              checked={ningunoCTChecked}
              onChange={handleNingunoCTChange}
            />
            Ninguno
          </label>
        </div>
        {errorMessage.inf1 && (
          <span key={JSON.stringify("a" + errorMessage.inf1)}>
            {methods.formState.errors.habitosEnergiaCheckbox?.message}
          </span>
        )}
      </CCardBody>
      <CCardBody
        className="bodyCardTransporte"
        style={{ flexDirection: "column" }}
      >
        <p className="question-tittle">
          3) ¿Ventilás regularmente los ambientes de tu hogar?
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
              {...methods.register("ventilaAmbientes")}
              type="radio"
              className="radios"
              value="siVentilaAmb"
              label="SI"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
            />
            SI
          </label>
          <label style={{ display: "flex" }}>
            <input
              {...methods.register("ventilaAmbientes")}
              type="radio"
              className="radios"
              value="noVentilaAmb"
              label="NO"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
            />
            NO
          </label>
        </div>
        <span style={{ marginLeft: "25px" }}>
          {methods.formState.errors.ventilaAmbientes?.message}
        </span>
      </CCardBody>
    </CCard>
  );
}
