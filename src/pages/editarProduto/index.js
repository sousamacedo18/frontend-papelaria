import React, { useEffect, useState } from "react";
import Menu from "../componentes/menu";
import Head from "../componentes/head";
import { useNavigate, useParams } from "react-router-dom";
import Barrasuperior from "../componentes/barrasuperior";

import '../../global.css'

export default function Editarusuario(){
    const navigate = useNavigate();
    const {id} = useParams();
    const [status, setStatus] = useState("");
    const [descricao, setDescricao] = useState("");
    const [estoque_minimo, setEstoque_minimo] = useState();
    const [estoque_maximo, setEstoque_maximo] = useState([]);

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const produto = {
        id: id,
        status,
        descricao,
        estoque_minimo,
        estoque_maximo,
    };

    useEffect(()=>{
        exibirdados();
    }, []);

    const exibirdados = () => {
        const banco = JSON.parse(localStorage.getItem("produtos") || "[]");
        banco.filter(linha => linha.id === id).map(value => {
            setStatus(value.status);
            setDescricao(value.descricao);
            setEstoque_minimo(value.estoque_minimo);
            setEstoque_maximo(value.estoque_maximo);
        });
    };

    const salvardados = (e) => {
        e.preventDefault();
        const banco = JSON.parse(localStorage.getItem("produtos") || "[]");
        const dadosvelhos = banco.filter(linha => linha.id !== id);
        dadosvelhos.push(produto);
        localStorage.setItem("produtos", JSON.stringify(dadosvelhos));
        alert("Dados Salvos com Sucesso!!!!!")
        navigate("/listarprodutos");
    };

    return(
        <div className="dashboard-container">
            <Barrasuperior />
            <div className="header"> 
                <div className="menu">
                    <Menu />
                </div>
                <div className="main">
                    <Head title="Editar Produto" />
                    <form onSubmit={salvardados} > 
                        <select value={status} onChange={(e)=>{setStatus(e.target.value)}}>
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
                            placeholder="Estoque Máximo"
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
    );
}
