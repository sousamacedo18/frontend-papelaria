import {Link} from 'react-router-dom'
import { FiUser, FiTag, FiTruck,FiShoppingCart,FiGrid, FiHome } 
from "react-icons/fi";

export default function Menu(){
    return(
        <div>
            <nav>
            <h1>Menu</h1>
            <Link to="/dashboard" className='link'><FiHome className='icons-menu' size={24}/>Home</Link>
            <Link to="/listarusuarios" className='link'><FiUser className='icons-menu' size={24}/>Usuário</Link>
            <Link to="/listarprodutos" className='link'><FiTag className='icons-menu' size={24}/>Produto</Link>
            <Link to="/listarentradas" className='link'><FiShoppingCart className='icons-menu' size={24}/>Entrada</Link>
            <Link to="/listarestoques" className='link'><FiGrid className='icons-menu' size={24}/>Estoque</Link>
            <Link to="listarsaidas" className='link'><FiTruck className='icons-menu' size={24}/>Saída</Link>

            </nav>
        </div>
    )
}