import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router'; // Changed import source
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Error from './components/Error';
import UploadPhoto from './components/UploadPhoto';
import { globalContext } from './components/globalContext';
import Details from './components/Details';
import DisplayFit from './components/DisplayFit';
import RecommendedFit from './components/RecommendedFit';
import ProtectedRoutes from './components/ProtectedRoutes';
import ColorRecommendar from './components/ColorRecommendar';

function App() {
  const [auth, setAuth] = React.useState(false);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/upload-photo' element={<UploadPhoto />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/display-fit' element={<DisplayFit />} />
        <Route path='/recommended-fit' element={<RecommendedFit />} />
        <Route path='/details' element={<Details />} />
        <Route path='*' element={<Error />} />
        <Route path='/color-analysis' element={<ColorRecommendar />} />
        
      </Routes>
  
    </div>
  );
}

export default App;