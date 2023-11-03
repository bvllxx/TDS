import React from "react";
import '../App.css';
import ListProyects from "./ListProyect";

export function ProyectContent(){
    return (
        <section className="main">
            
            <ListProyects/>

            <div className="li-container ">
                <h1 className="li-title">En proceso</h1>
                <hr className="separator" />
                <ul className="cards">
                    <div className="card">
                        <p>Proyecto con nombre generico</p>
                    </div>
                </ul>
            </div>

            <div className="li-container ">
                <h1 className="li-title">FInalizados</h1>
                <hr className="separator" />
                <ul className="cards">
                    <div className="card">
       
                    </div>
                </ul>
            </div>

        </section>
    )
}

export default ProyectContent;