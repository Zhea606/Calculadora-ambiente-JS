import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import React, { useRef } from "react";
import { useFormContext } from "react-hook-form";
import { BiTrash } from "react-icons/bi";
import constantesDataSV from "./constantesDataSV";

export function Residuos() {
  const methods = useFormContext();
  const refDatosHeader = useRef(null);
  const refSeccion = useRef(null);

  return (
    <CCard className="cardComponent">
      <CCardHeader className="headerCardDatosElecCombTransp" ref={refSeccion}>
        <BiTrash size={75} className="iconHeader" />
        <p className="headerCardTitulo">RESIDUOS</p>
      </CCardHeader>
      <CCardBody
        className="bodyCardTransporte"
        style={{ flexDirection: "column" }}
      >
        <p className="question-tittle">1) ¿Separás tus residuos?</p>
        <div className="selectSV">
          <select
            {...methods.register("formaResiduos")}
            onFocus={() =>
              refSeccion.current.scrollIntoView({ block: "start" })
            }
            name="formaResiduos"
            type="select"
            size={0}
            className="inputTypeCardMax"
            style={{ width: "100%", maxWidth: "100%", boxSizing: "border-box" }}
          >
            <option value={""}>Selecciona una opción</option>
            {constantesDataSV.residuos.map((formaResid, key) => (
              <option value={formaResid} key={key}>
                {formaResid}
              </option>
            ))}
          </select>
        </div>
        <span>{methods.formState.errors.formaResiduos?.message}</span>
      </CCardBody>
      <CCardBody
        className="bodyCardTransporte"
        style={{ flexDirection: "column" }}
      >
        <p className="question-tittle">
          2) ¿Hacés compost con tus residuos orgánicos?
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
              {...methods.register("haceCompost")}
              type="radio"
              className="radios"
              value="siHaceCompost"
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
              {...methods.register("haceCompost")}
              type="radio"
              className="radios"
              value="noHaceCompost"
              label="NO"
              onFocus={() =>
                refSeccion.current.scrollIntoView({ block: "start" })
              }
            />
            NO
          </label>
        </div>
        <span style={{ marginLeft: "25px" }}>
          {methods.formState.errors.haceCompost?.message}
        </span>
      </CCardBody>
    </CCard>
  );
}
