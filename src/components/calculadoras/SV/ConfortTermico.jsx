import { CCard, CCardBody, CCardHeader } from "@coreui/react";
// import { isMobile } from "react-device-detect";
import { useFormContext } from "react-hook-form";
// import { lineaSeparacion } from "../../lineaSeparacion";
import React, { useRef } from "react";
import { BiWind } from "react-icons/bi";

export function ConfortTermico({}) {
  const methods = useFormContext();
  const refDatosHeader = useRef(null);
  const refSeccion = useRef(null);

  return (
    <CCard className="cardComponent">
      <CCardHeader className="headerCardDatosElecCombTransp" ref={refSeccion}>
        <BiWind size={75} className="iconHeader" />
        <p className="headerCardTitulo">CONFORT TÉRMICO</p>
      </CCardHeader>
      <CCardBody
        className="bodyCardTransporte"
        style={{ flexDirection: "column" }}
      >
        <p className="question-tittle">
          1) ¿Tenés burletes en las puertas y ventanas de tu hogar?
        </p>
        <div
          style={{
            display: "flex",
            marginTop: "25px",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <label
            style={{
              display: "flex",
            }}
          >
            <input
              {...methods.register("ingresaAireVentPuert")}
              type="radio"
              className="radios"
              value="siIngresaAire"
              label="SI"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
            />
            SI
          </label>
          <label
            style={{
              display: "flex",
            }}
          >
            <input
              {...methods.register("ingresaAireVentPuert")}
              type="radio"
              className="radios"
              value="noIngresaAire"
              label="NO"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
            />
            NO
          </label>
        </div>
        <span style={{ marginLeft: "25px" }}>
          {methods.formState.errors.ingresaAireVentPuert?.message}
        </span>
      </CCardBody>
      <CCardBody
        className="bodyCardTransporte"
        style={{ flexDirection: "column" }}
      >
        <p className="question-tittle">
          2) Esas ventanas de tu hogar, ¿condensan y gotean en invierno?
        </p>
        <div
          style={{
            display: "flex",
            marginTop: "25px",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <label
            style={{
              display: "flex",
            }}
          >
            <input
              {...methods.register("goteanVentanas")}
              type="radio"
              className="radios"
              value="siGotean"
              label="SI"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
            />
            SI
          </label>
          <label style={{ display: "flex" }}>
            <input
              {...methods.register("goteanVentanas")}
              type="radio"
              className="radios"
              value="noGotean"
              label="NO"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
            />
            NO
          </label>
        </div>
        <span style={{ marginLeft: "25px" }}>
          {methods.formState.errors.goteanVentanas?.message}
        </span>
      </CCardBody>
    </CCard>
  );
}
