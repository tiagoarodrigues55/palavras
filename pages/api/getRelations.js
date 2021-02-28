const axios = require("axios")
export default async(req, res)=>{
const palavra = removeAcento(req.body.value)
console.log(palavra)
function removeAcento (text)
{       
    text = text.toLowerCase();                                                         
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c');
    return text;                 
}
const url2 = await axios.get(url(palavra)).then(res=>{
// return res.data.slice(res.data.indexOf('<meta name="description"')+34, res.data.indexOf(';">')+1)

return res.data.slice(res.data.indexOf('<li class=" analogico">')+32, res.data.indexOf('title="Palavras Relacionadas"')-2)
}).catch(res=>console.log('erro na url1'))

const words = await axios.get(url2).then(res=>{
	return res.data.slice(res.data.indexOf('<meta name="description"')+(60+palavra.length), res.data.indexOf('<meta property="og:title"')-2)
}).catch(res=>{
	console.log(url2 + 'Erro na url2')
})
if(!words){
	return res.json({value: ['Erro!!']})
}
// const Significado = relações.indexOf('Significado')!==-1 ? relações.slice(relações.indexOf('Significado')+12,( relações.indexOf("Sinônimos") !== -1 ? relações.indexOf("Sinônimos")-2: (relações.indexOf("Expressão") !== -1 ? relações.indexOf("Expressão")-2: relações.length-1))): null
// const Sinônimos = relações.indexOf('Sinônimos')!==-1 ? relações.slice(relações.indexOf('Sinônimos')+10, (relações.indexOf("Expressão") !== -1 ? relações.indexOf("Expressão")-2: (relações.indexOf("Citação") !== -1 ? relações.indexOf("Citação")-2: relações.length-1))):null
// const Expressão = relações.indexOf('Expressão')!==-1 ? relações.slice(relações.indexOf('Expressão')+10, (relações.indexOf("Citação") !== -1 ? relações.indexOf("Citação")-2: relações.length-1)) : null
// const Citação = relações.indexOf('Citação')!==-1 ? relações.slice(relações.indexOf('Citação')+8): null

	// return res.json({value: relações, Significado, Sinônimos, Expressão, Citação})
	// return res.json({value: relações})


let wordsComplete = []
	for(let i of words.split(", ")){
		const url4 = await axios.get(url(removeAcento(i))).then(res=>{
			// return res.data.slice(res.data.indexOf('<meta name="description"')+34, res.data.indexOf(';">')+1)
			
			return res.data.slice(res.data.indexOf('<li class=" analogico">')+32, res.data.indexOf('title="Palavras Relacionadas"')-2)
			}).catch(res=>console.log('erro na url3'))

			const words2 = await axios.get(url4).then(res=>{
				return res.data.slice(res.data.indexOf('<meta name="description"')+(60+i.length), res.data.indexOf('<meta property="og:title"')-2)
			}).catch(res=>{
				console.log(url4 + 'url4')
			})
			
			if(words2.split(", ")[1]){
			wordsComplete.push({
				word: i,
				relations: words2.split(", ")
			})
		}
	}
	wordsComplete.map(w=>{
		if(w.word === palavra){
			wordsComplete.splice(wordsComplete.indexOf(w), 1)
		}
		w.relations.map(w2=>{
			if(words.indexOf(w2)!==-1){
				w.relations.splice(w.relations.indexOf(w2), 1)
			}
		
		})
	})

	const arr = []
	wordsComplete.map(res=>{
		arr.push(res.word.trim())

		res.relations.map(res2=>{
			arr.push(res2.trim())
		})
	})
	const novaArr = [...new Set(arr)];

	novaArr.indexOf(palavra)!==-1?novaArr.splice(novaArr.indexOf(palavra), 1):null
	novaArr.sort().unshift(palavra)
	const nodes = []
	const firstRelation = wordsComplete.map(res=>(res.word))
	novaArr.map(res=>{
		if(res===palavra){
		nodes.push({id:novaArr.indexOf(res.trim())+1, label:res.trim(), font:{size:35, color:'red'}, color:{background: '#D2E5FF'}, shape:'text'})

		}else{
		if(firstRelation.indexOf(res)!==-1){
			nodes.push({id:novaArr.indexOf(res.trim())+1, label:res.trim(), font:{size:25}, shape:'text'})
			
		}
		// else{
		// 	nodes.push({id:novaArr.indexOf(res.trim())+1, label:res.trim(), shape:'text'})
		// }
		}
	})
	const edges = []
	wordsComplete.map(res=>{
		edges.push({from:1, to:novaArr.indexOf(res.word.trim())+1})
		res.relations.map(res2=>{
			
			const index = Math.random()
			nodes.push({id:index, label: res2.trim(), font:{size:16}})
			edges.push({from: novaArr.indexOf(res.word.trim())+1, to: index})
			// novaArr.indexOf(res2.trim())===-1?console.log(res2, res):null
				// edges.indexOf({from: novaArr.indexOf(res2.trim())+1, to:novaArr.indexOf(res.word.trim())+1 })===-1 ? edges.push({from:novaArr.indexOf(res.word.trim())+1, to:novaArr.indexOf(res2.trim())+1}) : null
		
		})
	})

	console.log(nodes)
	console.log(edges)
	// console.log(wordsComplete)
	return res.json({value: {nodes, edges}})
}

function url(palavra){
	return `https://dicionariocriativo.com.br/${palavra}`
}


