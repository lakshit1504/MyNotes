import Navbar from "./components/Navbar";
import "./App.css";
import NoteState from "./context/notes/NoteState";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
// import Alert from "./components/Alert";

function App() {
  return (
    <>
      <NoteState>
        
        <BrowserRouter>
          <Navbar />
          <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={ <Login/> } />
            <Route exact path="/signup" element={ <SignUp/> } />
          </Routes>
          </div>
        </BrowserRouter>
        
      </NoteState>
    </>
  );
}

export default App;
