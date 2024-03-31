// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './Auth';
import UserPage from './User';
import PostPage from './Post';
import MyAccountPage from './Account';
import HomePage from './Home';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Auth/>} />
        <Route path='/home' element={<HomePage/>} />
        <Route path="/my-account" element={<MyAccountPage/>} />
        <Route path='/user/:id' element={<UserPage/>} />
        <Route path='/post/:id' element={<PostPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
