import axios from "axios"
import {useState} from "react"
import Styles from '../styles/index'
function Home(){
  const [value, setValue] = useState('')
  const [response, setResponse] = useState('')
  const [teste, setTeste] = useState(0)
  const [visibleTypes, setVisibleTypes] = useState(["unvisible", "unvisible", "unvisible", "unvisible"])
  const [types, setStypes] =  useState(["Significado", "Sinônimos", "Expressão", "Citação"])
  const [texts, setTexts] =  useState(["", "", "", ""])
  const [displayTypes, setDisplayTypes] =  useState(["unvisible", "unvisible", "unvisible", "unvisible"])
  const [words, setWords] = useState({word: '', relations:[]})
  function handleSubmit(event){
    event.preventDefault()
    axios.post("/api/getRelations", {value}).then(  res=>{
   
     console.log(res.data.value)
      setWords(res.data.value)
    })
  }
  function handleInput(event){
    setValue(event.target.value)
  }
  function handleRelationType(type){
    const VisibleTypes = visibleTypes
    VisibleTypes[types.indexOf(type)] === "unvisible" ? VisibleTypes[types.indexOf(type)] = "visible" : VisibleTypes[types.indexOf(type)] = "unvisible"
    setVisibleTypes(VisibleTypes)
    setTeste(teste+1)
    console.log(VisibleTypes)
    // setVisibleTypes(["teste"])
  }
  return(
    <Styles>
      <form onSubmit={handleSubmit}>
        <input onChange={handleInput} type="text"/>


      </form>
      <div className="tiposRelações">
        <div>{JSON.stringify(words)}</div>
      
      
  <div className="unvisible">{teste}</div>
      </div>
      <style jsx global>{`
      body{
        background-color: #1E90FF;
      }
      `}</style>
      {response}
    </Styles>
  )
}

export default Home


