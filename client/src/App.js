import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import GamePage from './pages/GamePage';
import WishListPage from './pages/WishListPage';
import RegisterPage from './pages/RegisterPage';

import isAuthenticated from './services/isAuthenticated'

import './App.css';

function App() {
    const isAuth = isAuthenticated();

    return (
        <BrowserRouter>
            <Routes>
                {isAuth ? (
                    <>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </>
                ) : (
                    <>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/game" element={<GamePage />} />
                        <Route path="/wishlist" element={<WishListPage />} />
                        <Route path="*" element={<Navigate to="/" />} />

                    </>
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default App;