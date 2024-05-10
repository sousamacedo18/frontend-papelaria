import React,{useState,useEffect} from "react";
import '../../global.css'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Head from "../componentes/head";
import Menu from "../componentes/menu";
import { Link, useNavigate } from "react-router-dom";
import {FiEdit,FiTrash, FiAlignJustify } from "react-icons/fi";
import Barrasuperior from "../componentes/barrasuperior";
import Barcode from 'react-barcode';

export default function Listaentrada(){
const navigate = useNavigate();
const [entradas,setEntradas] = useState([]);
const [quantidade,setQuantidade] = useState(0);

function mostrarentradas(){
    const banco = JSON.parse(localStorage.getItem("entradas")|| "[]")
    setQuantidade(banco.length)
    setEntradas(banco);
}
function mostrarproduto(id){

  let produto = JSON.parse(localStorage.getItem("produtos")|| "[]")

 const nome= produto.filter(linha=>{
          return linha.id===id
  })
  return nome[0].descricao;
  
}
function editarentrada(id){
 alert(`Estou editando entrada de id:${id}`)
 navigate(`/editarentrada/${id}`)
}
function currencyFormat(num) {
  let REAL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});
return REAL.format(num);
}

  const  excluirentrada = (id) => {
        confirmAlert({
          title: 'Excluir entrada',
          message: 'Deseja realmente excluir esse entrada?',
          buttons: [
            {
              label: 'Sim',
              onClick: () => {
                const banco = JSON.parse(localStorage.getItem("entradas")|| "[]")
                const dadosvelhos = banco.filter(linha=>
                  {
                      return linha.id!=id
                  }
                  )
                  localStorage.setItem("entradas",JSON.stringify(dadosvelhos))
                  mostrarentradas();
              }
            },
            {
              label: 'Não',
              onClick: () => alert('Ação cancelada!')
            }
          ]
        });
      };
function calcular(num1,num2){
  return num1*num2
}
function mostrarcodigobarras(cod){
  return <Barcode  value={cod} width={1} height={30} fontSize={8}/>;
}
useEffect(()=>{
    mostrarentradas()
},[])
    return(
<div className="dashboard-container">
<Barrasuperior />
<div className="header">
        <div className="menu">
            <Menu />
        </div>
        <div className="main">
           <FiAlignJustify className="btn-menu"/>
          <Head title="Lista de Entradas"  />
          <Link to="/cadastroentrada" className='btn-novo'>Novo</Link> 
           <table>
            <tr>
             <th>ID</th>
             <th>Cod Barra</th>
             <th>id_Produto</th>
             <th>Qtd</th>
             <th>Valor Unitário</th>
             <th>Total</th>
             <th>Data Entrada</th>
             <th></th>
             <th></th>
            </tr>
            
                {
                  entradas.map((linha)=>{
                     return(
                        <tr key={linha.toString()}>
                        <td>{linha.id}</td>
                        <td>{mostrarcodigobarras(linha.id_produto)}</td>
                        <td>{mostrarproduto(linha.id_produto)}</td>
                        <td>{linha.qtde}</td>
                        <td>{currencyFormat(linha.valor_unitario)}</td>
                        <td>{currencyFormat(linha.valor_unitario * linha.qtde)}</td>
                        <td>{linha.data_entrada}</td>
                        <td>
                            <FiEdit size={24} color="blue" cursor="pointer" onClick={(e)=>{editarentrada(linha.id)}} />
                        </td>
                        <td>
                            <FiTrash size={24} color="red" cursor="pointer" onClick={(e)=>{excluirentrada(linha.id)}}/>
                        </td>
                        </tr>
                     )
                  })  
                }
     
             <tr>
              <th colSpan={9}>Total de Registros:{quantidade}</th>
   
             </tr>
           </table>



        </div>
        </div>
        
</div>
    )
}