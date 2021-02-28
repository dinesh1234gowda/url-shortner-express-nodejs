const { generateHash } = require('../util/generate-hash')
const { ValidateRequestBody } = require('../models/shorten-url')

/*
Class to perform fundamental operation; SET and GET.
To Store the data in JS Map Datastructure
*/
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

	isCollision(shortenedUrl){
		return this.urlMap.has(shortenedUrl)
	}

	getAllUrls(){
		let mappedUrls = [];
		this.urlMap.forEach((urlBody,shortenedUrl)=> mappedUrls.push({id:shortenedUrl,...urlBody}))
		return mappedUrls;
	}
}

let shortUrlObj = new shortenUrl()

/*

*/
module.exports.generateShortenedUrl = function(req,res){
	try {
		const requestBody = req.body;
		const isValidBody = ValidateRequestBody(requestBody);
		
		if(!isValidBody){
			return res.json({
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

// returns the original url details from shortened url id
module.exports.returnOriginalUrl  = function(req,res){
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

//returns all the shortened urls from Map datastructure
module.exports.getAllShortenedUrls = function(req,res){
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