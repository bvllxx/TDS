import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const getCsrfTokenFromCookies = () => {return Cookies.get('csrftoken')};

const csrfToken = getCsrfTokenFromCookies();

const taskApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/',
    withCredentials:true,
    headers: {
        'X-CSRFToken': csrfToken,
        'Content-Type': 'application/json',
      }
});

export const getProjects = () => {return taskApi.get('list/')};

export const addProject = (data) => {return taskApi.post('create/',data)};

export const updateProject = () => {};

export const deleteProject = (taskId) => {return taskApi.delete(`delete/${taskId}/`)};

export default getProjects;