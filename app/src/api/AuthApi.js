import axios from 'axios';

axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://localhost:8000/",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const signup = (data) => { return client.post('auth/register/',data)};

export const login = (data) => { return client.post('api/token/',data )};

export const logout = () => {return localStorage.removeItem('accessToken')};

export const getUserInfo = () => {return client.get('auth/user/')};

export default login