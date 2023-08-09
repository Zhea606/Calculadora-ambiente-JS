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

export function DatosTransporte() {
  const [tipoTransporte, setTipoTransporte] = useState({
    Bici: false,
    Moto_Auto: false,
    Colectivo: false,
    Avion: false,
  });
  const [tipoCombustible, setTipoCombustible] = useState({
    Nafta: false,
    Gasoil: false,
    GNC: false,
    Electrico: false,
  });
  const vehiculoElegido =
    tipoTransporte.Bici ||
    tipoTransporte.Moto_Auto ||
    tipoTransporte.Colectivo ||
    tipoTransporte.Avion;
  const combustibleElegido =
    tipoCombustible.Nafta ||
    tipoCombustible.Gasoil ||
    tipoCombustible.GNC ||
    tipoCombustible.Electrico;
  const methods = useFormContext();
  const refDatosHeader = useRef(null);
  const refDatosBici = useRef(null);
  const refDatosMotoAuto = useRef(null);
  const refDatosColectivo = useRef(null);
  const refDatosAvion = useRef(null);

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
      <CCardBody className="bodyCardTransporte      ">
        <label className="displayF1">
          <input
            type="checkbox"
            {...methods.register("BicicletaPieCheckbox")}
            defaultChecked={false}
            className="checkboxes "
            required={!vehiculoElegido}
            name="BicicletaPieCheckbox"
            label="Bicicleta / a pie"
            onChange={() => [
              setTipoTransporte({
                ...tipoTransporte,
                Bici: !tipoTransporte.Bici,
              }),
            ]}
            onFocus={() =>
              refDatosHeader.current.scrollIntoView({ block: "center" })
            }
          />
          Bicicleta / a pie jjj
        </label>
        <label className="displayF1">
          <input
            {...methods.register("MotocicletaAutoCheckbox")}
            defaultChecked={false}
            className="checkboxes"
            required={!vehiculoElegido}
            type="checkbox"
            name="MotocicletaAutoCheckbox"
            label="Motocicleta / Automóvil"
            onChange={() => [
              setTipoTransporte({
                ...tipoTransporte,
                Moto_Auto: !tipoTransporte.Moto_Auto,
              }),
            ]}
            onFocus={() =>
              refDatosHeader.current.scrollIntoView({ block: "center" })
            }
          />
          Motocicleta / Automóvil
        </label>
        <label className="displayF1">
          <input
            {...methods.register("ColectivoCheckbox")}
            defaultChecked={false}
            className="checkboxes"
            required={!vehiculoElegido}
            type="checkbox"
            name="ColectivoCheckbox"
            label="Colectivo"
            onChange={() => [
              setTipoTransporte({
                ...tipoTransporte,
                Colectivo: !tipoTransporte.Colectivo,
              }),
            ]}
            onFocus={() =>
              refDatosHeader.current.scrollIntoView({ block: "center" })
            }
          />
          Colectivo
        </label>
        <label className="displayF1">
          <input
            {...methods.register("AvionCheckbox")}
            defaultChecked={false}
            className="checkboxes"
            required={!vehiculoElegido}
            type="checkbox"
            name="AvionCheckbox"
            label="Avión"
            onChange={() => [
              setTipoTransporte({
                ...tipoTransporte,
                Avion: !tipoTransporte.Avion,
              }),
            ]}
            onFocus={() =>
              refDatosHeader.current.scrollIntoView({ block: "center" })
            }
          />
          Avión
        </label>
      </CCardBody>
      <CCardBody
        className="datosPersonaRenglon1"
        hidden={!tipoTransporte.Bici}
        ref={refDatosBici}
      >
        <div className="divEleccionTransporte">
          <p className="textTransporte">Bicicleta / a pie</p>
        </div>
        <input
          {...methods.register("BicicletaPieConsumo")}
          required={tipoTransporte.Bici}
          disabled={!tipoTransporte.Bici}
          type={isMobile ? "number" : "text"}
          step="0.01"
          min={1}
          name="BicicletaPieConsumo"
          placeholder="En km"
          defaultValue={undefined}
          onFocus={() =>
            refDatosBici.current.scrollIntoView({ block: "center" })
          }
          className="inputTypeCardMax consumoTransporte mb-3"
        />
      </CCardBody>
      <CCardBody
        className="cardBodyTransporte"
        ref={refDatosMotoAuto}
        hidden={!tipoTransporte.Moto_Auto}
      >
        <div className="displayF1">
          <div className="divEleccionTransporte">
            <p className="textTransporte">Motocicleta / Automóvil</p>
          </div>
          <div className="divPromedioAnual">
            <p className="textPromedioAnual">Promedio Anual</p>
            <hr className="classLine" />
            <OverlayTrigger
              trigger="click"
              placement="left"
              rootClose
              overlay={popover}
            >
              <a>
                <AiOutlineQuestionCircle className="displayF1" size={50} />
              </a>
            </OverlayTrigger>
          </div>
        </div>
        <div>
          <p className="textPromedioAnual">
            Combustible que utiliza el vehículo
          </p>
          <div className="rowCheckboxes">
            <label className="displayF1 mb-3">
              <input
                {...methods.register("NaftaCheckbox")}
                defaultChecked={false}
                disabled={
                  (combustibleElegido && !tipoCombustible.Nafta) ||
                  !tipoTransporte.Moto_Auto
                }
                className="checkboxes"
                type="checkbox"
                name="NaftaCheckbox"
                label="Nafta"
                onChange={() => [
                  setTipoCombustible({
                    ...tipoCombustible,
                    Nafta: !tipoCombustible.Nafta,
                  }),
                ]}
                onFocus={() =>
                  refDatosMotoAuto.current.scrollIntoView({
                    block: "center",
                  })
                }
              />
              Nafta
            </label>
            <label className="displayF1 mb-3">
              <input
                {...methods.register("GasoilCheckbox")}
                defaultChecked={false}
                disabled={
                  (combustibleElegido && !tipoCombustible.Gasoil) ||
                  !tipoTransporte.Moto_Auto
                }
                className="checkboxes"
                type="checkbox"
                name="GasoilCheckbox"
                label="Gasoil"
                onChange={() => [
                  setTipoCombustible({
                    ...tipoCombustible,
                    Gasoil: !tipoCombustible.Gasoil,
                  }),
                ]}
                onFocus={() =>
                  refDatosMotoAuto.current.scrollIntoView({
                    block: "center",
                  })
                }
              />
              Gasoil
            </label>
            <label className="displayF1 mb-3">
              <input
                {...methods.register("GNCCheckbox")}
                defaultChecked={false}
                disabled={
                  (combustibleElegido && !tipoCombustible.GNC) ||
                  !tipoTransporte.Moto_Auto
                }
                className="checkboxes"
                type="checkbox"
                name="GNCCheckbox"
                label="GNC"
                onChange={() => [
                  setTipoCombustible({
                    ...tipoCombustible,
                    GNC: !tipoCombustible.GNC,
                  }),
                ]}
                onFocus={() =>
                  refDatosMotoAuto.current.scrollIntoView({
                    block: "center",
                  })
                }
              />
              GNC
            </label>
            <label className="displayF1 mb-3">
              <input
                {...methods.register("ElectricoCheckbox")}
                defaultChecked={false}
                disabled={
                  (combustibleElegido && !tipoCombustible.Electrico) ||
                  !tipoTransporte.Moto_Auto
                }
                className="checkboxes"
                type="checkbox"
                name="ElectricoCheckbox"
                label="Eléctrico"
                onChange={() => [
                  setTipoCombustible({
                    ...tipoCombustible,
                    Electrico: !tipoCombustible.Electrico,
                  }),
                ]}
                onFocus={() =>
                  refDatosMotoAuto.current.scrollIntoView({
                    block: "center",
                  })
                }
              />
              Eléctrico
            </label>
          </div>
        </div>
        <div className="displayF1">
          <label className="displayF1" style={{ flexDirection: "column" }}>
            <p>
              <strong className="inputLabel">
                Consumo del vehículo cada 100km
              </strong>
              <br />
              (l/100km, m3/100km o kWh/100km)
            </p>
            <input
              {...methods.register("consumoVehiculo")}
              required={combustibleElegido}
              disabled={!combustibleElegido}
              type={isMobile ? "number" : "text"}
              step="0.01"
              min={1}
              name="consumoVehiculo"
              placeholder=""
              defaultValue={undefined}
              onFocus={() =>
                refDatosMotoAuto.current.scrollIntoView({ block: "center" })
              }
              className="inputTypeCard mb-5"
            />
          </label>
          <label className="displayF1" style={{ flexDirection: "column" }}>
            <p>
              <strong className="inputLabel">Kilómetros Anuales</strong>
              <br />
              <br />
            </p>
            <input
              {...methods.register("kilometrosAnuales")}
              required={combustibleElegido}
              disabled={!combustibleElegido}
              type={isMobile ? "number" : "text"}
              step="0.01"
              min={1}
              name="kilometrosAnuales"
              placeholder=""
              defaultValue={undefined}
              onFocus={() =>
                refDatosMotoAuto.current.scrollIntoView({ block: "center" })
              }
              className="inputTypeCard mb-5"
            />
          </label>
          <label className="displayF1" style={{ flexDirection: "column" }}>
            <p>
              <strong className="inputLabel">
                Cantidad de personas que viajan generalmente
              </strong>
              <br />
              <br />
            </p>
            <input
              {...methods.register("personasViaje")}
              required={combustibleElegido}
              disabled={!combustibleElegido}
              type={isMobile ? "number" : "text"}
              step="0.01"
              min={1}
              name="personasViaje"
              placeholder=""
              defaultValue={undefined}
              onFocus={() =>
                refDatosMotoAuto.current.scrollIntoView({ block: "center" })
              }
              className="inputTypeCard mb-5"
            />
          </label>
        </div>
      </CCardBody>
      <CCardBody
        className="cardBodyTransporte"
        ref={refDatosColectivo}
        hidden={!tipoTransporte.Colectivo}
      >
        <div className="displayF1">
          <div className="divEleccionTransporte">
            <p className="textTransporte">Colectivo</p>
          </div>
          <div className="f2" />
        </div>
        <div className="displayF1">
          <label className="displayF1" style={{ flexDirection: "column" }}>
            <p className="inputLabel">Cantidad de viajes por semana</p>
            <input
              {...methods.register("viajesSemana")}
              required={tipoTransporte.Colectivo}
              disabled={!tipoTransporte.Colectivo}
              type={isMobile ? "number" : "text"}
              step="0.01"
              min={1}
              name="viajesSemana"
              placeholder=""
              defaultValue={undefined}
              onFocus={() =>
                refDatosColectivo.current.scrollIntoView({
                  block: "center",
                })
              }
              className="inputTypeCard displayF1 mb-5"
            />
          </label>
          <label className="displayF1" style={{ flexDirection: "column" }}>
            <p className="inputLabel">Recorrido medio por viaje en km</p>
            <input
              {...methods.register("viajeKilometros")}
              required={tipoTransporte.Colectivo}
              disabled={!tipoTransporte.Colectivo}
              type={isMobile ? "number" : "text"}
              step="0.01"
              min={1}
              name="viajeKilometros"
              placeholder=""
              defaultValue={undefined}
              onFocus={() =>
                refDatosColectivo.current.scrollIntoView({
                  block: "center",
                })
              }
              className="inputTypeCard displayF1 mb-5"
            />
          </label>
          <label className="displayF1" style={{ flexDirection: "column" }}>
            <p className="inputLabel">Cantidad de meses que realizas viajes</p>
            <input
              {...methods.register("viajeMeses")}
              required={tipoTransporte.Colectivo}
              disabled={!tipoTransporte.Colectivo}
              type={isMobile ? "number" : "text"}
              step="0.01"
              maxLength={2}
              min={1}
              max={12}
              name="viajeMeses"
              placeholder=""
              defaultValue={undefined}
              onFocus={() =>
                refDatosColectivo.current.scrollIntoView({
                  block: "center",
                })
              }
              className="inputTypeCard displayF1 mb-5"
            />
          </label>
        </div>
      </CCardBody>
      <CCardBody
        className="cardBodyTransporte"
        ref={refDatosAvion}
        hidden={!tipoTransporte.Avion}
      >
        <div className="displayF1">
          <div className="divEleccionTransporte">
            <p className="textTransporte">Avión</p>
          </div>
          <div className="f2" />
        </div>
        <div className="displayF1">
          <label className="displayF1" style={{ flexDirection: "column" }}>
            <p className="inputLabel">
              Kilómetros recorridos (promedio de un año)
            </p>
            <input
              {...methods.register("kilometrosAño")}
              required={tipoTransporte.Avion}
              disabled={!tipoTransporte.Avion}
              type={isMobile ? "number" : "text"}
              step="0.01"
              min={1}
              name="kilometrosAño"
              placeholder=""
              defaultValue={undefined}
              onFocus={() =>
                refDatosAvion.current.scrollIntoView({ block: "center" })
              }
              className="inputTypeCardMed displayF1 mb-5"
            />
          </label>
          <label className="displayF1" style={{ flexDirection: "column" }}>
            <p className="inputLabel">Cantidad de escalas</p>
            <input
              {...methods.register("cantidadEscalas")}
              required={tipoTransporte.Avion}
              disabled={!tipoTransporte.Avion}
              type={isMobile ? "number" : "text"}
              step="0.01"
              min={1}
              name="cantidadEscalas"
              placeholder=""
              defaultValue={undefined}
              onFocus={() =>
                refDatosAvion.current.scrollIntoView({ block: "center" })
              }
              className="inputTypeCardMed displayF1 mb-5"
            />
          </label>
        </div>
      </CCardBody>
    </CCard>
  );
}
