import axios from "axios"
import {useState} from "react"

function Home(){
  const [value, setValue] = useState('')
  const [response, setResponse] = useState('')
  function handleSubmit(event){
    event.preventDefault()
    console.log(value)
    axios.post("/api/getRelations", {value}).then(res=>{
      setResponse(res.data.value)
    })
  }
  function handleInput(event){
    setValue(event.target.value)
  }
  return(
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleInput} type="text"/>


      </form>

      {response}
    </div>
  )
}

export default Home