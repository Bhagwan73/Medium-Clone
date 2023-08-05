
import "./App.css"
import Home from "./pages/Home"
import Navbar from "./pages/Navbar"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import SignIn from "./pages/Sign_In"
import Login from "./pages/Login"
import CreatePost from "./pages/Create_post"
import Post from "./pages/Posts"

export default function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes >
      <Route exact path="/" element={<Home/>} />
      <Route path="/sign-in" element={<SignIn/>} />
      <Route path="/login"  element={<Login/>}/>
      <Route path="/write" element={<CreatePost/>} />
      <Route path="/posts" element={<Post/>}/>
    </Routes>
    </BrowserRouter>
  )
}