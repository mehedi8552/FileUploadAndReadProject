import React from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from "./Component/Home";
import UploadSuccess from "./Component/UploadSuccess";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/imageUpload" element={<UploadSuccess />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
