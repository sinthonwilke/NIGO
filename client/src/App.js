import { BrowserRouter, Routes, Route, redirect } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Content from './components/Content';
import Login from './pages/Login';

import IsAuth from './services/IsAuth';

function App() {

    // if (IsAuth) return (
    //     <BrowserRouter>
    //         <Routes>
    //             <Route path="/login" element={
    //                 <>
    //                     <Login />
    //                 </>
    //             }
    //             />
    //         </Routes>
    //     </BrowserRouter>
    // );

    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={
                    <>
                        <Header />
                        <Nav />
                        <Content />
                    </>
                }
                />

                {/* <Route path="/login" element={
                    <>
                        <Login />
                    </>
                }
                /> */}


            </Routes>
        </BrowserRouter>
    );
}

export default App;
