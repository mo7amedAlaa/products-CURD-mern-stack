import { Route, Routes } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import CreatePage from "./pages/Createpage";
import Homepage from './pages/HomePage';
import EditProductPage from "./pages/EditPage";
function App() {
 
  return  ( <div>
      <Navbar/>
      <Routes >
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/edit/:id" element={<EditProductPage />} />
      </Routes>
    </div>
   )
}

export default App
