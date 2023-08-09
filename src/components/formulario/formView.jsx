import React, { useEffect, useState } from "react";
import { graficoResultados } from "../graficos/graficoResultados";
import ModalError from "../modalError/modalError";
import { useSelector, useDispatch } from "react-redux";
import {
  selectValueState,
  mostrarModal,
} from "../../redux/features/valueSlice";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import { isMobile } from "react-device-detect";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import constantes from "../../constants";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { FaCalculator } from "react-icons/fa";
import { MdLightbulbOutline } from "react-icons/md";
import { BiHome, BiBus } from "react-icons/bi";
import arrow from "../../assets/arrowUp.png";
import { DatosPersona } from "../calculadoras/HDC/DatosPersona";
import { FormProvider, useFormContext } from "react-hook-form";

export function FormView() {
  //   const { handleSubmit } = useFormContext();
  //#region constantes
  const unCheckboxCombHogar = [""];
  const [checkedCombHogar, setCheckedCombHogar] = useState(false);
  const unCheckboxCombVehiculo = [""];
  const [checkedCombVehiculo, setCheckedCombVehiculo] = useState(false);
  const [tipoReciclaje, setTipoReciclaje] = useState("");
  const [tipoDieta, setTipoDieta] = useState("");
  const [tipoCombustibleHogar, setTipoCombustibleHogar] = useState({
    GN: false,
    GL: false,
    Leña: false,
    Carbon: false,
  });
  const [tipoTransporte, setTipoTransporte] = useState({
    Bici: false,
    Moto_Auto: false,
    Colectivo: false,
  });
  const [persona, setPersona] = useState({
    localidad: "",
  });
  const [motoAuto, setMotoAuto] = useState({
    combustible: "",
  });
  const [avion, setAvion] = useState({
    uso: "",
  });
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [perro, setPerro] = useState(false);
  function checkear(name) {
    unCheckboxCombHogar.includes("")
      ? unCheckboxCombHogar.splice(unCheckboxCombHogar.indexOf(""), 1)
      : null;

    unCheckboxCombHogar.includes(name)
      ? unCheckboxCombHogar.splice(unCheckboxCombHogar.indexOf(name), 1)
      : unCheckboxCombHogar.push(name);

    setCheckedCombHogar(unCheckboxCombHogar.length > 0);
  }
  function checkearVehiculo(name) {
    unCheckboxCombVehiculo.includes("")
      ? unCheckboxCombVehiculo.splice(unCheckboxCombVehiculo.indexOf(""), 1)
      : null;

    unCheckboxCombVehiculo.includes(name)
      ? unCheckboxCombVehiculo.splice(unCheckboxCombVehiculo.indexOf(name), 1)
      : unCheckboxCombVehiculo.push(name);

    setCheckedCombVehiculo(unCheckboxCombVehiculo.length > 0);
  }
  const [validacion, setValidacion] = useState(false);
  const [carbon, setCarbon] = useState(0);
  const [leña, setLeña] = useState(0);
  const [gasNatural, setGasNatural] = useState(0);
  const [gasLiquido, setGasLiquido] = useState(0);
  const [consumoElectrico, setConsumoElectrico] = useState(0);
  const [bici_pie, setBici_pie] = useState(0);
  const [moto_auto, setMoto_auto] = useState(0);
  const [colectivo, setColectivo] = useState(0);
  const [avionViaje, setAvionViaje] = useState(0);
  const [reciclaje, setReciclaje] = useState("");
  const [reciclajeValor, setReciclajeValor] = useState(0);
  const [dieta, setDieta] = useState("");
  const [dietaValor, setDietaValor] = useState(0);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [seccion, setSeccion] = useState("");
  const [convivientes, setConvivientes] = useState(0);

  const token = import.meta.env.VITE_APITOKEN;
  const urlBK = import.meta.env.VITE_BK;
  const axiosConfig = {
    headers: {
      token: token,
      "Content-Type": "multipart/form-data",
    },
  };
  //#endregion
  const variant = useSelector(selectValueState);
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      dispatch(mostrarModal(true));
    } else {
      setNombre(form.nombre.value);
      setCorreo(form.correo.value);
      setLocalidad(form.localidad.value);
      setSeccion(form.seccion.value);
      setConvivientes(form.convivientes.value);
      setConsumoElectrico(
        ((parseFloat(form.Electricidad0.value) +
          parseFloat(form.Electricidad1.value) +
          parseFloat(form.Electricidad2.value) +
          parseFloat(form.Electricidad3.value) +
          parseFloat(form.Electricidad4.value) +
          parseFloat(form.Electricidad5.value)) *
          constantes.factorEmisionElectricidad) /
          parseFloat(form.convivientes.value)
      );

      form.GN.checked
        ? setGasNatural(
            (parseFloat(form.GasNaturalConsumo) *
              constantes.factorEmisionCombustibleHogar.GN) /
              parseFloat(form.convivientes.value)
          )
        : setGasNatural(0);
      form.GL.checked
        ? setGasLiquido(
            (parseFloat(form.GasLicuadoConsumo.value) *
              12 *
              constantes.factorEmisionCombustibleHogar.GL) /
              parseFloat(form.convivientes.value)
          )
        : setGasLiquido(0);
      form.Leña.checked
        ? setLeña(
            (parseFloat(form.LeñaConsumo.value) *
              12 *
              constantes.factorEmisionCombustibleHogar.LEÑA) /
              parseFloat(form.convivientes.value)
          )
        : setLeña(0);
      form.Carbon.checked
        ? setCarbon(
            (parseFloat(form.CarbonConsumo.value) *
              12 *
              constantes.factorEmisionCombustibleHogar.CARBON) /
              parseFloat(form.convivientes.value)
          )
        : setCarbon(0);

      form.Bici_Pie.checked
        ? setBici_pie(parseFloat(form.Bici_PieKm.value))
        : setBici_pie(0);
      let FECOMB =
        form.tipoCombustibleVehiculo.value == "Eléctrico"
          ? constantes.factorEmisionCombustibleVehiculo.ELECTRICIDAD
          : form.tipoCombustibleVehiculo.value == "Gasoil"
          ? constantes.factorEmisionCombustibleVehiculo.GASOIL
          : form.tipoCombustibleVehiculo.value == "GNC"
          ? constantes.factorEmisionCombustibleVehiculo.GNC
          : constantes.factorEmisionCombustibleVehiculo.NAFTA;
      form.Motocicleta_Automóvil.checked
        ? setMoto_auto(
            (parseFloat(form.Auto_MotoKm.value) *
              (1 / parseFloat(form.ConsumoAuto_Moto.value)) *
              FECOMB) /
              1000 /
              parseFloat(form.PersonasXViajeAuto_Moto.value)
          )
        : setMoto_auto(0);
      form.Colectivo.checked
        ? setColectivo(
            (parseFloat(form.ColectivoViajesXSemana.value) *
              (parseFloat(form.ColectivoMeses.value) * 4) *
              parseFloat(form.ColectivoKm.value) *
              (1 / 2.5) *
              constantes.factorEmisionCombustibleVehiculo.GASOIL) /
              (1000 * 20)
          )
        : setColectivo(0);

      form.radioAvionSi.checked
        ? setAvionViaje(
            (((parseFloat(form.AvionKm.value) * constantes.cruise +
              parseFloat(form.AvionEscalas.value) * constantes.lto) /
              constantes.densidad /
              constantes.capacidad /
              constantes.ocupacion) *
              2 *
              constantes.factorEmisionCombustibleVehiculo.AEROKEROSEN) /
              1000
          )
        : setAvionViaje(0);
      setReciclaje(form.reciclaje.value);

      form.reciclaje1.checked
        ? setReciclajeValor(
            (constantes.factorEmisionReciclaje.Nada *
              constantes.kg_hab_dia *
              constantes.kgCO2_kgresiduos *
              365) /
              1000
          )
        : form.reciclaje2.checked
        ? setReciclajeValor(
            (constantes.factorEmisionReciclaje.Algo *
              constantes.kg_hab_dia *
              constantes.kgCO2_kgresiduos *
              365) /
              1000
          )
        : form.reciclaje3.checked
        ? setReciclajeValor(
            (constantes.factorEmisionReciclaje.Separo_algunos *
              constantes.kg_hab_dia *
              constantes.kgCO2_kgresiduos *
              365) /
              1000
          )
        : setReciclajeValor(
            (constantes.factorEmisionReciclaje.Separo_todo *
              constantes.kg_hab_dia *
              constantes.kgCO2_kgresiduos *
              365) /
              1000
          );

      setDieta(form.dieta.value);

      form.dieta1.checked
        ? setDietaValor(constantes.factorEmisionDieta.MuyCarnivoro)
        : form.dieta2.checked
        ? setDietaValor(constantes.factorEmisionDieta.Carnivoro)
        : form.dieta3.checked
        ? setDietaValor(constantes.factorEmisionDieta.Equilibrada)
        : form.dieta4.checked
        ? setDietaValor(constantes.factorEmisionDieta.Vegetariano)
        : setDietaValor(constantes.factorEmisionDieta.Vegano);

      setMostrarResultados(true);
      setPerro(true);
    }
    setValidacion(true);
  }

  function enviarInfoPersona() {
    axios
      .post(
        urlBK + "/api/guardarPersona",
        {
          nombre: nombre,
          correo: correo,
          localidad: localidad,
          seccion: seccion,
          convivientes: convivientes,
        },
        axiosConfig
      )
      .then(async (response) => {
        await response.data;
        console.log(response.data);
        return response.data;
      })
      .catch(async (error) => {
        return await error;
      });
  }
  function enviarInfoHDC() {
    const cartTotal =
      gasNatural +
      gasLiquido +
      leña +
      carbon +
      consumoElectrico +
      moto_auto +
      colectivo +
      avionViaje +
      reciclajeValor +
      dietaValor;
    axios
      .post(
        urlBK + "/api/guardarHDC",
        {
          correo: correo,
          combustible: parseFloat(
            (gasNatural + gasLiquido + leña + carbon).toFixed(2)
          ),
          electricidad: parseFloat(consumoElectrico.toFixed(2)),
          transporte: parseFloat((moto_auto + colectivo).toFixed(2)),
          viajesAereos: parseFloat(avionViaje.toFixed(2)),
          residuos: parseFloat(reciclajeValor.toFixed(2)),
          alimentacion: parseFloat(dietaValor.toFixed(2)),
          arbolesNecesarios: Math.round(
            parseFloat((cartTotal / 0.167).toFixed(2))
          ),
          tCO2e: parseFloat(cartTotal.toFixed(2)),
        },
        axiosConfig
      )
      .then(async (response) => {
        await response.data;
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        return error;
      });

    return;
  }
  //DATOS DESDE https://datosmacro.expansion.com/energia-y-medio-ambiente/emisiones-co2

  useEffect(() => {
    if (perro) {
      enviarInfoPersona();
      setTimeout(() => enviarInfoHDC(), 100);
      setPerro(false);
    }
  }, [perro]);
  return (
    <FormProvider>
      <CRow>
        <CCol>
          <CCard className="cardComponent">
            <CCardHeader
              className="headerCardDatosElecCombTransp"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <MdLightbulbOutline style={{ flex: 0.2, fontSize: 75 }} />
              <p style={{ flex: 1 }} className="headerCardTitulo">
                Consumo Eléctrico
              </p>
              <p style={{ flex: 1 }} className="headerCardSubtitulo">
                Indicá el consumo de electricidad bimensual de tu vivienda en
                kWh (solo del año 2022)
              </p>
            </CCardHeader>
            <CCardBody className="bodyCard">
              <Form.Group
                className="mb-3"
                controlId="formBasicConsumoEléctrico1"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <div style={{ flex: 1, marginRight: "1%" }}>
                  {constantes.bimensual0_6.map((periodo, key) => (
                    <div key={periodo}>
                      <Form.Control
                        required
                        style={{
                          marginTop: 5,
                          marginBottom: 10,
                          fontSize: isMobile ? "90%" : "130%",
                          textAlign: "justify",
                        }}
                        type={isMobile ? "number" : "text"}
                        step="0.01"
                        maxLength={10}
                        min={0}
                        key={key}
                        name={"Electricidad" + key}
                        placeholder={"Período " + periodo}
                        onKeyDown={(event) => {
                          if (
                            /[a-z]/.test(event.key) &&
                            !/Backspace/.test(event.code) &&
                            !/Period/.test(event.code) &&
                            !/NumpadDecimal/.test(event.code)
                          ) {
                            event.preventDefault();
                          }
                        }}
                        className="inputTypeCard"
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        key={key + constantes.bimensual0_6.length}
                      >
                        Debe ingresar información para {periodo}
                      </Form.Control.Feedback>
                    </div>
                  ))}
                </div>
                <div style={{ flex: 1 }}>
                  {constantes.bimensual7_12.map((periodo, key) => (
                    <div key={periodo}>
                      <Form.Control
                        required
                        style={{
                          marginTop: 5,
                          marginBottom: 10,
                          fontSize: isMobile ? "90%" : "130%",
                          textAlign: "justify",
                        }}
                        type={isMobile ? "number" : "text"}
                        step="0.01"
                        maxLength={10}
                        min={0}
                        key={key + 3}
                        name={"Electricidad" + key + 3}
                        placeholder={"Período " + periodo}
                        onKeyDown={(event) => {
                          if (
                            /[a-z]/.test(event.key) &&
                            !/Backspace/.test(event.code) &&
                            !/Period/.test(event.code) &&
                            !/NumpadDecimal/.test(event.code)
                          ) {
                            event.preventDefault();
                          }
                        }}
                        className="inputTypeCard"
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        key={key + constantes.bimensual7_12.length + 1}
                      >
                        Debe ingresar información para {periodo}
                      </Form.Control.Feedback>
                    </div>
                  ))}
                </div>
              </Form.Group>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard className="cardComponent">
            <CCardHeader
              className="headerCardDatosElecCombTransp"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <BiHome style={{ flex: 0.2, fontSize: 75 }} />
              <p style={{ flex: 1 }} className="headerCardTitulo">
                Combustibles del hogar
              </p>
              <p style={{ flex: 1 }} className="headerCardSubtitulo">
                ¿Qué tipos de combustibles utilizás en mayor medida? (Respondé
                según tu consumo promedio anual)
              </p>
            </CCardHeader>
            <CCardBody className="bodyCard">
              <div style={{ display: "flex", flex: 1, flexDirection: "row" }}>
                <div style={{ flex: 1, marginRight: "1%" }}>
                  <Form.Group className="mb-3" controlId="formBasicCheckboxGN">
                    <Form.Check
                      style={{
                        fontSize: isMobile ? "90%" : "130%",
                        textAlign: "justify",
                      }}
                      required={!checkedCombHogar}
                      type="checkbox"
                      name="GN"
                      label="Gas Natural"
                      onChange={() => [
                        setTipoCombustibleHogar({
                          ...tipoCombustibleHogar,
                          GN: !tipoCombustibleHogar.GN,
                        }),
                        checkear("GN"),
                      ]}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicConsumoCombustible1"
                  >
                    <Form.Control
                      type={isMobile ? "number" : "text"}
                      step="0.01"
                      maxLength={4}
                      min={0}
                      style={{
                        marginTop: 5,
                        marginBottom: 10,
                        fontSize: isMobile ? "90%" : "130%",
                        textAlign: "justify",
                      }}
                      required={tipoCombustibleHogar.GN}
                      disabled={!tipoCombustibleHogar.GN}
                      name={"GasNaturalConsumo"}
                      placeholder={"En m3 como indica el consumo en tu boleta"}
                      onKeyDown={(event) => {
                        if (
                          !/[0-9]/.test(event.key) &&
                          !/Backspace/.test(event.code) &&
                          !/Period/.test(event.code) &&
                          !/NumpadDecimal/.test(event.code)
                        ) {
                          event.preventDefault();
                        }
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Debe ingresar información para Gas Natural
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div style={{ flex: 1 }}>
                  <Form.Group className="mb-3" controlId="formBasicCheckboxGL">
                    <Form.Check
                      style={{
                        fontSize: isMobile ? "90%" : "130%",
                        textAlign: "justify",
                      }}
                      required={!checkedCombHogar}
                      type="checkbox"
                      name="GL"
                      label="Gas Licuado"
                      onChange={() => [
                        setTipoCombustibleHogar({
                          ...tipoCombustibleHogar,
                          GL: !tipoCombustibleHogar.GL,
                        }),
                        checkear("GL"),
                      ]}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicConsumoCombustible2"
                  >
                    <Form.Control
                      type={isMobile ? "number" : "text"}
                      step="0.01"
                      maxLength={4}
                      min={0}
                      style={{
                        marginTop: 5,
                        marginBottom: 10,
                        fontSize: isMobile ? "90%" : "130%",
                        textAlign: "justify",
                      }}
                      required={tipoCombustibleHogar.GL}
                      disabled={!tipoCombustibleHogar.GL}
                      name={"GasLicuadoConsumo"}
                      placeholder={"Garrafa en kg"}
                      onKeyDown={(event) => {
                        if (
                          !/[0-9]/.test(event.key) &&
                          !/Backspace/.test(event.code) &&
                          !/Period/.test(event.code) &&
                          !/NumpadDecimal/.test(event.code)
                        ) {
                          event.preventDefault();
                        }
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Debe ingresar información para Gas Licuado
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </div>
              <div style={{ display: "flex", flex: 1, flexDirection: "row" }}>
                <div style={{ flex: 1, marginRight: "1%" }}>
                  <Form.Group className="mb-3" controlId="formBasicCheckboxL">
                    <Form.Check
                      style={{
                        fontSize: isMobile ? "90%" : "130%",
                        textAlign: "justify",
                      }}
                      required={!checkedCombHogar}
                      type="checkbox"
                      name="Leña"
                      label="Leña"
                      onChange={() => [
                        setTipoCombustibleHogar({
                          ...tipoCombustibleHogar,
                          Leña: !tipoCombustibleHogar.Leña,
                        }),
                        checkear("Leña"),
                      ]}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicConsumoCombustible3"
                  >
                    <Form.Control
                      type={isMobile ? "number" : "text"}
                      step="0.01"
                      maxLength={4}
                      min={0}
                      style={{
                        marginTop: 5,
                        marginBottom: 10,
                        fontSize: isMobile ? "90%" : "130%",
                        textAlign: "justify",
                      }}
                      required={tipoCombustibleHogar.Leña}
                      disabled={!tipoCombustibleHogar.Leña}
                      name={"LeñaConsumo"}
                      placeholder={"En kg"}
                      onKeyDown={(event) => {
                        if (
                          !/[0-9]/.test(event.key) &&
                          !/Backspace/.test(event.code) &&
                          !/Period/.test(event.code) &&
                          !/NumpadDecimal/.test(event.code)
                        ) {
                          event.preventDefault();
                        }
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Debe ingresar información para Leña
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div style={{ flex: 1 }}>
                  <Form.Group className="mb-3" controlId="formBasicCheckboxC">
                    <Form.Check
                      style={{
                        fontSize: isMobile ? "90%" : "130%",
                        textAlign: "justify",
                      }}
                      required={!checkedCombHogar}
                      type="checkbox"
                      name="Carbon"
                      label="Carbon"
                      onChange={() => [
                        setTipoCombustibleHogar({
                          ...tipoCombustibleHogar,
                          Carbon: !tipoCombustibleHogar.Carbon,
                        }),
                        checkear("Carbon"),
                      ]}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicConsumoCombustible4"
                  >
                    <Form.Control
                      type={isMobile ? "number" : "text"}
                      step="0.01"
                      maxLength={4}
                      min={0}
                      style={{
                        marginTop: 5,
                        marginBottom: 10,
                        fontSize: isMobile ? "90%" : "130%",
                        textAlign: "justify",
                      }}
                      required={tipoCombustibleHogar.Carbon}
                      disabled={!tipoCombustibleHogar.Carbon}
                      name={"CarbonConsumo"}
                      placeholder={"En kg"}
                      onKeyDown={(event) => {
                        if (
                          !/[0-9]/.test(event.key) &&
                          !/Backspace/.test(event.code) &&
                          !/Period/.test(event.code) &&
                          !/NumpadDecimal/.test(event.code)
                        ) {
                          event.preventDefault();
                        }
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Debe ingresar información para Carbón
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard className="cardComponent">
            <CCardHeader
              className="headerCardDatosElecCombTransp"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <BiBus style={{ flex: 0.2, fontSize: 75 }} />
              <p style={{ flex: 1 }} className="headerCardTitulo">
                Transporte
              </p>
              <p style={{ flex: 1 }} className="headerCardSubtitulo">
                ¿Qué medios de transporte utilizas?
              </p>
            </CCardHeader>
            <CCardBody
              className="bodyCard"
              style={{ display: "flex", flex: 1, flexDirection: "row" }}
            >
              <Form.Group
                className="mb-3"
                controlId="formBasicCheckboxBici"
                style={{ flex: 1 }}
              >
                <Form.Check
                  style={{
                    fontSize: isMobile ? "90%" : "130%",
                    textAlign: "justify",
                  }}
                  required={!checkedCombVehiculo}
                  type="checkbox"
                  name="Bici_Pie"
                  label="Bicicleta/A pie"
                  onChange={() => [
                    setTipoTransporte({
                      ...tipoTransporte,
                      Bici: !tipoTransporte.Bici,
                    }),
                    checkearVehiculo("Bicicleta_Pie"),
                  ]}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="formBasicCheckboxBici"
                style={{ flex: 1 }}
              >
                <Form.Check
                  style={{
                    fontSize: isMobile ? "90%" : "130%",
                    textAlign: "justify",
                  }}
                  required={!checkedCombVehiculo}
                  type="checkbox"
                  name="Bici_Pie"
                  label="Bicicleta/A pie"
                  onChange={() => [
                    setTipoTransporte({
                      ...tipoTransporte,
                      Bici: !tipoTransporte.Bici,
                    }),
                    checkearVehiculo("Bicicleta_Pie"),
                  ]}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="formBasicCheckboxBici"
                style={{ flex: 1 }}
              >
                <Form.Check
                  style={{
                    fontSize: isMobile ? "90%" : "130%",
                    textAlign: "justify",
                  }}
                  required={!checkedCombVehiculo}
                  type="checkbox"
                  name="Bici_Pie"
                  label="Bicicleta/A pie"
                  onChange={() => [
                    setTipoTransporte({
                      ...tipoTransporte,
                      Bici: !tipoTransporte.Bici,
                    }),
                    checkearVehiculo("Bicicleta_Pie"),
                  ]}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="formBasicCheckboxBici"
                style={{ flex: 1 }}
              >
                <Form.Check
                  style={{
                    fontSize: isMobile ? "90%" : "130%",
                    textAlign: "justify",
                  }}
                  required={!checkedCombVehiculo}
                  type="checkbox"
                  name="Bici_Pie"
                  label="Bicicleta/A pie"
                  onChange={() => [
                    setTipoTransporte({
                      ...tipoTransporte,
                      Bici: !tipoTransporte.Bici,
                    }),
                    checkearVehiculo("Bicicleta_Pie"),
                  ]}
                />
              </Form.Group>
            </CCardBody>
            <CCardBody></CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* Transporte */}
      <div className="tittle">
        <h3 style={{ fontSize: isMobile ? "1.5rem" : "130%" }}>
          <strong>Transporte</strong>
        </h3>
      </div>
      <div className="secciones">
        <h5
          style={{
            textAlign: "center",
            fontSize: isMobile ? "1.2rem" : "130%",
          }}
        >
          <strong>
            3. Seleccioná los principales medios de transporte que utilizas:
          </strong>
        </h5>
        <h4
          style={{
            textAlign: "center",
            color: "red",
            fontSize: isMobile ? "90%" : "130%",
          }}
          hidden={!validacion || checkedCombVehiculo}
        >
          Debe seleccionar al menos una opción
        </h4>
        <Row style={{ marginLeft: "10%", marginTop: 30 }}>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicCheckboxBici">
              <Form.Check
                style={{
                  fontSize: isMobile ? "90%" : "130%",
                  textAlign: "justify",
                }}
                required={!checkedCombVehiculo}
                type="checkbox"
                name="Bici_Pie"
                label="Bicicleta/A pie"
                onChange={() => [
                  setTipoTransporte({
                    ...tipoTransporte,
                    Bici: !tipoTransporte.Bici,
                  }),
                  checkearVehiculo("Bicicleta_Pie"),
                ]}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicCheckboxMoto_Auto">
              <Form.Check
                style={{
                  fontSize: isMobile ? "90%" : "130%",
                  textAlign: "justify",
                }}
                type="checkbox"
                required={!checkedCombVehiculo}
                name="Motocicleta_Automóvil"
                label="Motocicleta/Automóvil"
                onChange={() => [
                  setTipoTransporte({
                    ...tipoTransporte,
                    Moto_Auto: !tipoTransporte.Moto_Auto,
                  }),
                  checkearVehiculo("Motocicleta/Automóvil"),
                ]}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicCheckboxColectivo">
              <Form.Check
                style={{
                  fontSize: isMobile ? "90%" : "130%",
                  textAlign: "justify",
                }}
                type="checkbox"
                required={!checkedCombVehiculo}
                label="Colectivo"
                name="Colectivo"
                onChange={() => [
                  setTipoTransporte({
                    ...tipoTransporte,
                    Colectivo: !tipoTransporte.Colectivo,
                  }),
                  checkearVehiculo("Colectivo"),
                ]}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group
          className="mb-3"
          controlId="formBasicConsumoTransporte1"
          hidden={!tipoTransporte.Bici}
        >
          <Form.Label
            style={{
              fontSize: isMobile ? "90%" : "130%",
              textAlign: "justify",
              fontWeight: "bold",
            }}
          >
            Bicicleta/A pie
          </Form.Label>
          <Form.Control
            style={{
              fontSize: isMobile ? "90%" : "130%",
              textAlign: "justify",
            }}
            type={isMobile ? "number" : "text"}
            step="0.01"
            maxLength={4}
            name="Bici_PieKm"
            min={0}
            required={tipoTransporte.Bici}
            placeholder="Distancia recorrida en KM. Promedio Mensual."
            onKeyDown={(event) => {
              if (
                !/[0-9]/.test(event.key) &&
                !/Backspace/.test(event.code) &&
                !/Period/.test(event.code) &&
                !/NumpadDecimal/.test(event.code)
              ) {
                event.preventDefault();
              }
            }}
          />
          <Form.Control.Feedback type="invalid">
            Debe ingresar una distancia válida.
          </Form.Control.Feedback>
        </Form.Group>
        <Row hidden={!tipoTransporte.Moto_Auto}>
          <Col>
            <h5 style={{ fontSize: isMobile ? "90%" : "130%" }}>
              <strong>Automóvil/Motocicleta</strong>
            </h5>
            <h6 style={{ fontSize: isMobile ? "90%" : "130%" }}>
              <strong>Promedio Anual</strong>
            </h6>
            <Form.Group
              className="mb-3"
              controlId="formBasicConsumoTransporte2Combustible"
            >
              <Form.Label
                style={{
                  fontSize: isMobile ? "90%" : "130%",
                  textAlign: "justify",
                }}
              >
                Combustible Utilizado
              </Form.Label>
              <Form.Control
                as="select"
                type="select"
                required={tipoTransporte.Moto_Auto}
                style={{
                  width: "100%",
                  fontSize: isMobile ? "90%" : "130%",
                }}
                name="tipoCombustibleVehiculo"
                onKeyDown={(event) => {
                  if (
                    !/[0-9]/.test(event.key) &&
                    !/Backspace/.test(event.code) &&
                    !/Period/.test(event.code) &&
                    !/NumpadDecimal/.test(event.code)
                  ) {
                    event.preventDefault();
                  }
                }}
                onChange={(e) =>
                  setMotoAuto({
                    ...motoAuto,
                    combustible: e.target.value,
                  })
                }
              >
                <option value={""}>Selecciona una opción</option>
                {constantes.combustibleVehiculo.map((combustible, key) => (
                  <option value={combustible} key={key}>
                    {combustible}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Debe seleccionar una opción
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicConsumoTransporte2PersonasXViaje"
            >
              <Form.Label
                style={{
                  fontSize: isMobile ? "90%" : "130%",
                  textAlign: "justify",
                }}
              >
                Cantidad de personas que participan en los viajes
              </Form.Label>
              <Form.Control
                style={{ fontSize: isMobile ? "90%" : "130%" }}
                type={isMobile ? "number" : "text"}
                step="0.01"
                maxLength={4}
                name="PersonasXViajeAuto_Moto"
                min={1}
                placeholder="Personas que participan de los viajes"
                required={tipoTransporte.Moto_Auto}
                onKeyDown={(event) => {
                  if (
                    !/[0-9]/.test(event.key) &&
                    !/Backspace/.test(event.code) &&
                    !/Period/.test(event.code) &&
                    !/NumpadDecimal/.test(event.code)
                  ) {
                    event.preventDefault();
                  }
                }}
              />
              <Form.Control.Feedback type="invalid">
                Debe ingresar al menos 1 (usted)
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicConsumoTransporte2Consumo"
            >
              <Form.Label style={{ fontSize: isMobile ? "90%" : "130%" }}>
                Consumo de mi auto
              </Form.Label>
              <Form.Control
                style={{
                  fontSize: isMobile ? "90%" : "130%",
                  textAlign: "justify",
                }}
                type={isMobile ? "number" : "text"}
                step="0.01"
                maxLength={4}
                min={0}
                name="ConsumoAuto_Moto"
                required={tipoTransporte.Moto_Auto}
                placeholder={
                  motoAuto.combustible == "Nafta" ||
                  motoAuto.combustible == "Gasoil"
                    ? "L/100KM"
                    : motoAuto.combustible == "Eléctrico"
                    ? "KWH/100KM"
                    : motoAuto.combustible == "GNC"
                    ? "M3/100KM"
                    : "Selecione combustible."
                }
                onKeyDown={(event) => {
                  if (
                    !/[0-9]/.test(event.key) &&
                    !/Backspace/.test(event.code) &&
                    !/Period/.test(event.code) &&
                    !/NumpadDecimal/.test(event.code)
                  ) {
                    event.preventDefault();
                  }
                }}
              />
              <Form.Control.Feedback type="invalid">
                Ingrese su consumo según el combustible elegido
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicConsumoTransporte2DistanciaRecorrida"
            >
              <Form.Label
                style={{
                  fontSize: isMobile ? "90%" : "130%",
                  textAlign: "justify",
                }}
              >
                Kilómetros Anuales
              </Form.Label>
              <Form.Control
                style={{
                  fontSize: isMobile ? "90%" : "130%",
                  textAlign: "justify",
                }}
                type={isMobile ? "number" : "text"}
                step="0.01"
                name="Auto_MotoKm"
                min={0}
                required={tipoTransporte.Moto_Auto}
                placeholder="Kilómetros al año."
                onKeyDown={(event) => {
                  if (
                    !/[0-9]/.test(event.key) &&
                    !/Backspace/.test(event.code) &&
                    !/Period/.test(event.code) &&
                    !/NumpadDecimal/.test(event.code)
                  ) {
                    event.preventDefault();
                  }
                }}
              />
              <Form.Control.Feedback type="invalid">
                Ingrese la cantidad de kilómetros recorridos
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          {isMobile ? (
            <Row
              className="consumoElectricidadExplicacion"
              style={{ maxWidth: "85%", marginLeft: "2rem" }}
            >
              <h5
                style={{
                  textAlign: "justify",
                  fontSize: isMobile ? "90%" : "130%",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <strong>¿Cómo lo calculo?</strong>
                </div>
                <strong>Opción 1:</strong> Dependiendo del modelo de tu vehículo
                es posible que el mismo lo calcule automaticamente, esto lo
                podés visualizar en el tablero.
                <br />
                <br />
                <strong>Opción 2:</strong> Si el vehículo no cuenta con el dato
                te recomendamos llenar el tanque de combustible y anotar la
                cantidad de litros que entraron. Luego colocá el cuenta
                kilómetros en 0, en el caso de no poseer cuenta kilómetros anotá
                la cantidad de kilómetros que aparecen en el tablero. Utlizá el
                vehículo con normalidad hasta que se active la reserva, cuando
                esto suceda pará y anotá la cantidad de km realizados hasta el
                momento. Teniedo los datos el cálculo es el siguiente:
                <br />
                <strong>
                  (N° de litros/km recorridos) x 100 = consumo de combustible
                  cada 100 km.
                </strong>
                <br />
                <br />
                <div style={{ textAlign: "center" }}>
                  <strong>¿Cómo realizar la estimación?</strong>
                </div>
                Una manera es sumar los km recorridos por día que realizás
                rutinariamente (trabajo, facultad, escuela, otros), a esta suma
                multiplicala por los días que los realizás activamente y vas a
                obtener la cantidad de km semanales, luego al resultado
                multiplicalo por 4 para tener los km mensuales y finalmente a
                este ultimo resultado por 12 de manera de tener el cálculo
                anual.
                <br />
                En caso de no saber los km recorridos, colocá 10000 km como
                valor promedio.
              </h5>
            </Row>
          ) : (
            <Col
              style={{
                backgroundColor: "#B6D7A8",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                padding: 10,
              }}
            >
              <h5
                style={{
                  textAlign: "justify",
                  fontSize: isMobile ? "90%" : "130%",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <strong>¿Cómo lo calculo?</strong>
                </div>
                <strong>Opción 1:</strong> Dependiendo del modelo de tu vehículo
                es posible que el mismo lo calcule automaticamente, esto lo
                podés visualizar en el tablero.
                <br />
                <br />
                <strong>Opción 2:</strong> Si el vehículo no cuenta con el dato
                te recomendamos llenar el tanque de combustible y anotar la
                cantidad de litros que entraron. Luego colocá el cuenta
                kilómetros en 0, en el caso de no poseer cuenta kilómetros anotá
                la cantidad de kilómetros que aparecen en el tablero. Utlizá el
                vehículo con normalidad hasta que se active la reserva, cuando
                esto suceda pará y anotá la cantidad de km realizados hasta el
                momento. Teniedo los datos el cálculo es el siguiente:
                <br />
                <strong>
                  (N° de litros/km recorridos) x 100 = consumo de combustible
                  cada 100 km.
                </strong>
                <br />
                <br />
                <div style={{ textAlign: "center" }}>
                  <strong>¿Cómo realizar la estimación?</strong>
                </div>
                Una manera es sumar los km recorridos por día que realizás
                rutinariamente (trabajo, facultad, escuela, otros), a esta suma
                multiplicala por los días que los realizás activamente y vas a
                obtener la cantidad de km semanales, luego al resultado
                multiplicalo por 4 para tener los km mensuales y finalmente a
                este ultimo resultado por 12 de manera de tener el cálculo
                anual.
                <br />
                En caso de no saber los km recorridos, colocá 10000 km como
                valor promedio.
              </h5>
            </Col>
          )}
        </Row>
        <Row hidden={!tipoTransporte.Colectivo}>
          <Col>
            <h5 style={{ fontSize: isMobile ? "90%" : "130%" }}>
              <strong>Colectivo</strong>
            </h5>
            <Form.Group
              className="mb-3"
              controlId="formBasicConsumoTransporte3ViajesXSemana"
            >
              <Form.Label
                style={{
                  fontSize: isMobile ? "90%" : "130%",
                  textAlign: "justify",
                }}
              >
                Cantidad de Viajes por Semana
              </Form.Label>
              <Form.Control
                style={{
                  fontSize: isMobile ? "90%" : "130%",
                  textAlign: "justify",
                }}
                type={isMobile ? "number" : "text"}
                step="0.01"
                maxLength={4}
                name="ColectivoViajesXSemana"
                min={1}
                required={tipoTransporte.Colectivo}
                onKeyDown={(event) => {
                  if (
                    !/[0-9]/.test(event.key) &&
                    !/Backspace/.test(event.code)
                  ) {
                    event.preventDefault();
                  }
                }}
              />
              <Form.Control.Feedback type="invalid">
                Debe ingresar una cantidad válida
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicConsumoTransporte3RecorridoViajes"
            >
              <Form.Label
                style={{
                  fontSize: isMobile ? "90%" : "130%",
                  textAlign: "justify",
                }}
              >
                Recorrido medio por viaje en kilómetros
              </Form.Label>
              <Form.Control
                style={{
                  fontSize: isMobile ? "90%" : "130%",
                  textAlign: "justify",
                }}
                type={isMobile ? "number" : "text"}
                step="0.01"
                name="ColectivoKm"
                min={0}
                required={tipoTransporte.Colectivo}
                onKeyDown={(event) => {
                  if (
                    !/[0-9]/.test(event.key) &&
                    !/Backspace/.test(event.code) &&
                    !/Period/.test(event.code) &&
                    !/NumpadDecimal/.test(event.code)
                  ) {
                    event.preventDefault();
                  }
                }}
              />
              <Form.Control.Feedback type="invalid">
                Debe ingresar un recorrido válido
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicConsumoTransporte3MesesViajes"
            >
              <Form.Label
                style={{
                  fontSize: isMobile ? "90%" : "130%",
                  textAlign: "justify",
                }}
              >
                Cantidad de meses en que realiza viajes
              </Form.Label>
              <Form.Control
                style={{
                  fontSize: isMobile ? "90%" : "130%",
                  textAlign: "justify",
                }}
                type={isMobile ? "number" : "text"}
                maxLength={2}
                name="ColectivoMeses"
                max={12}
                min={1}
                required={tipoTransporte.Colectivo}
                onKeyDown={(event) => {
                  if (
                    !/[0-9]/.test(event.key) &&
                    !/Backspace/.test(event.code)
                  ) {
                    event.preventDefault();
                  }
                }}
              />
              <Form.Control.Feedback type="invalid">
                Debe indicar una cantidad de meses válida
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </div>
      {/* Transporte */}
      {/* Avion */}
      <div className="tittle">
        <h3 style={{ fontSize: isMobile ? "1.5rem" : "130%" }}>
          <strong>Viajes en Avión</strong>
        </h3>
      </div>
      <div className="secciones">
        <Row>
          <Col>
            <h5
              style={{
                textAlign: "center",
                fontSize: isMobile ? "1.2rem" : "130%",
              }}
            >
              <strong>
                4. Si viajás en avión indicalo e ingresá lo que recorres en
                promedio en un año:
              </strong>
            </h5>
            <h4
              style={{
                textAlign: "center",
                color: "red",
                fontSize: isMobile ? "90%" : "130%",
              }}
              hidden={!validacion || avion.uso !== ""}
            >
              Debe seleccionar una opción
            </h4>
            <Form.Group
              className="mb-3"
              controlId="formBasicRadioAvion"
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: isMobile ? "90%" : "130%",
                textAlign: "justify",
              }}
            >
              <Form.Check
                inline
                type="radio"
                label="Si"
                value="Si"
                required
                name="radioAvion"
                id="radioAvionSi"
                onChange={(e) =>
                  setAvion({
                    ...avion,
                    uso: e.target.value,
                  })
                }
              />
              <Form.Check
                inline
                type="radio"
                label="No"
                value="No"
                name="radioAvion"
                id="radioAvionNo"
                onChange={(e) =>
                  setAvion({
                    ...avion,
                    uso: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicAvionKM"
              hidden={avion.uso == "No" || avion.uso == ""}
            >
              <Form.Label
                style={{
                  fontSize: isMobile ? "90%" : "130%",
                  textAlign: "justify",
                }}
              >
                Kilómetros recorridos
              </Form.Label>
              <Form.Control
                style={{
                  fontSize: isMobile ? "90%" : "130%",
                  textAlign: "justify",
                }}
                type={isMobile ? "number" : "text"}
                step="0.01"
                name="AvionKm"
                placeholder="Kilómetros que has volado"
                required={!(avion.uso == "No" || avion.uso == "")}
                min={0}
                onKeyDown={(event) => {
                  if (
                    !/[0-9]/.test(event.key) &&
                    !/Backspace/.test(event.code) &&
                    !/Period/.test(event.code) &&
                    !/NumpadDecimal/.test(event.code)
                  ) {
                    event.preventDefault();
                  }
                }}
              />
              <Form.Control.Feedback type="invalid">
                Debe indicar los kilómetros recorridos
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicAvionEscalas"
              hidden={avion.uso == "No" || avion.uso == ""}
            >
              <Form.Label
                style={{
                  fontSize: isMobile ? "90%" : "130%",
                  textAlign: "justify",
                }}
              >
                Cantidad de escalas
              </Form.Label>
              <Form.Control
                style={{
                  fontSize: isMobile ? "90%" : "130%",
                  textAlign: "justify",
                }}
                type={isMobile ? "number" : "text"}
                step="0.01"
                maxLength={4}
                name="AvionEscalas"
                placeholder="Escalas de los viajes realizados"
                required={!(avion.uso == "No" || avion.uso == "")}
                min={0}
                onKeyDown={(event) => {
                  if (
                    !/[0-9]/.test(event.key) &&
                    !/Backspace/.test(event.code) &&
                    !/Period/.test(event.code) &&
                    !/NumpadDecimal/.test(event.code)
                  ) {
                    event.preventDefault();
                  }
                }}
              />
              <Form.Control.Feedback type="invalid">
                Debe ingresar una cantidad de escalas válidas
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </div>
      {/* Avion */}
      {/* TipoReciclaje*/}
      <div className="tittle">
        <h3 style={{ fontSize: isMobile ? "1.5rem" : "130%" }}>
          <strong>Reciclaje</strong>
        </h3>
      </div>
      <div className="secciones">
        <Row>
          <Col>
            <h5
              style={{
                textAlign: "center",
                fontSize: isMobile ? "1.2rem" : "130%",
              }}
            >
              <strong>
                5. Indicá el nivel de separación de residuos que realizás en tu
                hogar:
              </strong>
              <br />
              <br />
              <div
                className="consumoElectricidadExplicacion"
                style={{ textAlign: "justify" }}
              >
                <strong>¿Cómo sé cuál es mi nivel de reciclaje?</strong>
                <br />
                <strong>Nada o casi nada:</strong>
                <br /> No realizo ningún tipo, o realizo muy poco, de reciclaje.
                <br />
                <strong> Separo algunos residuos:</strong>
                <br /> El reciclaje que realizo consiste en separar papel y
                cartón
                <br />
                <strong>Separo residuos:</strong>
                <br /> El reciclaje que realizo consiste en separar papel,
                cartón, plástico y metales
                <br />
                <strong>Separo todos mis residuos:</strong>
                <br /> El reciclaje que realizo consiste en separar papel,
                cartón, plástico, metales y orgánicos
                <br />
              </div>
            </h5>
            <h4
              style={{
                textAlign: "center",
                color: "red",
                fontSize: isMobile ? "90%" : "130%",
              }}
              hidden={!validacion || tipoReciclaje !== ""}
            >
              Debe seleccionar una opción
            </h4>
            <Row style={{ textAlign: "center" }}>
              <Form.Group className="mb-3" controlId="formBasicRadioReciclaje">
                <Form.Check
                  style={{
                    fontSize: isMobile ? "1.2rem" : "130%",
                    textAlign: "justify",
                  }}
                  inline={!isMobile}
                  required
                  name="reciclaje"
                  type="radio"
                  id="reciclaje1"
                  label={<strong>Nada o casi nada</strong>}
                  value="Nada o casi nada"
                  onChange={(e) => setTipoReciclaje(e.target.value)}
                />
                <Form.Check
                  style={{
                    fontSize: isMobile ? "1.2rem" : "130%",
                    textAlign: "justify",
                  }}
                  inline={!isMobile}
                  name="reciclaje"
                  type="radio"
                  id="reciclaje2"
                  label={<strong>Separo algunos residuos</strong>}
                  value="Separo algunos residuos"
                  onChange={(e) => setTipoReciclaje(e.target.value)}
                />
                <Form.Check
                  style={{
                    fontSize: isMobile ? "1.2rem" : "130%",
                    textAlign: "justify",
                  }}
                  inline={!isMobile}
                  name="reciclaje"
                  type="radio"
                  id="reciclaje3"
                  label={<strong>Separo residuos</strong>}
                  value="Separo residuos"
                  onChange={(e) => setTipoReciclaje(e.target.value)}
                />
                <Form.Check
                  style={{
                    fontSize: isMobile ? "1.2rem" : "130%",
                    textAlign: "justify",
                  }}
                  inline={!isMobile}
                  name="reciclaje"
                  type="radio"
                  id="reciclaje4"
                  label={<strong>Separo todos mis residuos</strong>}
                  value="Separo todos mis residuos"
                  onChange={(e) => setTipoReciclaje(e.target.value)}
                />
              </Form.Group>
            </Row>
          </Col>
        </Row>
      </div>
      {/* TipoReciclaje*/}
      {/* TipoDieta*/}
      <div className="tittle">
        <h3 style={{ fontSize: isMobile ? "1.5rem" : "130%" }}>
          <strong>Alimentación</strong>
        </h3>
      </div>
      <div className="secciones">
        <Row>
          <Col>
            <h5
              style={{
                textAlign: "center",
                fontSize: isMobile ? "1.2rem" : "130%",
              }}
            >
              <strong>
                6. Seleccioná el tipo de alimentación que mejor te representa:
                <br />
              </strong>
              <br />
              <div
                className="consumoElectricidadExplicacion"
                style={{ textAlign: "justify" }}
              >
                <strong style={{ display: "flex" }}>
                  ¿Cómo sé cuál es mi alimentación?
                </strong>
                <strong>Muy carnívora:</strong>
                <br /> En promedio consumo de carne de vaca 7 veces a la semana
                (todos los días), carne de pollo/cerdo/pescado 4 veces a la
                semana, lácteos/huevos 3 veces a la semana, vegetales y cereales
                14 veces a la semana, frutas y grasas 7 veces a la semana.
                <br />
                <strong>Carnívora:</strong>
                <br /> En promedio consumo de carne de vaca 4 veces a la semana
                (día por medio), carne de pollo/cerdo 3 veces a la semana,
                lácteos/huevos 3 veces a la semana, legumbres 4 veces a la
                semana, vegetales y cereales 14 veces a la semana, frutas y
                grasas 7 veces a la semana.
                <br />
                <strong>Equilibrada:</strong>
                <br /> En promedio consumo de carne de vaca 1 vez a la semana, 1
                vez a la semana carne de pollo, 1 vez a la semana carne de
                cerdo, lácteos/huevos 7 veces a la semana, legumbres 4 veces a
                la semana, vegetales y cereales 14 veces a la semana, frutas y
                grasas 7 veces a la semana.
                <br />
                <strong>Vegetariana:</strong>
                <br /> No consumo de carne de ningún tipo. En promedio
                lácteos/huevos 7 veces a la semana, legumbres 7 veces a la
                semana, vegetales y cereales 14 veces a la semana, frutas y
                grasas 7 veces a la semana.
                <br />
                <strong>Vegana:</strong>
                <br /> No consumo de carne de ningún tipo, ni lácteos/huevos. En
                promedio legumbres 14 veces a la semana, vegetales y cereales,
                14 veces a la semana, frutas y grasas 7 veces a la semana.
                <br />
              </div>
            </h5>
            <h4
              style={{
                textAlign: "center",
                color: "red",
                fontSize: isMobile ? "90%" : "130%",
              }}
              hidden={!validacion || tipoDieta !== ""}
            >
              Debe seleccionar una opción
            </h4>
            <Row style={{ textAlign: "center" }}>
              <Form.Group className="mb-3" controlId="formBasicRadioDieta">
                <Form.Check
                  style={{
                    fontSize: isMobile ? "90%" : "130%",
                    textAlign: "justify",
                  }}
                  inline={!isMobile}
                  name="dieta"
                  required
                  type="radio"
                  id="dieta1"
                  label={<strong>Muy carnívoro</strong>}
                  value="Muy carnívoro"
                  onChange={(e) => setTipoDieta(e.target.value)}
                />
                <Form.Check
                  style={{
                    fontSize: isMobile ? "90%" : "130%",
                    textAlign: "justify",
                  }}
                  inline={!isMobile}
                  name="dieta"
                  type="radio"
                  id="dieta2"
                  label={<strong>Carnívoro</strong>}
                  value="Carnívoro"
                  onChange={(e) => setTipoDieta(e.target.value)}
                />
                <Form.Check
                  style={{
                    fontSize: isMobile ? "1.2rem" : "130%",
                    textAlign: "justify",
                  }}
                  inline={!isMobile}
                  name="dieta"
                  type="radio"
                  id="dieta3"
                  label={<strong>Equilibrada</strong>}
                  value="Equilibrada"
                  onChange={(e) => setTipoDieta(e.target.value)}
                />
                <Form.Check
                  style={{
                    fontSize: isMobile ? "1.2rem" : "130%",
                    textAlign: "justify",
                  }}
                  inline={!isMobile}
                  name="dieta"
                  type="radio"
                  id="dieta4"
                  label={<strong>Vegetariano</strong>}
                  value="Vegetariano"
                  onChange={(e) => setTipoDieta(e.target.value)}
                />
                <Form.Check
                  style={{
                    fontSize: isMobile ? "1.2rem" : "130%",
                    textAlign: "justify",
                  }}
                  inline={!isMobile}
                  name="dieta"
                  id="dieta5"
                  type="radio"
                  label={<strong>Vegano</strong>}
                  value="Vegano"
                  onChange={(e) => setTipoDieta(e.target.value)}
                />
              </Form.Group>
            </Row>
          </Col>
        </Row>
      </div>
      {/* TipoDieta*/}

      <Button
        variant="primary"
        type="submit"
        style={{
          width: "50%",
          fontSize: 26,
          marginLeft: "25%",
          marginTop: "4%",
          marginBottom: "4%",
        }}
      >
        Calcular
      </Button>

      {/* nuevo boton  */}
      <a className="container-arrow scroll-to " href="#">
        <span>
          <i className="fa fa-angle-down" aria-hidden="true">
            {" "}
            <Image src={arrow} style={{ width: "15%", borderRadius: 15 }} />
          </i>{" "}
        </span>
      </a>
    </FormProvider>
  );
}
