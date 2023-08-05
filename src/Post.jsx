
export default function SinglePost({ postData }) {
    const { title, subTitle, blogCover, authorId, tags } = postData
    return (
       <div className="blog">
            <div className="post-list">
                <div className="post-container">
                    <h2>{title}</h2>
                    <p>{subTitle}</p>
                </div>
                <img src={blogCover} height={'120px'} width={'120px'} alt="image" />
            </div>
            <span>{"from " + authorId?.first_name + " " + authorId?.sirname}, &ensp;<b>{`${tags}`}</b></span>
        </div>
    )

}