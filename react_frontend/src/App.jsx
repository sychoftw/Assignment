import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login'; // ✅ Import Login
import './App.css';
import CreateEmploy from "./pages/CreateEmploy";
import EmployList from "./pages/EmployList";
import OpenRoute from "./Auth/OpenRouter";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>

        <Route path='/login' element={
          <OpenRoute>
            <Login />
          </OpenRoute>
          } />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/createEmploy' element={<CreateEmploy />}/>
        <Route path="/employList" element={<EmployList/>}></Route>
        <Route path="/editEmploy/:id" element={<CreateEmploy/>}></Route>
      </Routes>
    </div>
  );
}

export default App;

