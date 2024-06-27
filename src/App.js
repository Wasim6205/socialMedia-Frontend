import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import PostList from './components/PostList';
import Logout from './components/Logout';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PostList/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/forgot-password" element={<ForgotPassword/>} />
                <Route path="/reset-password" element={<ResetPassword/>} />
                <Route path='/logout' element={<Logout />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
