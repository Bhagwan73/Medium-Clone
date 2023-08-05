
export default function Home(){
    return (
        <section className="home">
         <div className="col1"> 
         <p className="h1">Stay curious.</p>
         <p>Discover stories, thinking, and expertise 
             <br/>from writers on any topic.</p>
         <button onClick={()=>window.location.href='/posts'}>Start reading</button>
         </div>
         <div className="col2">
        <img src="/background.png" alt="" width={'100%'} height={'100%'} />
         </div>  
        </section>
    )
}