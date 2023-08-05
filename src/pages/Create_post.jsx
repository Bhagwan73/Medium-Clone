import { useState } from 'react';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
import {useSelector} from 'react-redux'

export default function CreatePost() {
    const userInfo=useSelector((state)=>state.users)
      const [file,setFile]=useState(null)
      const [title,setTitle]=useState("")
      const [subTitle,setSubTitle]=useState("")
      const [content,setContent]=useState("")
      const [tags,setTags]=useState("")
      const [redirect,setRedirect]=useState(false)
        console.log(userInfo)

      const  handleSubmit=async function(event){
        try{
         event.preventDefault()
         const data=new FormData()
         data.append('title',title)
         data.append('subTitle',subTitle)
         data.append('content',content)
         data.append('blogCover',file[0])
         data.append('authorId',userInfo?._id)
         data.append('tags',tags)
        
         const create=await fetch('http://localhost:3002/write',{
            method:'POST',
            body:data,
            credentials:'include'
         })
         const result=await create.json()
         if(result.status){
            alert(result.message)
            setRedirect(true)
         } else alert(result.message)
         console.log(result)
        }catch(err){
            console.log(err)
            alert('Blog creation failed. Please try again.')
        }
      } 
      if(redirect) return <Navigate to={"/posts"} />
    return (
        <div className='write'>
            <div className="publish">
                <div className='user-profile'>
                    <i className='bx bxs-user-circle'></i> <p>Draft in {userInfo?.first_name+" "+userInfo?.sirname}</p>
                </div>
                <button className='btn' onClick={handleSubmit}>Publish</button>
            </div>
            <div className='create-post-form'>
                <div className="blog-cover">
                    <span><i className='bx bxs-image-add' ></i> Choose Image for Blog</span>
                    <input type="file"  required onChange={e=>setFile(e.target.files)} />
                </div> <br />
                <input type="text" required placeholder='Title' value={title}  onChange={e=>setTitle(e.target.value)} /> <br />
                <input type="text" required placeholder='Subtitle' value={subTitle} onChange={e=>setSubTitle(e.target.value)} /> <br />
                <ReactQuill theme='snow' modules={{
                    toolbar: [
                        [{ 'header': [1, 2, false] }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                        ['link', 'image'],
                        ['clean']
                    ]
                }}  value={content} onChange={setContent} />
                <input type='text'  value={tags} onChange={e=>setTags(e.target.value)} placeholder='Add tags (separated by commas)'/> 
            </div>
        </div>
    )
}