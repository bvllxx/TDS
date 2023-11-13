import axios from 'axios';

const taskApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/tasks'
})

export const getAllTask = () => {return taskApi.get('/')} 

export const addTask = (task) => {return taskApi.post('/',task)}



export default getAllTask;