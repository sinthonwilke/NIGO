import axios from 'axios';
import { logoutUrl } from './apiList';

const logout = (navigate) => {
    axios.get(logoutUrl, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
        .then(response => {
            localStorage.removeItem('token');
            localStorage.removeItem('searchValue');
            window.location.href = '/login';
        })
        .catch(error => {
            console.log(error);
        });
};

export default logout;
