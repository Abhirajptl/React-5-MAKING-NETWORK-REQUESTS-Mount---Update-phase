function PostItem ({posts}){
    return (
        <>
        {
            posts.length == 0 ? (<p>No Posts available</p>) : 
            posts.map((ele) => {
                return (
                    <div 
                    style={{
                        border:"1px solid black",
                        margin:"10px",
                        padding:"10px",
                        backgroundColor:"lightcyan",
                        borderRadius:"10px"
                        }}
                    key={ele.id}>
                        <p>Id: {ele.id}</p>
                        <p>Title: {ele.title}</p>
                        <p>Body: {ele.body}</p>
                    </div>
                )
            })
        }
        </>
    )
}

export default PostItem;