import axios from 'axios';
import Cookies from 'js-cookie';

/* Se definen las credenciales csrf para las proteccciones*/ 

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

/*Se crea una instancia de axios  con las credenciales para
poder realizar las consultas al backend*/
const accessToken = localStorage.getItem('accessToken');
const client = axios.create({
    baseURL: 'http://localhost:8000/',
    withCredentials:true,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}` 
      }
});

client.interceptors.request.use((config) => {
  const csrfToken = Cookies.get('csrftoken');
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const signup = (data) => { return client.post('auth/register/',data)};

export const login = (data) => { return client.post('api/token/',data )};

export const logout = () => {return localStorage.removeItem('accessToken')};

export const getUserInfo = () => { return client.get('auth/user/')};

export const getInvolvedUsers = (id) => { return client.get(`auth/users/${id}/`,id)}

export default login