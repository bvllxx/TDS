import React, { useEffect,useState } from "react";
import { getAllUsers } from "../api/AuthApi";
import { useForm } from "react-hook-form";
import { addProject } from "../api/ProyectsApi";

export function AddUser(){
    const {register,handleSubmit} = useForm();
    const [selectedOption, setSelectedOption] = useState("");
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]); // Almacena los IDs de los usuarios seleccionados

    useEffect(() => {
        async function fetchUsers() {
            const res = await getAllUsers();
            setUsers(res.data.users)
        }fetchUsers();
    },[]);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const onSubmit = async (data) => {
        try {
            console.log(data)
            await addProject(data)
          } catch (error) {
            console.error('Error al crear el proyecto', error.message);
          }
    };

    const handleUserSelection = (event, userId) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            setSelectedUsers([...selectedUsers, userId]);
        } else {
            const updatedSelectedUsers = selectedUsers.filter(id => id !== userId);
            setSelectedUsers(updatedSelectedUsers);
        }
    };

    return (
        <>
        <div
        className="offcanvas offcanvas-end"
        data-bs-theme="dark"
        tabIndex="-1"
        id="offcanvasTop"
        aria-labelledby="offcanvasTopLabel">
            
            <div 
            className="offcanvas-header">
                <h5 
                className="offcanvas-title"
                id="offcanvasTopLabel">Añadir un proyecto</h5>
                <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"></button>
            </div>

            <div
            className="offcanvas-body ">
                <form
                onSubmit={handleSubmit(onSubmit)}
                className="">
                       <div
                    className="input-group flex-nowrap mb-3">
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre del proyecto"
                        aria-describedby="addon-wrapping" 
                        {...register("title", {required:true})}/>
                    </div>
                    <textarea
                    className="form-control mb-3"
                    placeholder="Descripcion"
                    id="floatingTextarea2"
                    {...register("description",
                    {required:true})} ></textarea>

                    <div class="accordion " id="accordionExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                Integrantes
                            </button>
                            </h2>
                            <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <ul className="list-group">
                                {users.map(user => (
                                    <li className="list-group-item" key={user.user_id}>
                                        <input
                                            className="form-check-input me-1"
                                            type="checkbox"
                                            onChange={(event) => handleUserSelection(event, user.user_id)} // Manejar selección
                                        />
                                        <label className="form-check-label" htmlFor="firstCheckbox">
                                            {user.first_name} {user.last_name} {user.user_id}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                            </div>
                        </div>
                    </div>
                   

                    <hr />

                    <select
                    className="form-select mb-3"
                    value={selectedOption}
                    onChange={handleChange}
                    aria-label="Fuente de financiamiento">
                           <option value={"Inacap"}
                        {...register("founding_src_name", {required:true})}
                        >Interna</option>
                        <option value={"Externa"}>Externa</option>
                    </select>

                    {selectedOption === "Externa" && (
                        <input
                        type="text"
                        {...register("founding_src_name", {required:true})}
                        className="form-control mb-3"
                        placeholder="Nombre de la empresa"
                        aria-describedby="addon-wrapping" />
                    )}

                    <button
                    className="btn btn-outline-success"
                    data-bs-dismiss="offcanvas"
                    type="submit"
                    onClick={() => {window.location.reload()}}>
                        Añadir
                    </button>

                </form>
            </div>
        </div>
        </>
    )
}

export default AddUser;