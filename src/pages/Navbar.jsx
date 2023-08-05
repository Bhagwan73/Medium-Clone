import { useEffect } from "react"
import { useDispatch ,useSelector } from 'react-redux'
import { user } from '../redux/slices/userSlices'
import {useLocation} from 'react-router-dom'

export default function Navbar() {
    const userInfo=useSelector((state)=>state.users )
    const location=useLocation()
    const backgoundColor=location.pathname==='/posts' ? '#91A58D' :'transparent'
    const dispatch = useDispatch()
    useEffect(()=>{
        if(!userInfo){
        fetch('http://localhost:3002/profile',{
            method:'GET',
            credentials:'include'
        })
        .then((result)=>{
            result.json().then((data)=>{
                if(data.status) dispatch(user(data.data))
            })
        })
    }
    },[])

    const username=userInfo?.first_name
    return (
        <header style={{background:backgoundColor}}>
            <div className="logo">
                <a href="/home"><img src="./logo.svg" alt="" />  </a>
            </div>
            {!username ?
                <section className="header-buttons">
                    <a href={'/'}>Home</a>
                    <a href={"/about"}>Our story</a>
                    <a href="/write">Write</a>
                    <a href="/sign-in">Sign In</a>
                    <button>Get started</button>
                </section> :
                <section className="header-buttons-2">
                    <a href={'/'}>Home</a>
                    <a href="/write"><i className='bx bxs-edit'></i> Write</a>
                    <img src={userInfo?.profile_pic}
                        alt="user" />
                </section>
            }
        </header>
    )
}