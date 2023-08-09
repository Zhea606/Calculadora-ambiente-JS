import { CCard, CCardBody, CCardHeader } from "@coreui/react";

import { isMobile } from "react-device-detect";
import { useFormContext } from "react-hook-form";
import { BiHome } from "react-icons/bi";
import { React, useRef } from "react";

export function DatosCombustible() {
  const methods = useFormContext();
  const watchGN = methods.watch("GNCheckbox");
  const watchGL = methods.watch("GLCheckbox");
  const watchLeña = methods.watch("LeñaCheckbox");
  const watchCarbon = methods.watch("CarbonCheckbox");
  const refDatos = useRef(null);

  return (
    <CCard className="cardComponent" ref={refDatos}>
      <CCardHeader className="headerCardDatosElecCombTransp">
        <BiHome size={75} className="iconHeader" />
        <p className="headerCardTitulo">Combustibles del hogar</p>
        <p className="headerCardSubtitulo">
          ¿Qué tipos de combustibles utilizás en mayor medida? (Respondé según
          tu consumo promedio anual)
        </p>
      </CCardHeader>
      <CCardBody className="bodyCard">
        <div className="displayF1">
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div
              style={{
                display: "flex",
                flex: 1,
                marginBottom: 10,
                alignItems: "center",
              }}
            >
              <label style={{ display: "flex", flex: 1 }}>
                <input
                  {...methods.register("GNCheckbox")}
                  type="checkbox"
                  name="GNCheckbox"
                  label="Gas Natural (en m3)"
                  onFocus={() =>
                    refDatos.current.scrollIntoView({ block: "center" })
                  }
                  className="checkboxes"
                />
                Gas Natural (en m3)
              </label>
            </div>
            <div className="componentesIzquierda">
              <input
                {...methods.register("GasNaturalConsumo")}
                type={isMobile ? "number" : "text"}
                step="0.01"
                disabled={!watchGN}
                name={"GasNaturalConsumo"}
                placeholder={"Indicá el consumo que figura en tu boleta"}
                defaultValue={undefined}
                onFocus={() =>
                  refDatos.current.scrollIntoView({ block: "center" })
                }
                className="inputTypeCardMed"
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div
              style={{
                display: "flex",
                flex: 1,
                marginBottom: 10,
                alignItems: "center",
              }}
            >
              <label style={{ display: "flex", flex: 1 }}>
                <input
                  {...methods.register("GLCheckbox")}
                  type="checkbox"
                  name="GLCheckbox"
                  label="Gas Licuado (garrafa) (en kg)"
                  onFocus={() =>
                    refDatos.current.scrollIntoView({ block: "center" })
                  }
                  className="checkboxes"
                />
                Gas Licuado (garrafa) (en kg)
              </label>
            </div>
            <div className="componentesIzquierda">
              <input
                {...methods.register("GasLicuadoConsumo")}
                type={isMobile ? "number" : "text"}
                step="0.01"
                disabled={!watchGL}
                name={"GasLicuadoConsumo"}
                placeholder={"Garrafa en kg"}
                defaultValue={undefined}
                onFocus={() =>
                  refDatos.current.scrollIntoView({ block: "center" })
                }
                className="inputTypeCardMed"
              />
            </div>
          </div>
        </div>
        <div className="displayF1">
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div
              style={{
                display: "flex",
                flex: 1,
                marginBottom: 10,
                alignItems: "center",
              }}
            >
              <label style={{ display: "flex", flex: 1 }}>
                <input
                  {...methods.register("LeñaCheckbox")}
                  className="checkboxes"
                  type="checkbox"
                  name="LeñaCheckbox"
                  label="Leña (en kg)"
                  onFocus={() =>
                    refDatos.current.scrollIntoView({ block: "center" })
                  }
                />
                Leña (en kg)
              </label>
            </div>
            <div className="componentesIzquierda">
              <input
                {...methods.register("LeñaConsumo")}
                type={isMobile ? "number" : "text"}
                step="0.01"
                min={0}
                className="inputTypeCardMed"
                disabled={!watchLeña}
                name={"LeñaConsumo"}
                placeholder={"En kg"}
                defaultValue={undefined}
                onFocus={() =>
                  refDatos.current.scrollIntoView({ block: "center" })
                }
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div
              style={{
                display: "flex",
                flex: 1,
                marginBottom: 10,
                alignItems: "center",
              }}
            >
              <label style={{ display: "flex", flex: 1 }}>
                <input
                  {...methods.register("CarbonCheckbox")}
                  className="checkboxes"
                  type="checkbox"
                  name="CarbonCheckbox"
                  label="Carbon (en kg)"
                  onFocus={() =>
                    refDatos.current.scrollIntoView({ block: "center" })
                  }
                />
                Carbón (en kg)
              </label>
            </div>
            <div className="componentesIzquierda">
              <input
                {...methods.register("CarbonConsumo")}
                type={isMobile ? "number" : "text"}
                step="0.01"
                min={0}
                className="inputTypeCardMed"
                disabled={!watchCarbon}
                name={"CarbonConsumo"}
                placeholder={"En kg"}
                defaultValue={undefined}
                onFocus={() =>
                  refDatos.current.scrollIntoView({ block: "center" })
                }
              />
            </div>
          </div>
        </div>
        <span hidden={watchGN}>
          {methods.formState.errors.GNCheckbox?.message}
        </span>
        <span hidden={watchGL}>
          {methods.formState.errors.GLCheckbox?.message}
        </span>
        <span hidden={watchLeña}>
          {methods.formState.errors.LeñaCheckbox?.message}
        </span>
        <span hidden={watchCarbon}>
          {methods.formState.errors.CarbonCheckbox?.message}
        </span>
      </CCardBody>
    </CCard>
  );
}
