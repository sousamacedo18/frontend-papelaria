import {FiAlignJustify} from "react-icons/fi";
import {Link} from "react-router-dom";
export default function Head ({title, link=""}){
    return(
        <div className="head">
     
             <h1>{title}</h1>
          
        </div>
    )
}