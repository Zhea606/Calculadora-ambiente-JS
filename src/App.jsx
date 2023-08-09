import { useState } from "react";
// import Container from "react-bootstrap/Container";
// import Navbar from "react-bootstrap/Navbar";
// import Image from "react-bootstrap/Image";
import { NavLink, useLocation } from "react-router-dom";
// import logo from "./assets/logo-header.png";
import {
  CCollapse,
  CContainer,
  CNavItem,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
} from "@coreui/react";
import { Outlet } from "react-router-dom";
import logoBlanco from "./assets/logoMuniConLetras.png";

function App() {
  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <CNavbar
        expand="xxl"
        style={{
          backgroundColor: "#38b6bd",
          flex: 1,
          flexWrap: "wrap",
        }}
        // placement="sticky-top"
      >
        <CContainer fluid>
          <CNavbarBrand
            href="https://ciudaddemendoza.gob.ar/"
            className="navbar-brand"
          >
            <img
              className="logo-resp"
              src={logoBlanco}
              alt=""
              width="150rem"
              height="50rem"
              // style={{ margin: "10%", marginLeft: "15%" }}
            />
          </CNavbarBrand>
        </CContainer>
      </CNavbar>
      <CNavbar
        expand="xxl"
        style={{
          backgroundColor: "#dadada",
          flex: 1,
          flexWrap: "wrap",
        }}
        placement="sticky-top"
      >
        <CContainer fluid>
          <CNavbarToggler
            aria-label="Toggle navigation"
            aria-expanded={visible}
            onClick={() => setVisible(!visible)}
            style={{ background: "#CDFCF6", marginLeft: "1rem" }}
          />
          <CCollapse
            className="navbar-collapse"
            visible={visible}
            style={{ flexWrap: "wrap" }}
          >
            <CNavbarNav style={{ marginTop: "1rem", paddingLeft: "4rem" }}>
              <CNavItem className="navItem">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "hover3D-active  nav-link" : "hover3D nav-link"
                  }
                  to={"/calculadora/HuellaCarbono"}
                  onClick={() => [
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    }),
                    setVisible(false),
                  ]}
                >
                  Calculadora de Huella de Carbono
                </NavLink>
              </CNavItem>
              <CNavItem className="navItem">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "hover3D-active nav-link" : "hover3D nav-link"
                  }
                  to={"/calculadora/ViviendaSostenible"}
                  onClick={() => [
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    }),
                    setVisible(false),
                  ]}
                >
                  Calculadora Sostenibilidad de Vivienda
                </NavLink>
              </CNavItem>
              <CNavItem className="navItem">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "hover3D-active nav-link" : "hover3D nav-link"
                  }
                  to={"/calculadora/Registros"}
                  onClick={() => [
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    }),
                    setVisible(false),
                  ]}
                >
                  Registros
                </NavLink>
              </CNavItem>
            </CNavbarNav>
          </CCollapse>
        </CContainer>
      </CNavbar>
      <div
        id="detail"
        style={{
          flex: 1,
          fontFamily: "TitilliumRegular",
          alignContent: "center",
        }}
        onClick={() => setVisible(false)}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default App;
