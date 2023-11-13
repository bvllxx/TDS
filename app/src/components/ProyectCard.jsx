import React, { useEffect,useState } from "react";
import getAllTask from "../api/TaskApi";

export function ProyectCard({ status }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      const res = await getAllTask();
      setTasks(res.data);
    }
    loadTasks();

  },
  []);

  return (
    <>
      {tasks.map((task) => (
        task.status === status && (
          <div
            className="pcard"
            key={task.id}
          >
            <p>{task.title}</p>
          </div>
        )
      ))}
    </>
  );
  
}

export default ProyectCard;