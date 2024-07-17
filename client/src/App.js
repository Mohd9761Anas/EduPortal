import React from "react";
import Students from "./components/students";
import Teachers from "./components/teacher";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      
        
          {/* <Route exact path="/" element={<Login/>} /> */}
          <Route exact path="/" element={<Students/>} />
          <Route path="/teacher" element={<Teachers/>} />
        
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
