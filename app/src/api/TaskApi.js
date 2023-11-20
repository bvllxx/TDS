import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const taskApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/tasks',
    withCredentials:true
})

export const getAllTask = () => {return taskApi.get('/')} 

export const getTask = (id) => {return taskApi.get(`/${id}`)} 

export const addTask = (task) => {return taskApi.post('/',task)}

export const deleteTask = (id) => {taskApi.delete(`/${id}`)}

export const updateTask = (id,task) => {taskApi.put(`/${id}`,task)}

export default getAllTask;