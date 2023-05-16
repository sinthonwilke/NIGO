const logout = (navigate) => {
    console.log('logout');
    localStorage.removeItem('token');
    window.location.href = '/login';
};

export default logout;