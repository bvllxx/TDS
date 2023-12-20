import React,{useEffect, useRef, useState} from "react";
import { useForm } from "react-hook-form";
import { updateProject,deleteProject } from "../api/ProyectsApi";
import { getInvolvedUsers, getUserInfo } from "../api/AuthApi";

export function ProjectModal({ selectedTask , taskID, setSelectedTask,tasks,setTasks,status }){
    const {register, handleSubmit } = useForm();
    const [currentUser, setCurrentUser] = useState(null);
    const [involvedUsers, setInvolvedUsers] = useState(['']);
    const [isEditing, setIsEditing] = useState(false);
    const modalRef = useRef(null);
    
    const onSubmit = async (data) => {
      try {
        const response = await updateProject(taskID, data);
        if (response.status === 200) {
          // Actualizar el estado de los proyectos si la actualización fue exitosa
          const updatedTasks = tasks.map(task =>
            task.id === taskID ? { ...task, ...data } : task
          );
          setTasks(updatedTasks);
          setSelectedTask(null); // Limpiar el estado de selectedTask si es necesario
          setIsEditing(false); // Salir del modo de edición
          window.location.reload()
        } else {
          console.error('Error al actualizar la tarea:', response.data);
        }
      } catch (error) {
        console.error('Error al actualizar la tarea:', error.message);
      }
    };

    useEffect(()=>{
        async function fetchUserData() {
            try {
              const userResponse = await getUserInfo();
              setCurrentUser(userResponse.data.user); 
            } catch (error) {
              console.error('Error al obtener la información del usuario', error.message);
            }
        }fetchUserData();
      
        async function fetchInvolvedUsersData(users) {
          if (selectedTask) {
            const usersInfo = await Promise.all(
              users.map(async (userId) => {
                try {
                  const userResponse = await getInvolvedUsers(userId);
                  return userResponse.data.user;
                } catch (error) {
                  console.error(`Error al obtener información del usuario con ID ${userId}`, error.message);
                  return null;
                }
              })
            );
            setInvolvedUsers(usersInfo);
          }
        }fetchInvolvedUsersData(selectedTask?.involved_users || []); 

          if (modalRef.current) {
            modalRef.current.addEventListener('hidden.bs.modal', () => {
              setIsEditing(false);
            });
          }

    },[selectedTask]);


    const handleDescriptionEdit = () => {
        setIsEditing(!isEditing);
    };
    
    const handleFieldChange = (field, value) => {
        setSelectedTask(prevTask => ({
          ...prevTask,
          [field]: value,
        }));
    };

    const handleDelete = async (taskId) => {
        try {
          const confirmed = window.confirm('¿Estás seguro de que quieres eliminar esta tarea?');
      
          if (confirmed) {
            const response = await deleteProject(taskId);
            if (response.status === 204) {
              setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
              console.log('Tarea eliminada con éxito');
            } else {
              console.error('Error al eliminar la tarea:', response.data);
            }
          } else {
            console.log('La eliminación de la tarea fue cancelada');
          }
        } catch (error) {
          console.error('Error al eliminar la tarea:', error.message);
        }
        
    };

    return (
    <>
    {tasks.map((task) => (
        task.status === status && (
          <div
            key={task.id}
            className="modal fade modal-l"
            id={`exampleModal-${task.id}`}
            data-bs-theme="dark"
            tabIndex="-1"
            aria-labelledby={`exampleModalLabel-${task.id}`}
            aria-hidden="true"
            ref={modalRef} 
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5 fw-bold" id={`exampleModalLabel-${task.id}`}>
                    {selectedTask ? selectedTask.title : "NADA!!!!!"}
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <div className="modal-body">
                  {selectedTask && (
                    <>
                      {isEditing ? ( 
                      <>
                      <form
                      onSubmit={handleSubmit(onSubmit)}

                      > 
                        <h5>Titulo</h5>
                        <input type="text" 
                        {...register("title", { required: true })}
                        onChange={(e) => handleFieldChange("title", e.target.value)}
                        defaultValue={selectedTask ? selectedTask.title : ""}
                        className="form-control mb-4 "
                        />

                        <h5 className="mt-2">Descripción</h5>
                        <textarea
                        onChange={(e) => handleFieldChange("description", e.target.value)}
                        {...register("description", { required: true })}
                        defaultValue={selectedTask ? selectedTask.description : ""}
                        className="form-control mb-4 "
                        ></textarea>

                        <h6>Fuente de financiamiento </h6>

                        <input 
                        onChange={(e) => handleFieldChange("founding_src_name", e.target.value)}
                        {...register("founding_src_name", { required: true })}
                        defaultValue={selectedTask ? selectedTask.founding_src_name : ""}
                        className="form-control mb-4"/>

                        <h5>Estado</h5>

                        <select
                        className="form-select mb-3"
                        {...register("status", { required: true })}
                        defaultValue={selectedTask ? selectedTask.status : ""}
                        aria-label="Fuente de financiamiento">
                          <option value={"pendiente"}>Pendiente</option>
                          <option value={"en_proceso"}>En proceso</option>
                          <option value={"finalizado"}>Finalizado</option>
                        </select>

                        <div
                        className="d-flex justify-content-between">
                          <button 
                          className="btn btn-success"
                          type="submit"
                          >Confirmar</button>
                          <button 
                          className="btn btn-danger"
                          onClick={handleDescriptionEdit}
                          >Cancelar</button>
                        </div>

                      </form>

                      </>
                      ) : (
                        <>
                        <div className="position-relative">

                          <h5>Miembros</h5>

                          <ul className="list-unstyled mb-3" >
                          {involvedUsers.length > 0 ? (
                            involvedUsers.map((user, index) => (
                              <li className="mt-3" key={index}>
                                {user.profile_picture && (
                                  <>
                                    <img
                                      src={`http://localhost:8000/${user.profile_picture}`}
                                      alt={`${user.first_name} ${user.last_name}`}
                                      width="34"
                                      height="34"
                                      className="rounded-circle me-3"
                                    />
                                    <strong>{`${user.first_name} ${user.last_name}`}</strong>
                                  </>
                                )}
                              </li>
                            ))
                          ) : (
                            <li>No hay usuarios involucrados</li>
                          )}
                          </ul>

                          <h5 className="mt-2 fw-medium">Descripción</h5>
                          <p className="mb-3">{selectedTask.description}</p>
                          <h5>Fuente de financiamiento</h5>
                          <p className="mb-3">{selectedTask.founding_src_name}</p>
                          <p className="position-absolute top-0 end-0 fs-6 fw-lighter"><small>Inicio: {selectedTask.begin_date} </small></p>
                        </div>
                        
                        </>
                      )}
                    </>
                  )}
                </div>

                <div className="modal-footer  d-flex justify-content-between">
                {currentUser && (
                        <>
                        {currentUser.groups[0].name === "admins" && (
                          <>
                            <i
                            className={`bi bi-pencil-square edit-link`}
                            onClick={handleDescriptionEdit}></i>
                            <i
                            className="bi bi-trash edit-link"
                            type="button"
                            data-bs-dismiss="modal"
                            onClick={() => handleDelete(taskID)}></i>
                          </>
                        )} 
                        </>
                        )}
                </div>
              </div>
            </div>
          </div>
        )
      ))}
      </>
    )
}


export default ProjectModal;