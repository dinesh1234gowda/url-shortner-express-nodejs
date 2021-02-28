const express = require('express');
const bodyParder = require('body-parser');
const config = require(`./config/${process.env.NODE_ENV?process.env.NODE_ENV:'production'}.js`)
const app = express();
const crypto = require('crypto')
const shortenUrlRoutes = require('./src/routes/shorten-url')

app.use(bodyParder.json());
app.use(bodyParder.urlencoded({extended: false}))

//adding shortening url routes
app.use(shortenUrlRoutes)

// app.post('/',(req,res)=>{
// 	return res.json({
// 		message:"Hello world"
// 	})
// })

//catching 404 errors
app.use(function(req,res,next){
	res.status(404).json({
		message:"Error",
		error:'Page Not Found'
	})
})

app.listen(config.PORT,()=>{
	console.log(`Server running on PORT ${config.PORT}`)
})

module.exports = app