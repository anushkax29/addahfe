import './App.css';
import React from 'react';
import Home from './components/Home';
import Login from './components/Login'
import Signup from './components/Signup'
import Error from'./components//Error'
import UploadPhoto from './components/UploadPhoto'
import {Routes, Route} from 'react-router';
import { globalContext } from './components/globalContext';
import Details from './components/Details';

import ProtectedRoutes from './components/ProtectedRoutes';

function App() {

  const [auth, setAuth] = React.useState(false);

  return (
    <globalContext.Provider value={{auth, setAuth}}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/upload-photo' element={<UploadPhoto />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/details' element = {
          <Details />
          } />
        <Route path='*' element={<Error />}/>
      </Routes>
    </globalContext.Provider>
  );
}
export default App