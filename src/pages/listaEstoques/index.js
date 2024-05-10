import React,{useState,useEffect} from "react";
import '../../global.css'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Head from "../componentes/head";
import Menu from "../componentes/menu";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit,FiTrash } from "react-icons/fi";
import Barrasuperior from "../componentes/barrasuperior";

export default function Listaestoques(){
const navigate = useNavigate();
const [estoques,setEstoques] = useState([]);
const [quantidade,setQuantidade] = useState(0);

function mostrarproduto(id){

    let produto = JSON.parse(localStorage.getItem("produtos")|| "[]")
 
   const nome= produto.filter(linha=>{
            return linha.id===id
    })
    return nome[0].descricao;
    
}

function mostrarestoques(){
    const banco = JSON.parse(localStorage.getItem("estoques")|| "[]")
    setQuantidade(banco.length)
    setEstoques(banco);
}

useEffect(()=>{
 mostrarestoques();
},[])

    return(
<div className="dashboard-container">
<Barrasuperior />
<div className="header">
        <div className="menu">
            <Menu />
        </div>
        <div className="main">
            <Head title="Lista de Estoque" />

           <table>
            <tr>
             <th>ID</th>
             <th>Produto</th>
             <th>Quantidade</th>
             <th>valor Unitário</th>
            </tr>
            
                {
                  estoques.map((linha)=>{
                     return(
                        <tr key={linha.toString()}>
                        <td>{linha.id}</td>
                        <td>{mostrarproduto(linha.id_produto)}</td>
                        <td>{linha.qtde}</td>
                        <td>{linha.valor_unitario}</td>
                      </tr>
                     )
                  })  
                }
     
             <tr>
              <th colSpan={5}>Total de Registros:{quantidade}</th>
   
             </tr>
           </table>



        </div>
        </div>
        
</div>
    )
}