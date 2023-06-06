import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import GamePage from './pages/GamePage';
import WishListPage from './pages/WishListPage';
import Favorite from './pages/FavoritePage';
import RegisterPage from './pages/RegisterPage';
import isAuthenticated from './services/isAuthenticated';
import logout from './services/logout';
import './App.css';
import Layout from './layout/layout';
import ProfilePage from './pages/ProfilePage';
import Request from './pages/RequestPage';

function App() {
    const isAuth = isAuthenticated();
    return (
        <BrowserRouter>
            {isAuth ? (
                <Layout>
                    <Routes>
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/" element={<HomePage />} />
                        <Route path="/game" element={<GamePage />} />
                        <Route path="/wishlist" element={<WishListPage />} />
                        <Route path="/favorite" element={<Favorite />} />
                        <Route path="/request" element={<Request />} />
                        <Route path="/logout" Component={logout} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </Layout>
            ) : (
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            )}
        </BrowserRouter>
    );
}

export default App;
