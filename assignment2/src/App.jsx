import { useState , useEffect} from 'react'
import PostItem from './components/PostItem'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(false)
  const [page, setPages] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  async function getData(url){
    try {
      let res = await fetch(url)
      let data = await res.json();
      let totalCount = +res.headers.get("X-Total-Count")
      let totalPages = Math.ceil(totalCount/10)
      return {
        data:data,
        totalPages:totalPages
      };
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData(page){
    setIsLoading(true)
    try {
      let {data, totalPages} = await getData(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`)
      setPosts(data)
      console.log(posts);
      setIsLoading(false)
      setTotalPages(totalPages)
      console.log(totalPages);
    } catch (error) {
      console.log(error);
      setError(true)
      setIsLoading(false)
    }
  }

  useEffect(function(){
    fetchData(page)
  },[page])
  

  if(isLoading){
    return <p style={{textAlign:"center",marginTop:"50px"}}>Loading...</p>
  }
  if(error){
    return <p style={{textAlign:"center",marginTop:"50px"}}>Error due to some problem</p>
  }

  return (
    <>
    <button onClick={()=>setPages(page-1)} disabled = {page == 1}>Prev</button>
    {new Array(totalPages).fill(0).map(function(_,idx){
          return (
            <button key={idx} onClick={() => setPages(idx +1)}>{idx + 1}</button>
          )
        })
      }
    <button onClick={()=>setPages(page+1)} disabled = {page == totalPages}>Next</button>
      <PostItem posts={posts}/>

    
      
    </>
  )
}

export default App
