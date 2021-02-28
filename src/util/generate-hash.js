const crypto = require('crypto');
const config = require(`../../config/${process.env.NODE_ENV?process.env.NODE_ENV:'production'}.js`)

//function to generate random string
module.exports.generateHash = function(){
	return crypto.randomBytes(config.shorten_url_length).toString('base64').replace(/\+/g, '0').replace(/\//g, '0').slice(0,config.shorten_url_length)
} 