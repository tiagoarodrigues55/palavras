const axios = require("axios")

export default async(req, res)=>{
const palavra = req.body.value
const relações = await axios.get(url(palavra)).then(res=>{
return res.data.slice(res.data.indexOf('<meta name="description"')+34, res.data.indexOf(';">')+1)
})
const Significado = relações.indexOf('Significado')!==-1 ? relações.slice(relações.indexOf('Significado')+12,( relações.indexOf("Sinônimos") !== -1 ? relações.indexOf("Sinônimos")-2: (relações.indexOf("Expressão") !== -1 ? relações.indexOf("Expressão")-2: relações.length-1))): null
const Sinônimos = relações.indexOf('Sinônimos')!==-1 ? relações.slice(relações.indexOf('Sinônimos')+10, (relações.indexOf("Expressão") !== -1 ? relações.indexOf("Expressão")-2: (relações.indexOf("Citação") !== -1 ? relações.indexOf("Citação")-2: relações.length-1))):null
const Expressão = relações.indexOf('Expressão')!==-1 ? relações.slice(relações.indexOf('Expressão')+10, (relações.indexOf("Citação") !== -1 ? relações.indexOf("Citação")-2: relações.length-1)) : null
const Citação = relações.indexOf('Citação')!==-1 ? relações.slice(relações.indexOf('Citação')+8): null

	return res.json({value: relações, Significado, Sinônimos, Expressão, Citação})
}

function url(palavra){
	return `https://dicionariocriativo.com.br/${palavra}`
}

