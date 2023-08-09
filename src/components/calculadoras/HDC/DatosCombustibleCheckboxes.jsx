import { CCard, CCardBody, CCardHeader } from "@coreui/react";

import { isMobile } from "react-device-detect";
import { useFormContext } from "react-hook-form";
import { BiHome } from "react-icons/bi";
import { React, useEffect, useRef } from "react";
import constantes from "../../../constants";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import barraGas from "../../../assets/gas.png";
export function DatosCombustibleCheckboxes() {
  const methods = useFormContext();
  const watchCombustibles = methods.watch("combustibleCheckbox", "");
  const refDatos = useRef(null);
  const popover = (
    <Popover id="popover-electricidad" className="electricidadPopover">
      <Popover.Header as="h3" className="tituloPopover">
        ¿De dónde obtengo el consumo de Gas Natural?
      </Popover.Header>
      <Popover.Body className="popoverBodyElectricidad">
        <img src={barraGas} className="imgBarra" />
        {/* <img src={barra} className="imgBarra" /> */}
        {/* <FaRegChartBar className="chartElectricidad" size={150} /> */}
        {/* <p className="popoverBodyElectricidad">
          En tu boleta de electricidad, podes encontrar este cuadro con la
          información necesaria
        </p> */}
      </Popover.Body>
    </Popover>
  );
  useEffect(() => {
    if (watchCombustibles.toString().indexOf("Gas Natural (en m3)") === -1) {
      methods.resetField("GasNaturalConsumo");
    }
    if (
      watchCombustibles.toString().indexOf("Gas Licuado (garrafa) (en kg)") ===
      -1
    ) {
      methods.resetField("GasLicuadoConsumo");
    }
    if (watchCombustibles.toString().indexOf("Leña (en kg)") === -1) {
      methods.resetField("LeñaConsumo");
    }
    if (watchCombustibles.toString().indexOf("Carbón (en kg)") === -1) {
      methods.resetField("CarbonConsumo");
    }
  }, [watchCombustibles]);

  return (
    <CCard className="cardComponent" ref={refDatos}>
      <CCardHeader className="headerCardDatosElecCombTransp">
        <BiHome size={75} className="iconHeader" />
        <p className="headerCardTitulo">Combustibles del hogar</p>
        <p className="headerCardSubtitulo">
          ¿Qué tipos de combustibles utilizás en mayor medida? (Respondé según
          tu consumo promedio anual)
        </p>
        <OverlayTrigger
          trigger="click"
          placement="auto" //antes era left
          rootClose
          overlay={popover}
        >
          <a>
            <AiOutlineQuestionCircle
              className="popoverSignoPregunta"
              size={51}
            />
          </a>
        </OverlayTrigger>
      </CCardHeader>
      <CCardBody className="bodyCard">
        <div className="displayF1">
          <div
            className="cardCombustible"
            style={
              {
                // display: "flex",
                // flexDirection: "column",
                // flex: 1,
                // backgroundColor: "red",
                // backgroundColor: "blue",
              }
            }
          >
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
                  {...methods.register("combustibleCheckbox")}
                  type="checkbox"
                  label="Gas Natural (en m3)"
                  value="Gas Natural (en m3)"
                  onFocus={() =>
                    refDatos.current.scrollIntoView({ block: "center" })
                  }
                  className="checkboxes"
                />
                Gas Natural (en m3)
              </label>
            </div>
            <div className="componentesIzquierda periodosGas">
              {constantes.bimensual12.map((periodo, key) => (
                <input
                  style={{
                    flexGrow: 1,
                    flexBasis: "320px",
                    marginBottom: 20,
                    marginRight: 20,
                  }}
                  {...methods.register("GasNaturalConsumo" + (key + 1))}
                  required
                  type="number"
                  step="0.01"
                  min={0}
                  disabled={
                    !watchCombustibles
                      .toString()
                      .includes("Gas Natural (en m3)")
                  }
                  key={key + 1}
                  name={"GasNaturalConsumo" + (key + 1)}
                  placeholder={"Período " + periodo}
                  className="inputTypeCardMed"
                  onFocus={() =>
                    refDatos.current.scrollIntoView({ block: "center" })
                  }
                />
              ))}
              {/* <input
                {...methods.register("GasNaturalConsumo")}
                type={isMobile ? "number" : "text"}
                step="0.01"
                disabled={
                  !watchCombustibles.toString().includes("Gas Natural (en m3)")
                }
                placeholder={"Indicá el consumo que figura en tu boleta"}
                onFocus={() =>
                  refDatos.current.scrollIntoView({ block: "center" })
                }
                className="inputTypeCardMed"
              /> */}
              <span>
                {(methods.formState.errors.GasNatrualConsumo1 ||
                  methods.formState.errors.GasNatrualConsumo2 ||
                  methods.formState.errors.GasNatrualConsumo3 ||
                  methods.formState.errors.GasNatrualConsumo4 ||
                  methods.formState.errors.GasNatrualConsumo5 ||
                  methods.formState.errors.GasNatrualConsumo6) &&
                  "Es necesario que ingreses un valor para cada período."}
                {/* {methods.formState.errors.Electricidad1?.message} */}
              </span>
              {/* <span>{methods.formState.errors.GasNaturalConsumo?.message}</span> */}
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
                  {...methods.register("combustibleCheckbox")}
                  type="checkbox"
                  label="Gas Licuado (garrafa) (en kg)"
                  value="Gas Licuado (garrafa) (en kg)"
                  onFocus={() =>
                    refDatos.current.scrollIntoView({ block: "center" })
                  }
                  className="checkboxes"
                />
                Gas Licuado (garrafa) (en kg)
              </label>
            </div>
            <div
              className="componentesIzquierda periodosGas"
              style={{ flexDirection: "column" }}
            >
              <input
                {...methods.register("GasLicuadoConsumo")}
                type={isMobile ? "number" : "text"}
                step="0.01"
                disabled={
                  !watchCombustibles
                    .toString()
                    .includes("Gas Licuado (garrafa) (en kg)")
                }
                name={"GasLicuadoConsumo"}
                placeholder={"Garrafa en kg"}
                defaultValue={undefined}
                onFocus={() =>
                  refDatos.current.scrollIntoView({ block: "center" })
                }
                className="inputTypeCardMed"
              />
              <span>{methods.formState.errors.GasLicuadoConsumo?.message}</span>
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
                  {...methods.register("combustibleCheckbox")}
                  type="checkbox"
                  label="Leña (en kg)"
                  value="Leña (en kg)"
                  onFocus={() =>
                    refDatos.current.scrollIntoView({ block: "center" })
                  }
                  className="checkboxes "
                />
                Leña (en kg)
              </label>
            </div>
            <div
              className="componentesIzquierda periodosGas"
              style={{ flexDirection: "column" }}
            >
              <input
                {...methods.register("LeñaConsumo")}
                type={isMobile ? "number" : "text"}
                step="0.01"
                min={0}
                className="inputTypeCardMed"
                disabled={
                  !watchCombustibles.toString().includes("Leña (en kg)")
                }
                name={"LeñaConsumo"}
                placeholder={"En kg"}
                defaultValue={undefined}
                onFocus={() =>
                  refDatos.current.scrollIntoView({ block: "center" })
                }
              />
              <span>{methods.formState.errors.LeñaConsumo?.message}</span>
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
                  {...methods.register("combustibleCheckbox")}
                  type="checkbox"
                  label="Carbón (en kg)"
                  value="Carbón (en kg)"
                  onFocus={() =>
                    refDatos.current.scrollIntoView({ block: "center" })
                  }
                  className="checkboxes"
                />
                Carbón (en kg)
              </label>
            </div>
            <div
              className="componentesIzquierda periodosGas"
              style={{ flexDirection: "column" }}
            >
              <input
                {...methods.register("CarbonConsumo")}
                type="number"
                step="0.01"
                min={0}
                className="inputTypeCardMed "
                disabled={
                  !watchCombustibles.toString().includes("Carbón (en kg)")
                }
                name={"CarbonConsumo"}
                placeholder={"En kg"}
                defaultValue={undefined}
                onFocus={() =>
                  refDatos.current.scrollIntoView({ block: "center" })
                }
              />
              <span>{methods.formState.errors.CarbonConsumo?.message}</span>
            </div>
          </div>
        </div>

        {methods.formState.errors.combustibleCheckbox && (
          <span>{methods.formState.errors.combustibleCheckbox.message}</span>
        )}
      </CCardBody>
    </CCard>
  );
}
