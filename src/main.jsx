import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { CalcHDC } from "./components/calculadoras/HDC/CalcHDC";
import { Registros } from "./components/calculadoras/Registros";
import { RegistrosTotales } from "./components/info/RegistrosTotales";
// import CalcSV from "./components/calculadoras/CalcSV";
import { CalcSV_2 } from "./components/calculadoras/SV/CalcSV_2";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import persistStore from "redux-persist/es/persistStore";
import { store } from "./redux/store";
import "./index.css";
import "./fonts/TitilliumWeb-Black.ttf";
import "./fonts/TitilliumWeb-Bold.ttf";
import "./fonts/TitilliumWeb-BoldItalic.ttf";
import "./fonts/TitilliumWeb-ExtraLight.ttf";
import "./fonts/TitilliumWeb-ExtraLightItalic.ttf";
import "./fonts/TitilliumWeb-Italic.ttf";
import "./fonts/TitilliumWeb-Light.ttf";
import "./fonts/TitilliumWeb-LightItalic.ttf";
import "./fonts/TitilliumWeb-Regular.ttf";
import "./fonts/TitilliumWeb-SemiBold.ttf";
import "./fonts/TitilliumWeb-SemiBoldItalic.ttf";

const varPersistor = persistStore(store);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/calculadora/HuellaCarbono"} />,
  },
  {
    path: "/calculadora",
    element: <App />,
    children: [
      {
        path: "/calculadora/HuellaCarbono",
        element: <CalcHDC />,
      },
      {
        path: "/calculadora/ViviendaSostenible",
        element: <CalcSV_2 />,
      },
      {
        path: "/calculadora/Registros",
        element: <Registros />,
      },
      {
        path: "/calculadora/RegistrosTotales",
        element: <RegistrosTotales />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PersistGate persistor={varPersistor}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </PersistGate>
  </React.StrictMode>
);
