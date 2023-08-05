import { useState } from "react"
import { Navigate ,Link} from "react-router-dom"


export default function SignIn() {
    const [file, setFile] = useState(null)
    const [name, setName] = useState('')
    const [sirname, setSirname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect,setRedirect]=useState(false)

    const handleSubmit = async function (event) {
        try {
            const data = new FormData()
            event.preventDefault()
            data.append('first_name', name)
            data.append('sirname', sirname)
            data.append('profile_image', file[0])
            data.append('email', email)
            data.append('password', password)
            console.log(data)
            const responce = await fetch('http://localhost:3002/sign_up', {
                method: "POST",
                body: data
            })
            const result = await responce.json()
            console.log(result)
            if(result.status) {
                setRedirect(true)
                alert('Account created successfully! Please login.')
            }
            else alert(result.message)
        } catch (err) {
            console.log(err)
        }
    }
    if(redirect) return <Navigate to={"/login"}/>

    return (
        <div className="sign-in">
            <form onSubmit={handleSubmit}>
                <h1 className="form-heading">Create account</h1>
                <p className="form-title">Create your account. it's free and only takes a minute</p>
                <div className="profile">
                    <i className='bx bx-user-circle'></i>
                    <input type="file" onChange={e => setFile(e.target.files)} required />
                </div>
                <div className="name">
                    <input type="text" placeholder="First name" name="first_name" value={name} onChange={e => setName(e.target.value)} required />
                    <input type="text" placeholder="Sirname" name="sirname" value={sirname} required onChange={e => setSirname(e.target.value)} />
                </div>
                <input type="email" placeholder="Email address" name="email" value={email} required onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" name="password" value={password} required onChange={e => setPassword(e.target.value)} />
                <button className="btn">Create account</button>
                <Link to="/login">Already have an account ?</Link>
            </form>
        </div>
    );
}