
import './App.css';
import NavBar from './components/NavBar';
import NoteState from './context/notes/NoteState';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Signup from './components/Signup';
import Login from './components/Login';


function App() {
  return (
    <BrowserRouter>
      <NoteState>
        <>
          <NavBar />
          <div className="container">
            <Routes>
              <Route exact element={<Home />} path='/' />
              <Route exact element={<About />} path='/about' />
              <Route exact element={<Login />} path='/login' />
              <Route exact element={<Signup />} path='/signup' />
            </Routes>
          </div>
        </>
      </NoteState>
    </BrowserRouter>
  );
}

export default App;
