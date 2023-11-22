import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {getAllTask} from "../api/TaskApi";
import axios from "axios";
import Cookies from 'js-cookie';

const getCsrfTokenFromCookies = () => {
  return Cookies.get('csrftoken');
};


function ProyectCard({ status }) {

  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskID, setSelectedTaskId] = useState();
  const csrfToken = getCsrfTokenFromCookies();


  useEffect(() => {
    async function loadTasks() {
      const res = await getAllTask();
      setTasks(res.data);
    }loadTasks();
  }, []);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setSelectedTaskId(task.id);
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/tasks/delete/${taskId}/`,
        {
          headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
        );
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
      {tasks.map((task) => (
        task.status === status && (
          <div
            className="pcard"
            key={task.id}
          >
            <p>{task.title}</p>

            <div 
            className="more d-flex justify-content-between" key={task.id}
            data-bs-toggle="modal"
            data-bs-target={`#exampleModal-${task.id}`}
            onClick={() => handleTaskClick(task)}>Ver mas<i className="bi bi-caret-right"></i></div>
          </div>
        )))}

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
                  <h1 className="modal-title fs-5" id={`exampleModalLabel-${task.id}`}>
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

                <div className="modal-footer  d-flex justify-content-between">
                <Link 
                className="edit-link" 
                to={{ 
                pathname: "/proyects/edit",
                state: { taskId: taskID }
                }}>
                  <i className="bi bi-pencil-square" data-bs-dismiss="modal"> </i></Link>
                  <i className="bi bi-trash edit-link" type="button" data-bs-dismiss="modal" onClick={() => handleDelete(task.id)}></i>
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
