// ./src/Router.jsx

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import BreakersPage from "./pages/breakers"
import BreakerState from "./context/Breaker/BreakerState"
import BreakerPage from "./pages/breakers/breaker"
import Login from "./pages/iniciar-sesion"
import SignUp from "./pages/registro"
import UserState from "./context/User/UserState"

import Auth from "./routes/Auth"
import Public from "./routes/Public"
import Private from "./routes/Private"
import Home from "./pages/home"
import Cart from "./pages/carrito"

function Router() {
  return (
    <>
      <UserState>
        <BreakerState>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Public component={Home} />} />
                <Route
                  path="/iniciar-sesion"
                  element={<Auth component={Login} />}
                />
                <Route path="/registro" element={<Auth component={SignUp} />} />
                <Route
                  path="/perfil"
                  element={
                    <>
                      <p>Está página es mi perfil de usuario</p>
                    </>
                  }
                />
                <Route path="/carrito" element={<Private component={Cart} />} />
                <Route
                  path="/breakers"
                  element={<Public component={BreakersPage} />}
                />
                <Route
                  path="/breakers/:slug"
                  element={<Public component={BreakerPage} />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </BreakerState>
      </UserState>
    </>
  )
}

export default Router
