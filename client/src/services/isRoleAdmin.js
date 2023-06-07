function isRoleAdmin() {
    const role = localStorage.getItem('role');
    return role === 'admin' ? true : false;
}
export default isRoleAdmin;