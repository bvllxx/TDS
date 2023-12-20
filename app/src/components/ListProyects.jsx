import React from "react";
import '../App.css';
import ProyectCard from "./ProyectCard";

export function ProyectContent(){
    return (
    <>
        <div
        className="li-container">
            <div className="title-section">
                <h1
                className="li-title">Pendientes</h1>
                <hr
                className="separator" />
            </div>
            <ul
            className="pcards">
                <ProyectCard
                status="pendiente" />
            </ul>
        </div>
        
        <div
        className="li-container ">
            <h1
            className="li-title">En proceso</h1>
            <hr
            className="separator"/>
            <ul
            className="pcards">
                <ProyectCard
                status="en_proceso" />
            </ul>
        </div>

        <div
        className="li-container ">
            <h1
            className="li-title"> Finalizados </h1>
            <hr
            className="separator" />
            <ul
            className="pcards">
                <ProyectCard
                status="finalizado"/>
            </ul>
        </div>
    </>
    )
}

export default ProyectContent;