
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import{BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Singup';
import Navbar from './componants/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import YourBlog from './pages/YourBlog';
import { useContext } from 'react';
import UserContext from './context/UserContext';
import Singup from './pages/Singup';
import ForgetPassword from './pages/ForgetPassword';
import Profile from './pages/Profile';


function App() {
  let ctx=useContext(UserContext)
  console.log(ctx)
  let login=ctx.details.login
  console.log(login)
  return (
    <div className="App">

      <BrowserRouter>
      <Navbar/>
      <Routes>

      {<Route path='/' element = {login===true?<Home/> :<Navigate to={'/login'}/>}/>}
            <Route path='/login' element = {login===false ?<Login/>:<Navigate to={'/'}/>}/>
            <Route path='/signup' element = {<Singup/>}/>
            <Route path='/yourBlog' element = {login===true? <YourBlog/>: <Navigate to="/login"/> }/>
            <Route path='/forgetPassword' element={<ForgetPassword/>}/>
            <Route path='/user/profile' element={<Profile/>}/>

      </Routes>
      
      <ToastContainer/>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
