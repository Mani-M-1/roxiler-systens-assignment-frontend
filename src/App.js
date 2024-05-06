import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import CreateTask from './components/CreateTask';
import UpdateTask from './components/UpdateTask';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/create-task' element={<CreateTask/>}/>
          <Route path='/update-task/:id' element={<UpdateTask/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
