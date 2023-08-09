import { CButton } from "@coreui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import constants from "../../../constants";
import {
  recibirDatosSV,
  selectValueState,
} from "../../../redux/features/valueSlice";
import { store } from "../../../redux/store";
import "../../../styles.css";
import { DatosPersona } from "../HDC/DatosPersona";
import { calculosSV } from "../SV/funcionesInternasSV/calculosSV";
import { Agua } from "./Agua";
import { Agua2 } from "./Agua2";
import { ConfortTermico } from "./ConfortTermico";
import { ConfortTermico2 } from "./ConfortTermico2";
import { ConsumoResponsable } from "./ConsumoResponsable";
import { Energia } from "./Energia";
import { Infraestructura } from "./Infraestructura";
import { Residuos } from "./Residuos";
import { TituloSV } from "./TituloSV";
import constantesDataSV from "./constantesDataSV";

export function CalcSV_2() {
  const valueSlicer = useSelector(selectValueState);
  const dispatch = useDispatch();
  try {
    //#region validacion
    let schema = yup.object().shape({
      nombre: yup.string().required("Ingresa tu nombre."),
      correo: yup
        .string()
        .email("Ingresa un correo válido")
        .required("No te enviaremos spam, ingresa tu correo."),
      localidad: yup
        .string()
        .required("Selecciona la localidad en la que vives.")
        .oneOf(constants.localidades, "Debe seleccionar una opción."),
      seccion: yup.string().when("localidad", {
        is: (localidad) => localidad === "Mendoza Capital",
        then: () =>
          yup
            .string()
            .required("Selecciona la sección en la que vives.")
            .oneOf(constants.secciones, "Indique su sección."),
      }),
      convivientes: yup
        .number()
        .required("Es necesario que ingreses la cantidad de convivientes.")
        .typeError("Es necesario que ingreses la cantidad de convivientes.")
        .integer("Ingresa un número válido de personas.")
        .positive("Ingresa un número válido de personas.")
        .required("Es necesario que ingreses la cantidad de convivientes.")
        .min(1),

      //#region INFRAESTRUCTURA

      aislacionCheckbox: yup
        .array()
        .typeError("Debe elegir al menos una opción.")
        .min(1, "Debe elegir al menos una opción."),

      ventanaTipo: yup
        .string()
        .oneOf(constantesDataSV.ventanas, "Debe elegir una opción")
        .required("Selecciona un tipo de ventana"),

      proteccionSolar: yup
        .string()
        .oneOf(
          ["siProteccionSolar", "noProteccionSolar"],
          "Debe elegir una opción"
        )
        .required("Debe elegir una opción"),

      tipoInfraestructura: yup
        .string()
        .oneOf(constantesDataSV.tipoEstructHogar, "Debe elegir una opción")
        .required("Selecciona un tipo de infraestructura"),
      //#endregion INFRAESTRUCTURA

      //#region ENERGIA
      lamparasTipo: yup
        .string()
        .oneOf(constantesDataSV.lamparas, "Debe elegir una opción")
        .required("Selecciona un tipo de lámpara"),

      consideraEficiencia: yup
        .string()
        .oneOf(["siConsideraEfic", "noConsideraEfic"])
        .required("Debe elegir una de las opciones"),

      energiasRenovCheckbox: yup
        .array()
        .typeError("Debe elegir al menos una opción.")
        .min(1, "Debe elegir al menos una opción."),
      //#endregion ENERGIA

      //#region CONFORT TERMICO
      ingresaAireVentPuert: yup
        .string()
        .oneOf(["siIngresaAire", "noIngresaAire"])
        .required("Debe elegir una de las opciones"),

      goteanVentanas: yup
        .string()
        .oneOf(["siGotean", "noGotean"])
        .required("Debe elegir una de las opciones"),
      //#endregion CONFORT TERMICO

      //#region AGUA
      dispAhorradorAguaCheckbox: yup
        .array()
        .typeError("Debe elegir al menos una opción.")
        .min(1, "Debe elegir al menos una opción."),

      bajoRequerimiento: yup
        .string()
        .oneOf(["sonBajoRequerim", "noSonBajoRequerim", "noTieneJardin"])
        .required("Debe elegir una de las opciones"),

      formaRiego: yup
        .string()
        .oneOf(constantesDataSV.formaRiegoJardin, "Debe elegir una opción")
        .required("Selecciona una forma de riego"),
      //#endregion AGUA

      //#region CONSUMO RESPONSABLE
      habitosSostCheckbox: yup
        .array()
        .typeError("Debe elegir al menos una opción.")
        .min(1, "Debe elegir al menos una opción."),
      //#endregion CONSUMO RESPONSABLE

      //#region ENERGIA Y CONFORT TERMICO
      habitosEnergiaCheckbox: yup
        .array()
        .typeError("Debe elegir al menos una opción")
        .min(1, "Debe elegir al menos una opción"),

      buenConfortCheckbox: yup
        .array()
        .typeError("Debe elegir al menos una opción")
        .min(1, "Debe elegir al menos una opción"),

      ventilaAmbientes: yup
        .string()
        .oneOf(["siVentilaAmb", "noVentilaAmb"])
        .required("Debe elegir una opción"),
      //#endregion ENERGIA Y CONFORT TERMICO

      //#region RESIDUOS
      formaResiduos: yup
        .string()
        .oneOf(constantesDataSV.residuos, "Debe elegir una opción")
        .required("Seleccione una opción"),

      haceCompost: yup
        .string()
        .oneOf(["siHaceCompost", "noHaceCompost"])
        .required("Debe seleccionar una opción"),
      //#endregion RESIDUOS

      //#region AGUA HABITOS
      habitosConsumoAguaCheckbox: yup
        .array()
        .typeError("Debe elegir al menos una opción")
        .min(1, "Debe elegir al menos una opción"),
      //#endregion AGUA HABITOS
    });
    //#endregion
    const methods = useForm({ resolver: yupResolver(schema) });
    // const [mostrarResultados, setMostrarResultados] = useState(false);
    const [visible, setVisible] = useState(false);
    // const [validacion, setValidacion] = useState(false);
    const validateOptions = { abortEarly: false };
    const exact = store.getState().valueState;
    // const variant = useSelector(selectValueState);

    // const [mensaje, setMensaje] = useState("");
    // const token = import.meta.env.VITE_APITOKEN;
    // const urlBK = import.meta.env.VITE_BK;

    useEffect(() => {
      const dataRedux = {
        infraestructura: 0,
        energia: 0,
        confort: 0,
        agua: 0,
        consumoResponsable: 0,
        confort2: 0,
        residuos: 0,
        agua2: 0,
      };
      dispatch(recibirDatosSV(dataRedux));
      // dispatch(mostrarResultados(false));
    }, []);

    const refResultados = useRef(null);

    useEffect(() => {
      if (exact.mostrarResultados) {
        setTimeout(() => {
          refResultados.current.scrollIntoView({
            block: "center",
            behavior: "smooth",
          });
        }, 100);
      }
    }, [exact.mostrarResultados]);

    // function enviarInfoSV() {
    //   axios
    //     .post(
    //       urlBK + "/api/guardarSV",
    //       {
    //         infraestructura: valueSlicer.infraestructura,
    //         energia: valueSlicer.energia,
    //         comfort_termico: valueSlicer.confort,
    //         agua: valueSlicer.agua,
    //         consumo_responsable: valueSlicer.consumoResponsable,
    //         energia_confort: valueSlicer.confort2,
    //         habitos_agua: valueSlicer.agua2,
    //         total: valueSlicer.calculoTotal,
    //       },
    //       axiosConfig
    //     )
    //     .then(async (response) => {
    //       await response.data;
    //       return response.data;
    //     })
    //     .catch((error) => {
    //       return error;
    //     });

    //   return;
    // }

    /******************************** */

    let datosCalculosSV = [
      exact.infraestructura,
      exact.energia,
      exact.confort,
      exact.agua,
      exact.consumoResponsable,
      exact.confort2,
      exact.residuos,
      exact.agua2,
    ];

    let totalSVColores = datosCalculosSV.reduce((a, b) => a + b, 0);

    const variaciones =
      totalSVColores > 16
        ? "#1F8A70"
        : totalSVColores > 8
        ? "#F2CD5C"
        : "rgb(255,0,0)";

    const variacionesLetra =
      totalSVColores > 16 ? "#FFF" : totalSVColores > 8 ? "#000" : "#FFF";

    /****************************************************************************************************************** */
    return (
      <div className="CalcSV_2">
        {/* Mensaje notifica campos incompletos */}
        {/* {visible ? <ModalError message={mensaje} /> : null}
        <ModalError /> */}
        <TituloSV />
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit((data) => [
              calculosSV(data, schema, validateOptions, dispatch),
              setVisible(true),
            ])}
            noValidate
          >
            <div />
            <DatosPersona headerCL={"SV"} />
            <div className="cardComponent dividerTitle">
              SOSTENIBILIDAD DE TU HOGAR
            </div>
            <Infraestructura />
            <Energia />
            <ConfortTermico />
            <Agua />
            <div className="cardComponent dividerTitle">
              HÁBITOS SOSTENIBLES
            </div>
            <ConsumoResponsable />
            <ConfortTermico2 />
            <Residuos />
            <Agua2 />
            <div className="centrarBotonSubmit">
              <CButton type="submit" className="botonSubmit">
                Calcular
              </CButton>
            </div>
          </form>
        </FormProvider>

        <div className="displayF1" ref={refResultados}></div>

        <Row
          className="mostrarResultados"
          hidden={!visible}
          key={JSON.stringify(valueSlicer)}
        >
          <Col>
            <Row style={{ textAlign: "center" }}>
              <h5> A continuación, te presentamos los resultados</h5>
            </Row>
            <Col style={{ textAlign: "center" }}>
              <strong>
                <h4 className="resultadosCol">
                  El nivel de sostenibilidad de tu hogar y de tus hábitos es de:{" "}
                  {""}
                  {/* {
                    <Form.Text
                      className="textResul"
                      style={{
                        backgroundColor: variaciones,
                        // backgroundColor: "red", ///arreglar lo de las variaciones de color y letra
                        color: variacionesLetra,
                        // color: "#ffff",
                      }}
                    >
                      {totalSVColores}
                    </Form.Text>
                  }{" "} */}
                </h4>
                {
                  <Form.Text
                    className="textResul"
                    style={{
                      backgroundColor: variaciones,
                      // backgroundColor: "red", ///arreglar lo de las variaciones de color y letra
                      color: variacionesLetra,
                      // color: "#ffff",
                    }}
                  >
                    {totalSVColores.toFixed(2)}
                  </Form.Text>
                }{" "}
                <p style={{ fontSize: "1.3rem", marginTop: ".8rem" }}>
                  {" "}
                  puntos{" "}
                </p>
              </strong>
            </Col>
            <Row className="tenerCuentaRespo">
              <h5> A tener en cuenta:</h5>
            </Row>
            <Row>
              <div style={{ display: "inline-flex" }}>
                <div
                  className="coloresTenerCuenta"
                  style={{
                    color: "transparent",
                    backgroundColor: "rgb(255,0,0)",
                  }}
                ></div>
                <div style={{ marginLeft: 20 }}>
                  <Form.Text
                    style={{ fontWeight: "bold", textAlign: "center" }}
                  >
                    Menor a 0 hasta 7 puntos:
                  </Form.Text>
                  <Form.Text style={{ textAlign: "center" }}>
                    {" "}
                    Sería bueno que empecés a estar más atento/a a las
                    consecuencias de tus acciones ya que aún no has logrado
                    materializar prácticas sostenibles en tu vivienda y hábitos
                    cotidianos . ¡Ánimo!, hoy puede ser un buen día para asumir
                    un compromiso ambiental. Te invitamos a que sumes poco a
                    poco los consejos de la Guía de hábitos sosteibles en la
                    vivienda.
                  </Form.Text>
                </div>
              </div>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <div style={{ display: "inline-flex" }}>
                <div
                  className="coloresTenerCuenta"
                  style={{
                    color: "transparent",
                    backgroundColor: "#F2CD5C",
                    width: "33%",
                  }}
                ></div>
                <div style={{ marginLeft: 20 }}>
                  <Form.Text
                    style={{ fontWeight: "bold", textAlign: "center" }}
                  >
                    De 8 a 15 puntos:
                  </Form.Text>
                  <Form.Text style={{ textAlign: "center" }}>
                    {" "}
                    Estás en camino hacia la sustentabilidad, pero hay mucho más
                    por aprender y mejorar. De a poco comenzás a tomar
                    decisiones y alternativas hacia una vida más consciente y no
                    sólo de tu propio interés. Te invitamos a revisar aquellos
                    aspectos que podés reforzar y seguir los consejos de la Guía
                    de Hábitos sostenibles en la vivienda.
                  </Form.Text>
                </div>
              </div>
            </Row>
            <Row style={{ marginTop: 10, marginBottom: 20 }}>
              <div style={{ display: "inline-flex" }}>
                <div
                  className="coloresTenerCuenta"
                  style={{
                    color: "transparent",
                    backgroundColor: "#1F8A70",
                    width: "29%",
                  }}
                ></div>
                <div style={{ marginLeft: 20 }}>
                  <Form.Text
                    style={{ fontWeight: "bold", textAlign: "center" }}
                  >
                    De 16 a 19 puntos:
                  </Form.Text>
                  <Form.Text style={{ textAlign: "center" }}>
                    {" "}
                    ¡Felicitaciones! Tus hábitos cotidianos demuestran un ran
                    compromiso ambiental. Te preocupás por el impacto que tienen
                    las elecciones que tomás, aunque sean muy pequeñas, como
                    separar tus reisduos, ahorrar agua y hacer un uso eficiente
                    de la energía. ¡Gracias por tu compromiso!
                  </Form.Text>
                </div>
              </div>
            </Row>
            <div className="invitacion">
              Te invitamos a leer la{" "}
              <a
                href="https://drive.google.com/file/d/141_pivjBMGcG5PKw0swEEadw2mqVs8XL/view?usp=drive_link"
                target="_blank"
                style={{ textDecorationLine: "underline" }}
              >
                GUIA DE HÁBITOS SOSTENIBLES EN LA VIVIENDA.
              </a>
            </div>
          </Col>
        </Row>
      </div>
    );
  } catch (error) {
    console.log(error);
    return null;
  }
}
