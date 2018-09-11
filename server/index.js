'use strict'
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const cfenv = require('cfenv')
var server = require('http').createServer(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const HOST = '0.0.0.0';


//app.use(express.static(path.join(__dirname, '..', 'public')))

app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/app', function (req, res) {
    console.log("INFO", "GET /")

	res.header("Cache-Control", "no-cache, no-store, must-revalidate")
	res.header("Pragma", "no-cache")
	res.header("Expires", 0)

	res.sendFile(path.join(__dirname, "../public/index.html"))
})


var port = process.env.PORT || '8080'

server.listen(port, HOST,  function() {
	console.log("INFO","Node server running on " + HOST +":"+port)
})
