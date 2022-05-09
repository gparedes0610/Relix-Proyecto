import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./css/styles.css";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";

import LoginView from "./components/auth/LoginView";
import RegisterView from "./components/auth/RegisterView";

import BackOfficeView from "./views/BackOfficeView";
import GerenteView from "./views/GerenteView";
//import Aside from "./views/Aside";
import Cus014 from "./views/Cus014";
import Cu08 from "./views/Cu08";
import Cus016 from "./views/Cus016";
import Cus017 from "./views/Cus017";

//contex
import AuthStateProvider from "./context/autenticacion/authState";
import AlertaStateProvider from "./context/alertas/alertaState";
import FichaTecnicaStateProvider from "./context/fichaTecnica/fichaTecnicaState";
import TablaStateProvider from "./context/tabla/tablaState";

//contex
import FichaTecnica from "./components/Ingeniero/FichaTecnica";
import SesionIniciada from "./views/SesionIniciada";
import ReporteDePartidas from "./views/ReporteDePartidas";

import tokenAuth from "./config/token";
import PresupuestoCotizacion from "./views/PresupuestoCotizacion";
import MaterialesProcesados from "./views/MaterialesProcesados";
import MaterialesAtendidos from "./views/MaterialesAtendidos";
import MaterialesServicios from "./views/MaterialesServicios";
import PrivateRoute from "./rutas/PrivateRoute";
import CambiarContrasena from "./views/CambiarContrasena";
import PlaneamientoDeCompras from "./views/PlaneamientoDeCompras";
import RecuperarPassword from "./components/auth/RecuperarPassword";
import OlvidastePassword from "./components/auth/OlvidastePassword";
import PrivateRouteReportes from "./rutas/PrivateRouteReportes";
//reportes
import Reporte from "./components/Backoffice/Reporte";

//maestro producto
import MaestroProducto from "./views/MaestroProducto";
function App() {
  //revisar si tenemos un token
  const token = localStorage.getItem("token");
  if (token) {
    tokenAuth(token);
  }

  return (
    <AlertaStateProvider>
      <AuthStateProvider>
        <FichaTecnicaStateProvider>
          <TablaStateProvider>
            <Router>
              <Routes>
                <Route path="/" element={<LoginView />} />
                {/* <Route path="/registrar" element={<RegisterView />} /> */}
                <Route path="/cambiarclave" element={<CambiarContrasena />} />
                <Route
                  path="/sesioniniciada/*"
                  element={
                    <PrivateRoute>
                      <SesionIniciada />
                    </PrivateRoute>
                  }
                />
                <Route path="/reporte/:id" element={<Reporte />} />
                {/* <Route
                  path="/reporte/:id"
                  element={
                    <PrivateRouteReportes>
                      <ReportePipeLine />
                    </PrivateRouteReportes>
                  }
                /> */}
                <Route path="/cu08" element={<Cu08 />} />
                <Route path="/guiatranslado" element={<Cus014 />} />
                <Route path="/guiavalorizada" element={<Cus016 />} />
                <Route path="/guiavalorizadareal" element={<Cus017 />} />

                <Route
                  path="/reportedepartidas"
                  element={<ReporteDePartidas />}
                />
                <Route
                  path="/presupuestocotizacion"
                  element={<PresupuestoCotizacion />}
                />
                <Route
                  path="/materialesprocesados"
                  element={<MaterialesProcesados />}
                />
                <Route
                  path="/materialesatendidos"
                  element={<MaterialesAtendidos />}
                />
                <Route
                  path="/materialesservicios"
                  element={<MaterialesServicios />}
                />
                <Route
                  path="/planeamiento-de-compras"
                  element={<PlaneamientoDeCompras />}
                />

                <Route
                  path="/cambiar-password"
                  element={<RecuperarPassword />}
                />
                <Route
                  path="/recuperar-password"
                  element={<OlvidastePassword />}
                />
                <Route
                  path="/sesioniniciada/maestro-producto"
                  element={<MaestroProducto />}
                ></Route>
              </Routes>
            </Router>
          </TablaStateProvider>
        </FichaTecnicaStateProvider>
      </AuthStateProvider>
    </AlertaStateProvider>
  );
}

export default App;
