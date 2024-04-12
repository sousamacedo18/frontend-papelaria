import React,{useState,useEffect} from "react";
import '../../global.css'
import Head from "../componentes/head";
import Menu from "../componentes/menu";
import { Link } from "react-router-dom";
import { FiEdit,FiTrash } from "react-icons/fi";

export default function Listausuarios(){
const [usuarios,setUsuarios] = useState([]);
function mostrarusuarios(){
    const banco = JSON.parse(localStorage.getItem("usuarios")|| "[]")
    setUsuarios(banco);
}
function editarusuario(id){
 alert(`Estou editando usuário de id:${id}`)
}
function exluirusuario(id){
 alert(`Estou excluído usuário de id:${id}`)
}
useEffect(()=>{
    mostrarusuarios()
},[])
    return(
<div className="dashboard-container">
        <div className="menu">
            <Menu />
        </div>
        <div className="main">
            <Head title="Lista de Usuários" />
            <div>

                <Link to="/cadastrousuario" className='btn-novo'>Novo</Link>
            </div>
           <table>
            <tr>
             <th>ID</th>
             <th>Nome</th>
             <th>Email</th>
             <th></th>
             <th></th>
            </tr>
            
                {
                  usuarios.map((linha)=>{
                     return(
                        <tr key={linha.toString()}>
                        <td>{linha.id}</td>
                        <td>{linha.nome}</td>
                        <td>{linha.email}</td>
                        <td>
                            <FiEdit size={24} color="blue" cursor="pointer" onClick={(e)=>{editarusuario(linha.id)}} />
                        </td>
                        <td>
                            <FiTrash size={24} color="red" cursor="pointer" onClick={(e)=>{exluirusuario(linha.id)}}/>
                        </td>
                        </tr>
                     )
                  })  
                }
     
           
           </table>



        </div>
</div>
    )
}