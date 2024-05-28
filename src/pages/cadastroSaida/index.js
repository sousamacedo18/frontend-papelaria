import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../componentes/menu";
import Head from "../componentes/head";
import Barrasuperior from "../componentes/barrasuperior";
import "../../global.css";
import bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {FiAirplay } from "react-icons/fi";

export default function CadastroEntrada() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [id_produto, setId_Produto] = useState("");
  const [descricao,setDescricao]= useState("");
  const [qtde, setQTDE] = useState("");
  const [valor_unitario, setValor_Unitario] = useState("");
  const [data_saida, setData_saida] = useState("");

  useEffect(() => {
    const banco = JSON.parse(localStorage.getItem("produtos") || "[]");
    setProdutos(banco);
  }, []);

  const salvarDados = (e) => {
    e.preventDefault();
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
      e.preventDefault();
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1].focus();
    }
    const estoques = JSON.parse(localStorage.getItem("estoques") || "[]");
    console.log(typeof estoques)
    //iniciando para atualizar entrada
    const saida = {
      id: Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36),
      id_produto,
      qtde,
      valor_unitario,
      data_saida,
    };
    //buscando todos os produtos no estoque
    
  //filtrando o produto no estoque

    // Se 'estoques' for um array, continue com o código para filtrá-lo.

    const produtoexiste = estoques.filter((linha) =>{
     return linha.id_produto === id_produto
    } );
    // Restante do código...

    //independente de ter o produto no estoque ou nao, aqui será inserido no estoque 
    const entradas = JSON.parse(localStorage.getItem("entradas") || "[]");
    entradas.push(saida);
    localStorage.setItem("entradas", JSON.stringify(entradas)); 
// até aqui a entrada foi inserida, lembrando que será inserida independente de haver o produto ou nao no estoque


    //atualizando estoque
// aqui verificaremos se o id do produto que foi inserido na entrada, consta no estoque
if (produtoexiste.length > 0 && produtoexiste[0].id_produto) {
      // caso o produto seja encontrado no estoque, nesse bloco, faremos a atualização da quantidade e do valor desse produto
                
      const paraatualizar = estoques.filter((linha)=>{
                 return linha.id_produto !== id_produto // fazando um filtro para verificar se o produto esta no estoque
                })
                const qtde_estoque = produtoexiste ? produtoexiste[0].qtde : 0;
                const id_estoque = produtoexiste ? produtoexiste[0].id : 0;
                // aqui faremos a atualização no estoque, na situação de acharmos o produto no estoque
                if(qtde_estoque<=qtde){
                    //só atualizo o estoque se a quantidade que existe no estoque
                    // for menor ou igual ao valor que darei saída
                    const atualizarestoque ={
                        id:id_estoque,
                        id_produto:id_produto,
                        qtde: parseFloat(qtde_estoque) + parseFloat(saida.qtde),
                        valor_unitario: saida.valor_unitario,
                      }
                      paraatualizar.push(atualizarestoque) // aqui estamos juntando o que não foi alterado no estoque com os dados que serão alterados
                      localStorage.setItem("estoques", JSON.stringify(paraatualizar));// pronto agora o estoque será alterado
                      alert("Dados Salvos com Sucesso!!!!!");
                      navigate("/listasaidas");
                    }else{
                        alert("A quantidade de saída está maior que a quantidade no estoque")
                }

                
            } else{
                alert("Produto inexistente no estoque!")
            }


  };
  useEffect(()=>{
    if(id_produto.length>10){

      const produtos = JSON.parse(localStorage.getItem("produtos")|| "[]")
      const produto = produtos.filter(linha=>
        {
            return linha.id===id_produto
        }
        )
        if(produto){
          setId_Produto(produto[0].id)
        }
     console.log(produto)
      }
  },[id_produto])

  const  pesquisar = () => {
    confirmAlert({
      title: 'Pesquisar Produto',
      message: <div>
        <input type="text" style={{width:"100%"}}  onChange={(e)=>setId_Produto(e.target.value)} />
        <div>{descricao}</div>
        </div>
       
        ,
      buttons: [
        {
          label: 'Selecionar',
          onClick: () => {
 
          }
        },
        {
          label: 'Não',
          onClick: () => alert('Ação cancelada!')
        }
      ]
    });
  };
  return (
    <div className="dashboard-container">
      <Barrasuperior />
      <div className="header">
        <div className="menu">
          <Menu />
        </div>
        <div className="main">
          <Head title="Cadastro de Entrada" />
          <form onSubmit={salvarDados}>
            <select name="select" value={id_produto} onChange={(e) => setId_Produto(e.target.value)}>
              <option value="">Selecione um Produto</option>
              {produtos.map((produto) => (
                <option key={produto.id} value={produto.id}>{produto.descricao}</option>
              ))}
            </select>
            <div>
            <Button color="danger" onClick={(e)=>pesquisar()}>Pesquisar Produto</Button>
          
            
            </div>
            <input
              type="text"
              placeholder="Quantidade"
              value={qtde}
              onChange={(e) => setQTDE(e.target.value)}
            />
            <input
              type="number"
              placeholder="Valor Unitário"
              value={valor_unitario}
              onChange={(e) => setValor_Unitario(e.target.value)}
            />

            <input
              type="date"
              placeholder="data de entrada"
              value={data_saida}
              onChange={(e) => setData_saida(e.target.value)}
            />
            <button type="submit" className="btn-salvar">
              Salvar
            </button>
          </form>
          {id_produto}
        </div>
      </div>
    </div>
  );
}
