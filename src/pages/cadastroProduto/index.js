import { useState } from "react"
import Menu from "../componentes/menu"
import Head from "../componentes/head"
import {useNavigate, Link} from "react-router-dom"
import Barrasuperior from "../componentes/barrasuperior";


import '../../global.css'

export default function Cadastrousuario(){
    const navigate = useNavigate();
    const [status,setStatus] = useState("")
    const [descricao,setDescricao] = useState("")
    const [estoque_minimo,setEstoque_minimo] = useState()
    const [estoque_maximo,setEstoque_maximo] = useState()


    const produto={
        id:Date.now().toString(36)+Math.floor(Math.pow(10,12)+Math.random()*9*Math.pow(10,12)).toString(36),
        status,
        descricao,
        estoque_minimo,
        estoque_maximo

    };
    const salvardados=(e)=>{
      e.preventDefault();
     const banco = JSON.parse(localStorage.getItem("produtos")|| "[]")
     banco.push(produto)
     localStorage.setItem("produtos",
     JSON.stringify(banco))
    alert("Dados Salvos com Sucesso!!!!!")
    navigate("/listarprodutos")
    }
    return(
        <div className="dashboard-container">
    
        <Barrasuperior />
            <div className="header">  
                <div className="menu">
                    <Menu />
                </div>
                <div className="main">
                    <Head title="Cadastro de Produtos" />
    
                    <form onSubmit={salvardados} > 
                        
                       <select onChange={(e)=>{setStatus(e.target.value)}}>
                        <option value="Ativo">Ativo</option>
                        <option value="Inativo">Inativo</option>

                       </select>
                       <input 
                       type="text" 
                       placeholder="Descrição"
                       value={descricao}
                       onChange={(e)=>setDescricao(e.target.value)}                      
                       />
                       <input 
                       type="number" 
                       placeholder="Estoque Mínimo"
                       value={estoque_minimo}
                       onChange={(e)=>setEstoque_minimo(e.target.value)}                     
                       />
                       <input 
                       type="number" 
                       placeholder="Estoque Mínimo"
                       value={estoque_maximo}
                       onChange={(e)=>setEstoque_maximo(e.target.value)}                     
                       />
                       <button className="btn-salvar">
                        Salvar
                       </button>
                      
                    </form>
                </div>
        </div>
    </div>
            )
}