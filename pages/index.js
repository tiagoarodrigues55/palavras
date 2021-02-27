import axios from "axios"
import {useState} from "react"
import Styles from '../styles/index'
import Vis from '../Components'
import ReactLoading from 'react-loading';
 
function Home(){
  const [value, setValue] = useState('')

  const [words, setWords] = useState({nodes: [], edges: [], status: null})

  function handleSubmit(event){
    event.preventDefault()
    setWords({nodes: [], edges: [], status:'loading'})
    axios.post("/api/getRelations", {value}).then(  res=>{
   
     const {nodes, edges} = res.data.value
     const Words = {nodes, edges, status: "run"}
      setWords(Words)
    })
  }
  function handleInput(event){
    setValue(event.target.value)
  }

  return(
    <Styles>
      <form onSubmit={handleSubmit}>
        <input onChange={handleInput} type="text"/>


      </form>
      
      

      <style jsx global>{`
      body{
        background-color: #1E90FF;
      }
      `}</style>
      {!words.status?null:(words.status==='loading'?<ReactLoading  />:<Vis Nodes={words.nodes} Edges={words.edges}/>)}
    </Styles>
  )
}

export default Home


