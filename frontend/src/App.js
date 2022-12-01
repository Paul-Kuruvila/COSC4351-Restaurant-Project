import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Reserve from './components/Reserve/Reserve';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';

const App = () => {
    return (
        <Router>
            <div className='App'>
                <Navbar />
                <div className='content'>
                    <Routes>
                        <Route exact path = '/' element={<Home />} />
                        <Route path = '/login' element={<Login />} />
                        <Route path = '/reserve' element={<Reserve />} />
                        <Route path = '/register' element={<Register />} />
                        <Route path = '/profile' element={<Profile />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;