import React from "react";
import '../../global.css'
import Head from "../componentes/head";
import Menu from "../componentes/menu";

export default function Listausuarios(){
    return(
<div className="dashboard-container">
        <div className="menu">
            <Menu />
        </div>
        <div className="main">
            <Head title="Lista de Usuários" />
        </div>
</div>
    )
}