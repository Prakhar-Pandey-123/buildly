import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import { Builder } from './pages/Builder.jsx';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-center"></Toaster>
    <Routes>
      <Route element={<Home />} path='/'>
      </Route>
      <Route element={<Builder />} path='/builder'>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;