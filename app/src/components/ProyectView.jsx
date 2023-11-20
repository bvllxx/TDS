import React from "react";
import { Link } from "react-router-dom";
import { updateTask } from "../api/TaskApi";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

export function ProyectView(){

    const location = useLocation();
    const taskId = location.state;
    console.log(taskId);

    const {register,handleSubmit} = useForm();
    const onSubmit = handleSubmit( async data => {
        const res = await updateTask(data);
        return res;
    });

    return (
        <>
        <div className="edit-card">
            <h4 className="p-3">Editar</h4>
            <form className="p-3" data-bs-theme="dark" onSubmit={onSubmit}>
                <div className="input-group flex-nowrap mb-3">
                    <input type="text" className="form-control" placeholder="Nombre" aria-label="Username" aria-describedby="addon-wrapping" {...register("title", {required:true})} />
                </div>
                <textarea className="form-control mb-3" placeholder="Descripcion" id="floatingTextarea2" {...register("description", {required:true})} ></textarea>
                <div className=" d-flex justify-content-between">
                    <button className="btn btn-success" >Guardar cambios</button>
                    <Link to={"/proyects"}><button className="btn btn-danger">Cancelar</button></Link>
                </div>
            </form>
        </div>
        </>
    )
}

export default ProyectView