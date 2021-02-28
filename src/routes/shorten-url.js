const express = require('express');
const Router = express.Router();
const { setUrl, getUrl, getAllUrls} = require('../controllers/shorten-url')

Router.post('/shorten',setUrl)

Router.get('/all-urls',getAllUrls)

Router.get('/:id',getUrl)

module.exports = Router