const { generateHash } = require('../util/generate-hash')
const { ValidateRequestBody } = require('../models/shorten-url')

class shortenUrl {
	constructor(){
		this.urlMap = new Map()
	}

	setUrl(shortenedUrl,urlBody){
		this.urlMap.set(shortenedUrl,urlBody)
	}

	getUrl(shortenedUrl){
		return this.urlMap.get(shortenedUrl) 
	}

	isCollision(hash){
		return this.urlMap.has(hash)
	}

	getAllUrls(){
		let mappedUrls = [];
		this.urlMap.forEach((urlBody,shortenedUrl)=> mappedUrls.push({id:shortenedUrl,...urlBody}))
		return mappedUrls;
	}
}


let shortUrlObj = new shortenUrl()

module.exports.setUrl = function(req,res){
	try {
		const requestBody = req.body;
		const isValid = ValidateRequestBody(requestBody);
		
		if(!isValid){
			res.json({
				message:'Error',
				error:'Invalid body'
			})
		}

		do {
			var hash = generateHash();
		}while(shortUrlObj.isCollision(hash));
		
		shortUrlObj.setUrl(hash,requestBody);
		res.status(200).json({
			message:'Success',
			data:{
				id:hash
			}
		})
	}catch(error){
		res.json({
			message:'Error',
			error:error.message
		})
	}
}


module.exports.getUrl  = function(req,res){
	const shortenedUrlId = req.params.id;
	if(shortUrlObj.getUrl(shortenedUrlId)){
		const urlValues = shortUrlObj.getUrl(shortenedUrlId)
		res.json({
			message:'Success',
			data:{
				id:shortenedUrlId,
				...urlValues
			}
		})
	}else {
		res.json({
			message:'Error',
			error:'Invalid Id'
		})
	}
}


module.exports.getAllUrls = function(req,res){
	let allUrlArrays = shortUrlObj.getAllUrls();
	if(allUrlArrays.length >0){
		res.json({
			message:'Success',
			data:allUrlArrays
		})
	}else {
		res.json({
			message:'Error',
			error:'Empty Store'
		})
	}

}