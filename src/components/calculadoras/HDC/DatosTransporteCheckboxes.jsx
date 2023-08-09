import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { isMobile } from "react-device-detect";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  // CPopover,
  CRow,
} from "@coreui/react";
import { BiBus } from "react-icons/bi";
import { Controller, useFormContext } from "react-hook-form";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FaRegChartBar } from "react-icons/fa";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";

export function DatosTransporteCheckboxes() {
  const methods = useFormContext();
  const refDatosHeader = useRef(null);
  const refDatosBici = useRef(null);
  const refDatosMotoAuto = useRef(null);
  const refDatosColectivo = useRef(null);
  const refDatosAvion = useRef(null);
  const watchTransporte = methods.watch("transporteCheckbox", "");
  const watchCombustibles = methods.watch("combustibleRadio");

  useEffect(() => {
    if (watchTransporte.toString().indexOf("Bicicleta / a pie") === -1) {
      methods.resetField("BicicletaPieConsumo");
    }
    if (watchTransporte.toString().indexOf("Motocicleta / Automóvil") === -1) {
      methods.resetField("combustibleRadio");
      methods.resetField("consumoVehiculoMotoAuto");
      methods.resetField("kilometrosAnualesMotoAuto");
      methods.resetField("personasViajeMotoAuto");
    }
    if (watchTransporte.toString().indexOf("Colectivo") === -1) {
      methods.resetField("viajesSemanaColectivo");
      methods.resetField("viajeKilometrosColectivo");
      methods.resetField("viajeMesesColectivo");
    }
    if (watchTransporte.toString().indexOf("Avión") === -1) {
      methods.resetField("kilometrosAñoAvion");
      methods.resetField("cantidadEscalasAvion");
    }
  }, [watchTransporte]);

  const popover = (
    <Popover id="popover-transporte" className="transportePopover">
      <Popover.Header as="h3" className="tituloPopover">
        ¿Cómo lo calculo?
      </Popover.Header>
      <Popover.Body>
        <p className="popoverBodyTransporte">
          <strong className="popoverBodyElectricidad">Opción 1: </strong>
          Podés visualizarlo en el tablero de manera automática.
        </p>
        <p className="popoverBodyTransporte">
          <strong className="popoverBodyElectricidad">Opción 2: </strong>
          Llená el tanque y anotá la cantidad de litros que entraron. Colocá el
          cuenta kilómetros en 0. En el caso de no tener anotá la cantidad de km
          que aparecen. Circulá con normalidad hasta que se active la reserva y
          anotá la cantida de km que hiciste hasta el momento
        </p>
      </Popover.Body>
      <Popover.Body className="popoverBodyCuentasTransporte">
        <p className="popoverBodyTransporte"> El cálculo es:</p>
        <p className="popoverBodyTransporte">
          (N° de litos / km recorridos) x 100 ={" "}
          <strong style={{ fontFamily: "TitilliumBold" }}>
            consumo de combustible cada 100 km
          </strong>
        </p>
        <p className="popoverBodyTransporte">¿Cómo realizar la estimación?</p>
        <p className="popoverBodyTransporte">
          (Sumá los km reccorridos que realizar por día) x (cantidad de días que
          realizás viajes){" "}
          <strong
            style={{
              fontFamily: "TitilliumBold",
            }}
          >
            = Cantidad de km semanales
          </strong>
        </p>
        <p className="popoverBodyTransporte">
          Luego, (cantidad de km semanales) x 4{" "}
          <strong
            style={{
              fontFamily: "TitilliumBold",
            }}
          >
            = km mensuales
          </strong>
        </p>
        <p className="popoverBodyTransporte">
          (km mensuales) x 12{" "}
          <strong
            style={{
              fontFamily: "TitilliumBold",
            }}
          >
            = km anuales
          </strong>
        </p>
        <p className="popoverBodyTransporte">
          En caso de no saber los km recorridos, colocá 10000 como valor
          promedio
        </p>
      </Popover.Body>
    </Popover>
  );

  return (
    <CCard className="cardComponent">
      <CCardHeader
        className="headerCardDatosElecCombTransp"
        ref={refDatosHeader}
      >
        <BiBus size={75} className="iconHeader" />
        <p className="headerCardTitulo">Transporte</p>
        <p className="headerCardSubtitulo">
          ¿Qué medios de transporte utilizas?
        </p>
      </CCardHeader>
      <CCardBody className="bodyCardTransporte ">
        <label className="displayF1 checkboxes1 ">
          <input
            type="checkbox"
            {...methods.register("transporteCheckbox")}
            className="checkboxes "
            value="Bicicleta / a pie"
            label="Bicicleta / a pie"
            onFocus={() =>
              refDatosHeader.current.scrollIntoView({ block: "center" })
            }
          />
          Bicicleta / a pie
        </label>
        <label className="displayF1 checkboxes1">
          <input
            type="checkbox"
            {...methods.register("transporteCheckbox")}
            className="checkboxes"
            value="Motocicleta / Automóvil"
            label="Motocicleta / Automóvil"
            onFocus={() =>
              refDatosHeader.current.scrollIntoView({ block: "center" })
            }
          />
          Motocicleta / Automóvil
        </label>
        <label className="displayF1 checkboxes1">
          <input
            type="checkbox"
            {...methods.register("transporteCheckbox")}
            className="checkboxes"
            value="Colectivo"
            label="Colectivo"
            onFocus={() =>
              refDatosHeader.current.scrollIntoView({ block: "center" })
            }
          />
          Colectivo
        </label>
        <label className="displayF1 checkboxes1">
          <input
            type="checkbox"
            {...methods.register("transporteCheckbox")}
            className="checkboxes"
            value="Avión"
            label="Avión"
            onFocus={() =>
              refDatosHeader.current.scrollIntoView({ block: "center" })
            }
          />
          Avión
        </label>
      </CCardBody>
      <CCardBody
        className="datosPersonaRenglon1"
        // style={{ alignContent: "center", alignItems: "center" }}
        hidden={!watchTransporte.toString().includes("Bicicleta / a pie")}
        ref={refDatosBici}
      >
        <div className="divEleccionTransporte ">
          <p className="textTransporte textTransporteBici">Bicicleta / a pie</p>
        </div>

        <input
          {...methods.register("BicicletaPieConsumo")}
          type={isMobile ? "number" : "text"}
          step="0.01"
          min={1}
          name="BicicletaPieConsumo"
          placeholder="En km"
          onFocus={() =>
            refDatosBici.current.scrollIntoView({ block: "center" })
          }
          className="inputTypeCardMax consumoTransporte"
        />
      </CCardBody>
      <span>{methods.formState.errors.BicicletaPieConsumo?.message}</span>
      <CCardBody
        className="cardBodyTransporte"
        hidden={!watchTransporte.toString().includes("Motocicleta / Automóvil")}
        ref={refDatosMotoAuto}
      >
        <div className="displayTransp">
          <div className="divEleccionTransporte">
            <p className="textTransporte textTransporteMoto">
              Motocicleta / Automóvil
            </p>
          </div>
          <div className="divPromedioAnual">
            <p className="textPromedioAnual">Promedio Anual</p>
            <hr className="classLine" />
            <OverlayTrigger
              trigger="click"
              placement="bottom-start" //left
              rootClose
              overlay={popover}
            >
              <a>
                <AiOutlineQuestionCircle
                  className="displayF1 signoPregunta"
                  size={50}
                />
              </a>
            </OverlayTrigger>
          </div>
        </div>
        <div>
          <p className="textPromedioAnual">
            Combustible que utiliza el vehículo
          </p>
          <div className="rowCheckboxes">
            <label className="displayRadios mb-3">
              <input
                {...methods.register("combustibleRadio")}
                className="radios"
                type="radio"
                id="Nafta"
                label="Nafta"
                value="Nafta"
                onFocus={() =>
                  refDatosMotoAuto.current.scrollIntoView({
                    block: "center",
                  })
                }
              />
              Nafta
            </label>
            <label className="displayRadios mb-3">
              <input
                {...methods.register("combustibleRadio")}
                className="radios"
                type="radio"
                id="Gasoil"
                label="Gasoil"
                value="Gasoil"
                onFocus={() =>
                  refDatosMotoAuto.current.scrollIntoView({
                    block: "center",
                  })
                }
              />
              Gasoil
            </label>
            <label className="displayRadios mb-3">
              <input
                {...methods.register("combustibleRadio")}
                className="radios"
                type="radio"
                id="GNC"
                label="GNC"
                value="GNC"
                onFocus={() =>
                  refDatosMotoAuto.current.scrollIntoView({
                    block: "center",
                  })
                }
              />
              GNC
            </label>
            <label className="displayRadios mb-3">
              <input
                {...methods.register("combustibleRadio")}
                className="radios"
                type="radio"
                id="Eléctrico"
                label="Eléctrico"
                value="Eléctrico"
                onFocus={() =>
                  refDatosMotoAuto.current.scrollIntoView({
                    block: "center",
                  })
                }
              />
              Eléctrico
            </label>
          </div>
          <div className="displayF1">
            <span>{methods.formState.errors.combustibleRadio?.message}</span>
          </div>
        </div>
        <div className="displayF1" style={{ marginLeft: -25 }}>
          <label className="displayF1" style={{ flexDirection: "column" }}>
            <p>
              <strong className="inputLabel">
                Consumo del vehículo cada 100km
              </strong>
              <br />
              (l/100km, m3/100km o kWh/100km)
            </p>
            <input
              {...methods.register("consumoVehiculoMotoAuto")}
              disabled={!watchCombustibles}
              type="number"
              step="0.01"
              min={1}
              placeholder=""
              defaultValue={undefined}
              onFocus={() =>
                refDatosMotoAuto.current.scrollIntoView({ block: "center" })
              }
              className="inputTypeCard"
            />
            <span>
              {methods.formState.errors.consumoVehiculoMotoAuto?.message}
            </span>
          </label>

          <label className="displayF1" style={{ flexDirection: "column" }}>
            <p>
              <strong className="inputLabel ">Kilómetros Anuales</strong>
              <br />
              <br />
            </p>
            <input
              {...methods.register("kilometrosAnualesMotoAuto")}
              disabled={!watchCombustibles}
              type="number"
              step="0.01"
              min={1}
              placeholder=""
              defaultValue={undefined}
              onFocus={() =>
                refDatosMotoAuto.current.scrollIntoView({ block: "center" })
              }
              className="inputTypeCard "
            />
            <span>
              {methods.formState.errors.kilometrosAnualesMotoAuto?.message}
            </span>
          </label>
          <label className="displayF1" style={{ flexDirection: "column" }}>
            <p>
              <strong className="inputLabel">
                Cantidad de personas que viajan generalmente
              </strong>
            </p>
            <input
              {...methods.register("personasViajeMotoAuto")}
              disabled={!watchCombustibles}
              type="number"
              step="0.01"
              min={1}
              placeholder=""
              defaultValue={undefined}
              onFocus={() =>
                refDatosMotoAuto.current.scrollIntoView({ block: "center" })
              }
              className="inputTypeCard "
            />
            <span>
              {methods.formState.errors.personasViajeMotoAuto?.message}
            </span>
          </label>
        </div>
      </CCardBody>
      <CCardBody
        className="cardBodyTransporte"
        ref={refDatosColectivo}
        hidden={!watchTransporte.toString().includes("Colectivo")}
      >
        <div className="displayTransp">
          <div className="divEleccionTransporte ">
            <p className="textTransporte">Colectivo</p>
          </div>
          <div className="f2" />
        </div>
        <div className="displayF1" style={{ marginLeft: -25 }}>
          <label className="displayF1" style={{ flexDirection: "column" }}>
            <p className="inputLabel">Cantidad de viajes por semana</p>
            <input
              {...methods.register("viajesSemanaColectivo")}
              disabled={!watchTransporte.toString().includes("Colectivo")}
              type="number"
              step="0.01"
              min={1}
              placeholder=""
              defaultValue={undefined}
              onFocus={() =>
                refDatosColectivo.current.scrollIntoView({
                  block: "center",
                })
              }
              className="inputTypeCard "
            />
            <span>
              {methods.formState.errors.viajesSemanaColectivo?.message}
            </span>
          </label>
          <label className="displayF1" style={{ flexDirection: "column" }}>
            <p className="inputLabel">Recorrido medio por viaje en km</p>
            <input
              {...methods.register("viajeKilometrosColectivo")}
              disabled={!watchTransporte.toString().includes("Colectivo")}
              type="number"
              step="0.01"
              min={1}
              placeholder=""
              defaultValue={undefined}
              onFocus={() =>
                refDatosColectivo.current.scrollIntoView({
                  block: "center",
                })
              }
              className="inputTypeCard "
            />
            <span>
              {methods.formState.errors.viajeKilometrosColectivo?.message}
            </span>
          </label>
          <label className="displayF1" style={{ flexDirection: "column" }}>
            <p className="inputLabel">Cantidad de meses que realizas viajes</p>
            <input
              {...methods.register("viajeMesesColectivo")}
              disabled={!watchTransporte.toString().includes("Colectivo")}
              type="number"
              step="0.01"
              maxLength={2}
              placeholder=""
              defaultValue={undefined}
              onFocus={() =>
                refDatosColectivo.current.scrollIntoView({
                  block: "center",
                })
              }
              className="inputTypeCard "
            />
            <span>{methods.formState.errors.viajeMesesColectivo?.message}</span>
          </label>
        </div>
      </CCardBody>
      <CCardBody
        className="cardBodyTransporte"
        ref={refDatosAvion}
        hidden={!watchTransporte.toString().includes("Avión")}
      >
        <div className="displayTransp">
          <div className="divEleccionTransporte">
            <p className="textTransporte">Avión</p>
          </div>
          <div className="f2" />
        </div>
        <div className="displayF1" style={{ marginLeft: -25 }}>
          <label className="displayF1" style={{ flexDirection: "column" }}>
            <p className="inputLabel">
              Kilómetros recorridos (promedio de un año)
            </p>
            <input
              {...methods.register("kilometrosAñoAvion")}
              disabled={!watchTransporte.toString().includes("Avión")}
              type="number"
              step="0.01"
              min={1}
              placeholder=""
              defaultValue={undefined}
              onFocus={() =>
                refDatosAvion.current.scrollIntoView({ block: "center" })
              }
              className="inputTypeCardMed "
            />
            <span>{methods.formState.errors.kilometrosAñoAvion?.message}</span>
          </label>
          <label className="displayF1" style={{ flexDirection: "column" }}>
            <p className="inputLabel">Cantidad de escalas</p>
            <input
              {...methods.register("cantidadEscalasAvion")}
              disabled={!watchTransporte.toString().includes("Avión")}
              type="number"
              step="0.01"
              min={1}
              placeholder=""
              defaultValue={undefined}
              onFocus={() =>
                refDatosAvion.current.scrollIntoView({ block: "center" })
              }
              className="inputTypeCardMed "
            />
            <span>
              {methods.formState.errors.cantidadEscalasAvion?.message}
            </span>
          </label>
        </div>
      </CCardBody>
      <span style={{ backgroundColor: "#dadada" }}>
        {methods.formState.errors.transporteCheckbox?.message}
      </span>
    </CCard>
  );
}
