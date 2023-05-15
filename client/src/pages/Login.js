function login() {
    return (
        <>
            <div class="container">
                <h1>Login</h1>
                <form>
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" required />
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required />
                    <input type="submit" value="Login" />
                </form>
            </div>
        </>
    )
}

export default login;