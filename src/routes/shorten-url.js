const express = require('express');
const Router = express.Router();
const { generateShortenedUrl, returnOriginalUrl, getAllShortenedUrls } = require('../controllers/shorten-url')

Router.post('/shorten',generateShortenedUrl)

Router.get('/all-urls',getAllShortenedUrls)

Router.get('/:id',returnOriginalUrl)

module.exports = Router