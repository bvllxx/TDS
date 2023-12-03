import axios from 'axios';
import Cookies from 'js-cookie';

/* Se definen las credenciales csrf para las proteccciones*/

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;


/*Se crea una instancia de axios  con las credenciales para
poder realizar las consultas al backend*/

const taskApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/',
    withCredentials:true,
    headers: {
        'Content-Type': 'application/json',
      }
});

taskApi.interceptors.request.use((config) => {
  const csrfToken = Cookies.get('csrftoken');
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

/*En las siguientes funciones, se realizan las consultas al backend
necesariasa para borrar,editar,añadir y visualizar los proyectos*/ 

export const getProjects = () => {return taskApi.get('list/')};

export const addProject = (data) => {return taskApi.post('create/',data)};

export const updateProject = (taskId,data ) => { return taskApi.put(`update/${taskId}/`, data)};

export const deleteProject = (taskId) => {return taskApi.delete(`delete/${taskId}/`)};

export default getProjects;