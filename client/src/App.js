import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Game from './pages/Game';
import Collection from './pages/Collection';
import Register from './pages/Register';

import isAuthenticated from './services/isAuthenticated'

import './App.css';

function App() {
    const isAuth = isAuthenticated();

    return (
        <BrowserRouter>
            <Routes>
                {isAuth ? (
                    <>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </>
                ) : (
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="/game" element={<Game />} />
                        <Route path="/collection" element={<Collection />} />
                        <Route path="*" element={<Navigate to="/" />} />

                    </>
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default App;