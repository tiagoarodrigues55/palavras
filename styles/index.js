import styled from 'styled-components'

export default styled.div`
display: flex;
flex-direction:column;
align-items: center;
padding:20px;
justify-content: center;
/* background-color: #1E90FF; */
input{
  width:100%;
  padding:5px;
  margin-top: 3px;
  border-radius:5px;

}
div.visible{
  background-color:blue;
  border-radius:5px;
  padding:20px;

}
.unvisible{
display: none
}
div.tiposRelações{
  display: flex;
  flex-direction:row;
  padding:30px
}
div.type{
padding:10px;
.title{

}
  strong{
    font-size:22px;
margin:100px;

  }
}
`