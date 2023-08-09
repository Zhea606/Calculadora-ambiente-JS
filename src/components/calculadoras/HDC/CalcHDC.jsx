import React, { useEffect, useRef } from "react";
import Row from "react-bootstrap/Row";
import { CButton } from "@coreui/react";
import { useDispatch } from "react-redux";
import {
  recibirDatosHDC,
  mostrarResultados,
} from "../../../redux/features/valueSlice";
import { store } from "../../../redux/store";
import { DatosPersona } from "./DatosPersona";
import { Titulo } from "./Titulo";
import { FormProvider, useForm } from "react-hook-form";
import { DatosElectricidad } from "./DatosElectricidad";
import { lineaSeparacion } from "../../lineaSeparacion";
import { GraficoResultados } from "../../graficos/graficoResultados";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import constants from "../../../constants";
import { DatosReciclajeRadio } from "./DatosReciclajeRadio";
import { DatosAlimentacionRadio } from "./DatosAlimentacionRadio";
import { DatosCombustibleCheckboxes } from "./DatosCombustibleCheckboxes";
import { DatosTransporteCheckboxes } from "./DatosTransporteCheckboxes";
import { calculos } from "./funcionesInternas/calculos";

export function CalcHDC() {
  try {
    //Validador de información YUP
    //Según el dato recibido se toman las opciones para su validación
    //Dentro de los paréntesis van los mensajes de error en caso de detecar que no se cumple esa opción
    let schema = yup.object().shape({
      nombre: yup.string().required("Ingresa tu nombre y apellido."),
      correo: yup
        .string()
        .required("Prometemos no enviar spam, ingresa tu correo.")
        .email("Ingresa un correo válido."),
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
        .min(1, "Ingresa un número válido de personas."),
      Electricidad1: yup
        .number()
        .positive("Ingresa un número válido de consumo.")
        .typeError(
          "Es necesario que ingreses un valor numérico para este período."
        )
        .required("Ingresa un valor para el período Enero-Febrero.")
        .min(1),
      Electricidad2: yup
        .number()
        .positive("Ingresa un número válido de consumo.")
        .typeError(
          "Es necesario que ingreses un valor numérico para este período."
        )
        .required("Ingresa un valor para el período Marzo-Abril.")
        .min(1),
      Electricidad3: yup
        .number()
        .positive("Ingresa un número válido de consumo.")
        .typeError(
          "Es necesario que ingreses un valor numérico para este período."
        )
        .required("Ingresa un valor para el período Mayo-Junio.")
        .min(1),
      Electricidad4: yup
        .number()
        .positive("Ingresa un número válido de consumo.")
        .typeError(
          "Es necesario que ingreses un valor numérico para este período."
        )
        .required("Ingresa un valor para el período Julio-Agosto.")
        .min(1),
      Electricidad5: yup
        .number()
        .positive("Ingresa un número válido de consumo.")
        .typeError(
          "Es necesario que ingreses un valor numérico para este período."
        )
        .required("Ingresa un valor para el período Septiembre-Octubre.")
        .min(1),
      Electricidad6: yup
        .number()
        .positive("Ingresa un número válido de consumo.")
        .typeError(
          "Es necesario que ingreses un valor numérico para este período."
        )
        .required("Ingresa un valor para el período Noviembre-Diciembre.")
        .min(1),
      combustibleCheckbox: yup
        .array()
        .typeError("Debe elegir al menos un tipo de combustible.")
        .min(1, "Debe elegir al menos un tipo de combustible."),
      GasNaturalConsumo1: yup.number().when("combustibleCheckbox", {
        is: (combustibleCheckbox) =>
          combustibleCheckbox.toString().includes("Gas Natural (en m3)"),
        then: () =>
          yup
            .number()
            .min(1)
            .typeError("Ingresa un número válido de consumo.")
            .positive("Ingresa un número válido de consumo.")
            .required("Ingrese un valor para el consumo."),
      }),
      GasNaturalConsumo2: yup.number().when("combustibleCheckbox", {
        is: (combustibleCheckbox) =>
          combustibleCheckbox.toString().includes("Gas Natural (en m3)"),
        then: () =>
          yup
            .number()
            .min(1)
            .typeError("Ingresa un número válido de consumo.")
            .positive("Ingresa un número válido de consumo.")
            .required("Ingrese un valor para el consumo."),
      }),
      GasNaturalConsumo3: yup.number().when("combustibleCheckbox", {
        is: (combustibleCheckbox) =>
          combustibleCheckbox.toString().includes("Gas Natural (en m3)"),
        then: () =>
          yup
            .number()
            .min(1)
            .typeError("Ingresa un número válido de consumo.")
            .positive("Ingresa un número válido de consumo.")
            .required("Ingrese un valor para el consumo."),
      }),
      GasNaturalConsumo4: yup.number().when("combustibleCheckbox", {
        is: (combustibleCheckbox) =>
          combustibleCheckbox.toString().includes("Gas Natural (en m3)"),
        then: () =>
          yup
            .number()
            .min(1)
            .typeError("Ingresa un número válido de consumo.")
            .positive("Ingresa un número válido de consumo.")
            .required("Ingrese un valor para el consumo."),
      }),
      GasNaturalConsumo5: yup.number().when("combustibleCheckbox", {
        is: (combustibleCheckbox) =>
          combustibleCheckbox.toString().includes("Gas Natural (en m3)"),
        then: () =>
          yup
            .number()
            .min(1)
            .typeError("Ingresa un número válido de consumo.")
            .positive("Ingresa un número válido de consumo.")
            .required("Ingrese un valor para el consumo."),
      }),
      GasNaturalConsumo6: yup.number().when("combustibleCheckbox", {
        is: (combustibleCheckbox) =>
          combustibleCheckbox.toString().includes("Gas Natural (en m3)"),
        then: () =>
          yup
            .number()
            .min(1)
            .typeError("Ingresa un número válido de consumo.")
            .positive("Ingresa un número válido de consumo.")
            .required("Ingrese un valor para el consumo."),
      }),
      GasLicuadoConsumo: yup.number().when("combustibleCheckbox", {
        is: (combustibleCheckbox) =>
          combustibleCheckbox
            .toString()
            .includes("Gas Licuado (garrafa) (en kg)"),
        then: () =>
          yup
            .number()
            .min(1)
            .typeError("Ingresa un número válido de consumo.")
            .positive("Ingresa un número válido de consumo.")
            .required("Ingrese un valor para el consumo."),
      }),
      LeñaConsumo: yup.number().when("combustibleCheckbox", {
        is: (combustibleCheckbox) =>
          combustibleCheckbox.toString().includes("Leña (en kg)"),
        then: () =>
          yup
            .number()
            .min(1)
            .typeError("Ingresa un número válido de consumo.")
            .positive("Ingresa un número válido de consumo.")
            .required("Ingrese un valor para el consumo."),
      }),
      CarbonConsumo: yup.number().when("combustibleCheckbox", {
        is: (combustibleCheckbox) =>
          combustibleCheckbox.toString().includes("Carbón (en kg)"),
        then: () =>
          yup
            .number()
            .min(1, "Ingresa un número válido de consumo.")
            .typeError("Ingresa un número válido de consumo.")
            .positive("Ingresa un número válido de consumo.")
            .required("Ingrese un valor para el consumo."),
      }),
      transporteCheckbox: yup
        .array()
        .typeError("Debe elegir al menos una opción de transporte.")
        .min(1, "Debe elegir al menos una opción."),
      BicicletaPieConsumo: yup
        .number()
        .typeError("El valor ingresado debe ser un número.")
        .when("transporteCheckbox", {
          is: (transporteCheckbox) =>
            transporteCheckbox.toString().includes("Bicicleta / a pie"),
          then: () =>
            yup
              .number()
              .typeError("El valor ingresado debe ser un número.")
              .min(1)
              .positive("Ingresa un número válido de consumo.")
              .required("Es necesario que ingrese un valor."),
        }),
      combustibleRadio: yup.string().when("transporteCheckbox", {
        is: (transporteCheckbox) =>
          transporteCheckbox.toString().includes("Motocicleta / Automóvil"),
        then: () => yup.string().required("Debe seleccionar un valor"),
      }),
      consumoVehiculoMotoAuto: yup
        .number()
        .typeError("El valor ingresado debe ser un número.")
        .when("transporteCheckbox", {
          is: (transporteCheckbox) =>
            transporteCheckbox.toString().includes("Motocicleta / Automóvil"),
          then: () =>
            yup
              .number()
              .typeError("El valor ingresado debe ser un número.")
              .min(1)
              .positive("Ingresa un número válido de consumo.")
              .required("Es necesario que ingrese un valor."),
        }),
      kilometrosAnualesMotoAuto: yup
        .number()
        .typeError("El valor ingresado debe ser un número.")
        .when("transporteCheckbox", {
          is: (transporteCheckbox) =>
            transporteCheckbox.toString().includes("Motocicleta / Automóvil"),
          then: () =>
            yup
              .number()
              .typeError("El valor ingresado debe ser un número.")
              .min(1)
              .positive("Ingresa un número válido de consumo.")
              .required("Es necesario que ingrese un valor."),
        }),
      personasViajeMotoAuto: yup
        .number()
        .typeError("El valor ingresado debe ser un número.")
        .when("transporteCheckbox", {
          is: (transporteCheckbox) =>
            transporteCheckbox.toString().includes("Motocicleta / Automóvil"),
          then: () =>
            yup
              .number()
              .typeError("El valor ingresado debe ser un número.")
              .min(1)
              .positive("Ingresa un número válido de consumo.")
              .required("Es necesario que ingrese un valor."),
        }),
      viajesSemanaColectivo: yup
        .number()
        .typeError("El valor ingresado debe ser un número.")
        .when("transporteCheckbox", {
          is: (transporteCheckbox) =>
            transporteCheckbox.toString().includes("Colectivo"),
          then: () =>
            yup
              .number()
              .typeError("El valor ingresado debe ser un número.")
              .min(1)
              .positive("Ingresa un número válido de consumo.")
              .required("Es necesario que ingrese un valor."),
        }),
      viajeKilometrosColectivo: yup
        .number()
        .typeError("El valor ingresado debe ser un número.")
        .when("transporteCheckbox", {
          is: (transporteCheckbox) =>
            transporteCheckbox.toString().includes("Colectivo"),
          then: () =>
            yup
              .number()
              .typeError("El valor ingresado debe ser un número.")
              .min(1)
              .positive("Ingresa un número válido de consumo.")
              .required("Es necesario que ingrese un valor."),
        }),
      viajeMesesColectivo: yup
        .number()
        .typeError("El valor ingresado debe ser un número.")
        .when("transporteCheckbox", {
          is: (transporteCheckbox) =>
            transporteCheckbox.toString().includes("Colectivo"),
          then: () =>
            yup
              .number()
              .typeError("El valor ingresado debe ser un número.")
              .positive("Ingresa un número válido de consumo.")
              .required("Es necesario que ingrese un valor.")
              .min(1, "La cantidad de meses debe ser al menos 1.")
              .max(12, "La cantidad de meses no puede superar a 12."),
        }),
      kilometrosAñoAvion: yup
        .number()
        .typeError("El valor ingresado debe ser un número.")
        .when("transporteCheckbox", {
          is: (transporteCheckbox) =>
            transporteCheckbox.toString().includes("Avión"),
          then: () =>
            yup
              .number()
              .typeError("El valor ingresado debe ser un número.")
              .min(1)
              .positive("Ingresa un número válido de consumo.")
              .required("Es necesario que ingrese un valor."),
        }),
      cantidadEscalasAvion: yup
        .number()
        .typeError("El valor ingresado debe ser un número.")
        .when("transporteCheckbox", {
          is: (transporteCheckbox) =>
            transporteCheckbox.toString().includes("Avión"),
          then: () =>
            yup
              .number()
              .typeError("El valor ingresado debe ser un número.")
              .min(1)
              .positive("Ingresa un número válido de consumo.")
              .required("Es necesario que ingrese un valor."),
        }),
      radioReciclaje: yup.string().required("Debe seleccionar una opción."),
      radioAlimentacion: yup.string().required("Debe seleccionar una opción."),
    });
    //methods son todas las funciones de useForm posibles
    //resolver se establece en el schema creado anteriormente para que se encargue de validar
    const methods = useForm({ resolver: yupResolver(schema) });
    // const methods = useForm();
    //#region constantes
    //valores actuales de la store de REDUX
    const exact = store.getState().valueState;
    const dispatch = useDispatch();
    //#endregion
    //opción de validación que avisa que no se debe abortar al primer error sino al finalizar todos los tests si los hubiera
    const validateOptions = { abortEarly: false };
    //Si el usuario dejó los datos a la mitad de llenar cuando recarga la página se reinician a 0.
    useEffect(() => {
      const dataRedux = {
        consumoElectrico: 0,
        gasNatural: 0,
        gasLiquido: 0,
        leña: 0,
        carbon: 0,
        bici_pie: 0,
        moto_auto: 0,
        colectivo: 0,
        reciclajeValor: 0,
        dietaValor: 0,
        correo: "",
      };
      dispatch(recibirDatosHDC(dataRedux));
      dispatch(mostrarResultados(false));
      // dispatch(esValido(false));
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

    return (
      <div className="CalcHDC">
        <Titulo />
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit((data) =>
              calculos(data, schema, validateOptions, dispatch)
            )}
            // onSubmit={methods.handleSubmit((data) => console.log("data", data))}
            noValidate
          >
            <div />
            <DatosPersona headerCL={"HDC"} />
            {lineaSeparacion()}
            <div />
            <DatosElectricidad />
            <div />
            <DatosCombustibleCheckboxes />
            <div />
            <DatosTransporteCheckboxes />
            {lineaSeparacion()}
            <div />
            <DatosReciclajeRadio />
            <div />
            <DatosAlimentacionRadio />
            <div className="centrarBotonSubmit">
              <CButton type="submit" className="botonSubmit">
                Calcular
              </CButton>
            </div>
          </form>
        </FormProvider>
        <div className="displayF1" ref={refResultados}></div>
        <Row className="mostrarResultados" hidden={!exact.mostrarResultados}>
          <GraficoResultados
            consumoElectrico={exact.consumoElectrico}
            gasNatural={exact.gasNatural}
            gasLiquido={exact.gasLiquido}
            Carbon={exact.carbon}
            Leña={exact.leña}
            bici_pie={exact.bici_pie}
            moto_auto={exact.moto_auto}
            colectivo={exact.colectivo}
            avion={exact.avion}
            reciclajeValor={exact.reciclajeValor}
            dietaValor={exact.dietaValor}
          />
        </Row>
      </div>
    );
  } catch (error) {
    console.log(error);
    return null;
  }
}
