import { Route, Routes } from "react-router-dom"
import { BrowserRouter as Router } from 'react-router-dom'
import { Login } from "../pages/login"
import { Register } from "../pages/register"
import { TimeCreate } from "../pages/timeCreate"
import { Home } from "../pages/home"
import { PrivateRoutes } from "./privateRoutes"
import { TimeEdit } from "../pages/timeEdit"
import { ListJogador } from "../pages/listJogadores"
import { JogadorCreate } from "../pages/jogadorCreate"
import { JogadorEdit } from "../pages/jogadorEdit"
import { TimeDetails } from "../pages/timeDetails"

export const AppRouter = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Login />}></Route>
                <Route path="/register" exact element={<Register />}></Route>
                <Route path="/home" element={<PrivateRoutes />}>
                    <Route path="/home" exact element={<Home />}></Route>
                </Route>
                <Route path="/time/create" exact element={<TimeCreate />}></
                Route>
                <Route path="/time/edit/:id" exact element={<TimeEdit />}></
                Route>
                <Route path="/time/details/:id" exact element={<TimeDetails />}></
                Route>
                <Route path="/jogador/list/" exact element={<ListJogador />}></
                Route>
                <Route path="/jogador/create" exact element={<JogadorCreate />}></
                Route>
                <Route path="/jogador/edit/:id" exact element={<JogadorEdit />}></
                Route>
            </Routes>
        </Router>
    )
}