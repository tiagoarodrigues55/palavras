const axios = require("axios")

export default async(req, res)=>{
const palavra = req.body.value
const relações = await axios.get(url(palavra)).then(res=>{
return res.data.slice(res.data.indexOf('<meta name="description"')+34, res.data.indexOf(';">')+1)
})
	return res.json({value: relações})
}

function url(palavra){
	return `https://dicionariocriativo.com.br/${palavra}`
}

