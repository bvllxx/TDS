import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProjects,deleteProject } from "../api/ProyectsApi";
import dragAndDrop from "./drag";


function ProyectCard({ status }) {

  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskID, setSelectedTaskId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadTasks() {
      const res = await getProjects();
      setTasks(res.data);
    }loadTasks();
  }, []);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setSelectedTaskId(task.id);
  };

  const handleEdit = (taskId) => {
    navigate(`/proyects/edit/${taskId}`);
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await deleteProject(taskId)
      if (response.status === 204) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        console.log('Tarea eliminada con éxito');
      } else {
        console.error('Error al eliminar la tarea:', response.data);
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
            onClick={() => handleTaskClick(task)}>Ver mas<i className="bi bi-caret-right"></i></div>
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
            <div
            className="modal-dialog">
              <div
              className="modal-content">
                <div
                className="modal-header">
                  <h1 
                  className="modal-title fs-5"
                  id={`exampleModalLabel-${task.id}`}>
                    {selectedTask ? selectedTask.title : "NADA!!!!!"}
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <div
                className="modal-body">
                  {selectedTask && (
                    <>
                      <h5>Descripción </h5>
                      <small>{selectedTask.description}</small>
                      <hr/>
                      
                      <h5>Fecha de inicio </h5>
                      <small>{selectedTask.begin_date}</small>
                      <hr/>

                      <h5>Fecha de termino </h5>
                      <small>{selectedTask.end_date}</small>
                      <hr/>

                      <h5>Fuente de financiamiento </h5>
                      <small>{selectedTask.founding_src_name}</small>
                      
                    </>
                  )}
                </div>

                <div
                className="modal-footer  d-flex justify-content-between">
                  <navigate
                  to="/proyects/edit"
                  className="edit-link"
                  onClick={() => handleEdit(task.id)}>
                    <i
                    className="bi bi-pencil-square"
                    data-bs-dismiss="modal"></i>
                  </navigate>
                  <i
                  className="bi bi-trash edit-link"
                  type="button"
                  data-bs-dismiss="modal"
                  onClick={() => handleDelete(taskID)}></i>
                </div>
              </div>
            </div>
          </div>
        )))}
    </>
  );
}

export default ProyectCard;
