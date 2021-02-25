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
  function handleSubmit(event){
    event.preventDefault()
    console.log(value)
    axios.post("/api/getRelations", {value}).then(res=>{
      setTexts([res.data.Significado, res.data.Sinônimos, res.data.Expressão, res.data.Citação])
      setDisplayTypes([res.data.Significado ? "visible":"unvisible", res.data.Sinônimos ? "visible":"unvisible", res.data.Expressão ? "visible":"unvisible", res.data.Citação ? "visible":"unvisible"])
      setResponse(res.data.value)
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
        {
        
          types.map(type=>(
            <div className="type">
              <strong className={displayTypes[types.indexOf(type)]} onMouseLeave={()=>handleRelationType(type)} onMouseEnter={()=>handleRelationType(type)}>{type}</strong>
      
      <div className={visibleTypes[types.indexOf(type)]}>{texts[types.indexOf(type)]}</div>
      </div>
          ))
        }
  <div className="unvisible">{teste}</div>
      </div>
      <style jsx global>{`
      body{
        background-color: #1E90FF;
      }
      `}</style>
    </Styles>
  )
}

export default Home