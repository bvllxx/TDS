import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getProjects,deleteProject, updateProject } from "../api/ProyectsApi";
import dragAndDrop, { handleDragStart } from "./Drag";

function ProyectCard({ status }) {

  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskID, setSelectedTaskId] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const {register, handleSubmit } = useForm();

  useEffect(() => {
    async function loadTasks() {
      const res = await getProjects();
      setTasks(res.data);
    }loadTasks();
  }, []);

  const onSubmit = async (data) => {
    await updateProject(taskID,data)
    window.location.reload();
  }

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setSelectedTaskId(task.id);
  }

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

      {/* Seccion encargada de renderizar las targetas con informacion sobre los proyectos  */ }

      {tasks.map((task) => (
        task.status === status && (
          <div
            className="pcard"
            key={task.id}
            draggable="true"
          >
            <p>{task.title}</p>

            <div 
            className="more d-flex justify-content-between"
            key={task.id}
            data-bs-toggle="modal"
            data-bs-target={`#exampleModal-${task.id}`}
            onClick={() => handleTaskClick(task)}>Ver mas<i class="bi bi-chevron-right"></i></div>
          </div>
        )))}
      
      {/* Seccion encargada de renderizar el componente modal*/}

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
                          <h5 className="mt-2 fw-medium">Descripción</h5>
                          <p className="mb-5">{selectedTask.description}</p>
                          <h6>Fuente de financiamiento</h6>
                          <p className="mb-5">{selectedTask.founding_src_name}</p>
                          <p className="position-absolute top-0 end-0 fs-6 fw-lighter"><small>{selectedTask.begin_date}</small></p>
                        </div>
                        
                        </>
                      )}
                    </>
                  )}
                </div>

                <div className="modal-footer  d-flex justify-content-between">
                  <i
                    className={`bi bi-pencil-square edit-link`}
                    onClick={handleDescriptionEdit}
                  ></i>
                  <i
                  className="bi bi-trash edit-link"
                  type="button"
                  data-bs-dismiss="modal"
                  onClick={() => handleDelete(taskID)}></i>
                
                </div>
              </div>
            </div>
          </div>
        )
      ))}
    </>
  );
}

export default ProyectCard;
