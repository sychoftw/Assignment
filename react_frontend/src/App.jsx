import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login'; 
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
            <Login />
         
          } />
        <Route path='/dashboard' element={
          <OpenRoute>
            <Dashboard />
          </OpenRoute>
          } />
        <Route path='/createEmploy' element={
          <OpenRoute>
          <CreateEmploy />
          </OpenRoute>}/>
        <Route path="/employList" element={
          <OpenRoute>
            <EmployList/>
          </OpenRoute>
          
          }></Route>
        <Route path="/editEmploy/:id" element={
           <OpenRoute>
          <CreateEmploy/>
           </OpenRoute>}></Route>
      </Routes>
    </div>
  );
}

export default App;

