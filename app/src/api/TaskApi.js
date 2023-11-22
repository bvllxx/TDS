import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const taskApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/',
    withCredentials:true
})

export const getProyects = () => {return taskApi.get('/')};

export const addProyects = () => {};

export const updateProyects = () => {};

export const deleteProjects = () => {};


export default getProyects;