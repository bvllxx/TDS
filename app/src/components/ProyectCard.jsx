import React, { useEffect, useState } from "react";

import { getProjects } from "../api/ProyectsApi";

import ProjectModal from "./ProjectView";
import { dragAndDrop } from "../function/Drag";

function ProyectCard({ status }) {

  const [tasks, setTasks] = useState([]);
  const [taskID, setSelectedTaskId] = useState();
  const [selectedTask, setSelectedTask] = useState();  

  useEffect(() => {

    async function loadTasks() {
      const res = await getProjects();
      setTasks(res.data);
    }loadTasks();


  }, []);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setSelectedTaskId(task.id);
  }
  
  return (
    <>
      {tasks.map((task) => (
        task.status === status && (
          <div
            className="pcard"
            key={task.id}
            draggable="true"
          >

            <p className="fw-bold">{task.title}</p>

            <div 
            className="more d-flex justify-content-between"
            key={task.id}
            data-bs-toggle="modal"
            data-bs-target={`#exampleModal-${task.id}`}
            onClick={() => handleTaskClick(task)}>Ver mas<i className="bi bi-chevron-right"></i></div>
          </div>

        )))}

        <ProjectModal
        selectedTask={selectedTask}
        taskID={taskID}
        setSelectedTask={setSelectedTask}
        tasks={tasks}
        setTasks={setTasks}
        status={status}/>

        {dragAndDrop()}
    </>
  );
}

export default ProyectCard;
