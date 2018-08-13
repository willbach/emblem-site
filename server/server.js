// defines all your routes, is called server.js beacuse it's the top level file
// server.js is kind of a misnomer because all of this is the server
// is called server.js because ti's the top level file

const PORT = 4000
const express = require('express')
const app = express()


// const moment = require('moment')
const path = require('path')
const bodyParser = require('body-parser')

//this says if you receive json automatically convert to javascript object
// takes weird json file in request and makes it into req.body
//`app.use` says use this library, 
app.use(bodyParser.urlencoded({ extended: true }), bodyParser.json())
app.use(express.static(path.join(__dirname, '../vue-app/dist')))

//controllers
const userController = require('./controllers/user.controller')
const schoolController = require('./controllers/school.controller')

//routes

//generic accounts
app.get('/user', userController.getUser)
app.post('/user', userController.storeUser)
app.put('/user', userController.updateUser)
app.delete('/user', userController.deleteUser)

//authentication
app.post('/user/login', userController.loginUser)

//transcript
app.get('/transcript/:accountType', userController.getTranscript) // students get their transcript, guidance get all transcripts for the school
app.post('/transcript', userController.storeTranscript)
app.delete('/transcript', userController.deleteTranscript)

//school
app.get('/school/:schoolID', schoolController.getSchool) //gets school data (name and address) from schoolID
app.get('/school/query/zip/:zip', schoolController.getSchool) 
app.post('/school', schoolController.storeSchool) // sets school data (name and address)
app.put('/school/:schoolID', schoolController.updateSchool) //updates school data (name and address) by schoolID
app.delete('/school/:schoolID', schoolController.deleteSchool) //deletes school data (name and address) by schoolID


//error handling
app.use((req, res, next) => res.status(404).send("Resource Not Found"))

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Server Error')
})

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))

module.exports = app