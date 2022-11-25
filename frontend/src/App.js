import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Reserve from './components/Reserve/Reserve';

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
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;