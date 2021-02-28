const Joi = require('joi');
//Schema of /shorten route request body 
const Schema = Joi.object({
	url:Joi.string().pattern(new RegExp(/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/)).required(),
	description:Joi.string().required()
})

/*
Validating request body received for /shorten POST route 
*/
module.exports.ValidateRequestBody = function(body){
	let isValid = true;
	const SchemaValidate = Schema.validate(body)
	if(SchemaValidate && SchemaValidate.error){
		isValid = false
	}
	return isValid
}
