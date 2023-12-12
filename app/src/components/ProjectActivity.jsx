import React from "react";


export function NombreProvisional(){
    return (
        <div className="container">
            <h1>Lista de Tareas</h1>
            <div className="search">
                <form>
                    <input type="text" placeholder="Agregar tarea..."/>
                    <button className="btn-add">+</button>
                </form>
            </div>
            <div className="li-container">
                <ul>
                    
                </ul>
            </div>
            <div className="empty">
                <p>No tienes tareas pendientes.</p>
            </div>
        </div>
    )}
    
export default NombreProvisional;