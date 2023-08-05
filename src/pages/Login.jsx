import { useState } from "react"
import {Navigate , Link} from 'react-router-dom'
import {useDispatch}  from 'react-redux' 
import {user} from '../redux/slices/userSlices'

export default function Login(){
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [redirect,setRedirect]=useState(false)
    const dispatch=useDispatch()

    const handleSubmit=async function(event){
        try{
        event.preventDefault()
        const data={
            email,
            password
        }
        const responce=await fetch('http://localhost:3002/login',{
            method:'POST',
            body:JSON.stringify(data),
            credentials:'include',
            headers:{'Content-Type':'application/json'}
        })
        const result=await responce.json()
        console.log(result)
        if(result.status) {
            alert(result.message)
            dispatch(user(result.data))
            setRedirect(true)
        }else alert('Login failed. Please check your credentials and try again.')
    }catch(err){
        console.error('Error:', err.message);
        alert('An error occurred: ' + err.message);
    }
    }
    if(redirect) return <Navigate to={"/posts"}/>

    return(
        <div className="login">
            <form onSubmit={handleSubmit}>
                <h1 className="form-heading">Welcome Back</h1>
                <p className="form-title">To keep connected with us please login with your personal info</p>
                <input type="email" placeholder="Enter your email" value={email}  onChange={e=>setEmail(e.target.value)} required />
                <input type="password" placeholder="Enter your password" value={password} onChange={e=>setPassword(e.target.value)} required/>
                <button className="btn">Login</button>
                <Link to="/sign-in">Dont have an account ?</Link>
            </form>
        </div>
    )
}