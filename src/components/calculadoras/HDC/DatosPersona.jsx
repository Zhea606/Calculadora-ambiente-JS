import React, { useRef } from "react";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import { useFormContext } from "react-hook-form";
import { BiCalculator } from "react-icons/bi";
import constantes from "../../../constants";

export function DatosPersona({ headerCL }) {
  const methods = useFormContext();
  // const watchNombre = methods.watch("nombre", "");
  // const watchCorreo = methods.watch("correo", "");
  const watchLocalidad = methods.watch("localidad", "");
  // const watchSeccion = methods.watch("seccion", "");
  // const watchConvivientes = methods.watch("convivientes", 1);
  // const submitted = methods.formState.isSubmitted;
  // const correoRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const refDatos = useRef(null);
  return (
    <CCard className="cardComponent" ref={refDatos}>
      {headerCL === "HDC" ? (
        <CCardHeader className="headerCardDatos">
          <BiCalculator size={75} className="iconHeader" />
          <p className="headerCardTitulo">¿Querés calcular la tuya?</p>
          <p className="headerCardSubtitulo">
            Completá con tus datos (también vas a necesitar tener tus facturas
            de electricidad y de gas a mano)
          </p>
        </CCardHeader>
      ) : (
        <CCardHeader className="headerCardDatos">
          <BiCalculator size={75} className="iconHeader" />
          <p className="headerCardTitulo">¿Querés calcular la tuya?</p>
          <p className="headerCardSubtitulo">Completá con tus datos</p>
        </CCardHeader>
      )}

      <CCardBody className="bodyCard">
        <div
          className="displayF1"
          style={{
            flexDirection: "column",
            marginRight: "25px",
            paddingTop: 5,
          }}
        >
          <div className="datosPersonaRenglon1">
            <div
              className="componentesIzquierda"
              style={{ flexDirection: "column" }}
            >
              <input
                type="text"
                placeholder="Nombre y apellido"
                className="inputTypeCardMax"
                {...methods.register("nombre")}
                onFocus={() =>
                  refDatos.current.scrollIntoView({ block: "center" })
                }
              />
              <span>{methods.formState.errors.nombre?.message}</span>
            </div>
            <div
              className="componentesDerecha"
              style={{ flexDirection: "column" }}
            >
              <input
                {...methods.register("correo")}
                onFocus={() =>
                  refDatos.current.scrollIntoView({ block: "center" })
                }
                type="email"
                placeholder="Correo"
                className="inputTypeCardMax"
              />
              <span>{methods.formState.errors.correo?.message}</span>
            </div>
          </div>
          <div className="datosPersonaRenglon1">
            <div className="CalcHDC">
              <div
                className="datosPersonaRenglon1"
                style={{ flexDirection: "column" }}
              >
                <div
                  className="componentesIzquierda"
                  style={{ flexDirection: "column" }}
                >
                  <div className="localidad-div">
                    <select
                      {...methods.register("localidad")}
                      onFocus={() =>
                        refDatos.current.scrollIntoView({ block: "center" })
                      }
                      name="localidad"
                      type="select"
                      size={0}
                      className="inputTypeCardMax localidadSelect "
                      style={
                        watchLocalidad == "Mendoza Capital"
                          ? { marginRight: 5 }
                          : null
                      }
                    >
                      <option value={""}>Lugar de residencia</option>
                      {constantes.localidades.map((localidad, key) => (
                        <option value={localidad} key={key}>
                          {localidad}
                        </option>
                      ))}
                    </select>
                    <select
                      {...methods.register("seccion")}
                      onFocus={() =>
                        refDatos.current.scrollIntoView({ block: "center" })
                      }
                      hidden={watchLocalidad !== "Mendoza Capital"}
                      name="seccion"
                      size={0}
                      type="select"
                      className="inputTypeCardMax seccionDiv"
                    >
                      <option value={""}>Sección</option>
                      {constantes.secciones.map((seccion, key) => (
                        <option value={seccion} key={key}>
                          {seccion}
                        </option>
                      ))}
                    </select>
                  </div>
                  <span>{methods.formState.errors.localidad?.message}</span>
                  <span>{methods.formState.errors.seccion?.message}</span>
                </div>
                {/* <span>{methods.formState.errors.localidad?.message}</span>
                <span>{methods.formState.errors.seccion?.message}</span> */}
              </div>
            </div>
            <div
              className="componentesDerecha"
              style={{ flexDirection: "column" }}
            >
              <input
                {...methods.register("convivientes")}
                onFocus={() =>
                  refDatos.current.scrollIntoView({ block: "center" })
                }
                type="number"
                name="convivientes"
                placeholder="Nº de personas que viven en tu hogar (vos incluido)"
                className="inputTypeCardMax"
              />
              <span>{methods.formState.errors.convivientes?.message}</span>
            </div>
          </div>
        </div>
      </CCardBody>
    </CCard>
  );
}
