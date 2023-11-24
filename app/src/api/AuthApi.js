import axios from 'axios';

axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://localhost:8000/api-auth/",
  withCredentials: true
});

export const signin = (data) => { return client.post("register/",data )};

export const login = (data) => { return client.post("login/",data )}

export const logout = () => {return client.post("logout/")}

export default login