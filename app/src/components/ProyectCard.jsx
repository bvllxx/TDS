import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {getAllTask,deleteTask} from "../api/TaskApi";

function ProyectCard({ status }) {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskID, setSelectedTaskId] = useState();

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
                      <p>Deskripsion: {selectedTask.description}</p>
                      <p>Integrantes</p>
                      <p>Fecha de inicio</p>
                      <p>Fecha de termino</p>
                      <p>Status: {selectedTask.status}</p>
                    </>
                  )}
                </div>

                <div className="modal-footer  d-flex justify-content-between">
                <Link 
                className="edit-link" 
                to={{
                pathname: "/proyects/edit",
                state: {taskId: taskID}}}>
                  <i className="bi bi-pencil-square" data-bs-dismiss="modal"> </i></Link>
                  <i className="bi bi-trash edit-link" type="button" data-bs-dismiss="modal" onClick={async () => {
                    const accept = window.confirm('Seguro que desea eliminar?');
                    accept && (
                      await deleteTask(task.id)
                    )}}></i>
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
