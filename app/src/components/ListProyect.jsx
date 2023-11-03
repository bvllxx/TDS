import '../App.css';
import React, { useEffect,useState } from "react";
import getAllTask from "../api/TaskApi";

export function ListProyects() {
    const [tasks, setTasks] = useState([]);
  
    useEffect(() => {
      async function loadTasks() {
        const res = await getAllTask();
        setTasks(res.data);
      }
      loadTasks();
    }, []);

    return (
    
    <div className="li-container">
        
        <h1 className="li-title">Pendientes</h1>
        <hr className="separator" />

        <ul className="cards">
            {tasks.map((task) => (
                <div className="card" key={task.id}>
                    <h1>{task.title}</h1>
                    <a href=""><i class="bi bi-three-dots"></i></a>
                </div>
            ))}
        </ul>
    </div>

    )
  }
  

export default ListProyects;