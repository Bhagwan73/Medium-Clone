import { useEffect, useState } from "react"
import SinglePost from "../Post"


export default function Post(){
    const [posts,setPosts]=useState([])
    const [categorie,setCategorie]=useState("")
    useEffect(()=>{
        const getAllPosts=async function(){
            if(categorie){
            const fetchData=await fetch(`http://localhost:3002/getBlogs?categorie=${categorie}`)
            const data= await fetchData.json()
            console.log(data)
             if(data.status) setPosts(data.data)
            }else{
                const fetchData=await fetch('http://localhost:3002/getBlogs')
                const data= await fetchData.json()
                console.log("----- onepost",data)
                 if(data.status) setPosts(data.data)
            }
        }
        getAllPosts()
    },[categorie])

    const handleQuery=function(event){
        setCategorie(event.target.value)
    }
    return(
        <div className="post-page">
            <div className="all-posts">
                <section className="categories">
                   <button onClick={handleQuery} value={""} className={categorie === "" ? "active" : ""}>For you</button> 
                   <button onClick={handleQuery} value={'social media'} className={categorie === "social media" ? "active" : ""} >Social Media</button>
                   <button onClick={handleQuery} value={'data science'} className={categorie === "data science" ? "active" : ""} >Data Science</button> 
                   <button onClick={handleQuery} value={'software engineering'} className={categorie === "software engineering" ? "active" : ""} >Software Engineering</button>
                   <button onClick={handleQuery} value={'travel'} className={categorie === "travel" ? "active" : ""}>Travel</button>
                   <button onClick={handleQuery} value={'fashion'} className={categorie === "fashion" ? "active" : ""} >Fashion</button>
                   <button onClick={handleQuery} value={'business'} className={categorie === "business" ? "active" : ""} >Business</button>
                </section>
               {/* SHOW SINGLE */}
                <section className="single-post">
                    {
                        posts.map((post,index)=>{
                            return <SinglePost key={index} postData={post}/>
                        })
                    }
                </section>
            </div>
            <div className="topics">
                <h2>Recommanded topis</h2>
                <div>
                <button onClick={handleQuery} value={'electronics'} className={categorie === "electronics" ? "active-btn" : ""}>Electronics</button>
                <button onClick={handleQuery} value={'book reviews'} className={categorie === "book reviews" ? "active-btn" : ""}>Book Reviews</button>
                <button onClick={handleQuery} value={'productivity'} className={categorie === "productivity" ? "active-btn" : ""}>Productivity</button>
                <button onClick={handleQuery} value={'marketing'} className={categorie === "marketing" ? "active-btn" : ""}>Marketing</button>
                <button onClick={handleQuery} value={'programming'}className={categorie === "programming" ? "active-btn" : ""} >Programming</button>
                <button onClick={handleQuery} value={'business'} className={categorie === "business" ? "active-btn" : ""} >Business</button>
                <button onClick={handleQuery} value={'health'} className={categorie === "health" ? "active-btn" : ""} >Health</button>
                <button onClick={handleQuery} value={'fitness'} className={categorie === "fitness" ? "active-btn" : ""} >Fitness</button>
                <button onClick={handleQuery} value={'history'} className={categorie === "history" ? "active-btn" : ""} >History</button>
                </div>
                <h2>Reading list</h2>
                <p>Welcome to our blogging site! Click on any post to read the entire
                     article and enjoy thought-provoking content. </p>
            </div>
        </div>
    )
}