import {BrowserRouter,Route,Routes} from 'react-router-dom'

import Logon from './pages/logon'
import Dashboard from './pages/dashboard'
import Cadastrousuario from './pages/cadastroUsuario'
import Cadastroproduto from './pages/cadastroProduto'
import Cadastroentrada from './pages/cadastroEntrada'
import Cadastrosaida from './pages/cadastroSaida'
import Listasaidas from './pages/listarSaida'

import Listausuarios from './pages/listaUsuarios'
import Listaprodutos from './pages/listaProdutos'
import Listaentrada from './pages/listaEntrada'
import Listaestoques from './pages/listaEstoques'

import Editarusuario from './pages/editarUsuario'
import Editarproduto from './pages/editarProduto'


export default function Rotas(){
    return(
     <BrowserRouter>
        <Routes>
        <Route path="/" exact element={<Logon />} />
        <Route path="/dashboard"  element={<Dashboard />} />
        <Route path="/cadastrousuario"  element={<Cadastrousuario />} />
        <Route path="/cadastroproduto"  element={<Cadastroproduto />} />
        <Route path="/cadastroentrada"  element={<Cadastroentrada />} />
        <Route path="/listarusuarios"  element={<Listausuarios />} />
        <Route path="/listarentradas"  element={<Listaentrada />} />
        <Route path="/listarsaidas"  element={<Listasaidas />} />
        <Route path="/listarprodutos"  element={<Listaprodutos />} />
        <Route path="/listarestoques"  element={<Listaestoques />} />
        <Route path="/editarusuario/:id"  element={<Editarusuario />} />
        <Route path="/editarproduto/:id"  element={<Editarproduto />} />


        </Routes>
     
     </BrowserRouter>

    )
}

