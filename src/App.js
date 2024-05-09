import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Todo from './components/Todo';
import Login from './components/Login';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element = {<Login />}></Route>
    <Route path='/Todo' element = {<Todo />}></Route>
    </Routes>
    </BrowserRouter>
    
    
    
    
    
    </>
  );
}

export default App;
