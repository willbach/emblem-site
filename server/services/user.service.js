// handles all the logic between the controller and the repository
//

/*
Written by Andy Cuddeback for EmblemEDU
Github: acuddeback
Updated 07/23/18
Property of EmblemEDU
*/

const userRepository = require('../repositories/user.repository')
const transcriptRepository = require('../repositories/transcript.repository')

const keccak256 = require('js-sha3').keccak256;
const authUtils = require('../utils/auth.util')
const UserDTO = require('../dto/user.dto')


//just in case we need it later
const schoolRepository = require('../repositories/school.repository')

const userService = {}

/////////////////////////////////////////////////////
// CODE FOR USER ACCOUNT INFO STARTS HERE //////////
///////////////////////////////////////////////////

//get user
userService.getUser = id => {
    return userRepository.getUser(id).then( user => new UserDTO(user) )
}

//create user
userService.storeUser = userInfo => {
    if(userInfo.accountType === 'guidance') {
        if(userInfo.code === null) {
            throw new Error('Guidance counselor code not valid')
        }
        return userRepository.storeUser(userInfo).then( id => authUtils.generateToken(id) )

    } else if(userInfo.accountType === 'student') {
        return userRepository.storeUser(userInfo).then( id => authUtils.generateToken(id) )

    } else {
        throw new Error('userType must be "student" or "guidance"')
    }
}

//update user
userService.updateUser = userInfo => {
    return userRepository.updateUser(userInfo)
}

//delete user
userService.deleteUser = id => {
    return userRepository.deleteUser(id)
}

//login user
userService.loginUser = userInfo => {
    return userRepository.loginUser(userInfo)
    .then( id => {
        return authUtils.generateToken(id)
    })
}

////////////////////////////////////////////////////
// CODE FOR USER ACCOUNT INFO ENDS HERE ///////////
//////////////////////////////////////////////////

///////////////////////////////////////////////
// CODE FOR HASH INFO STARTS HERE ////////////
/////////////////////////////////////////////

/*
In this document, 'hash' refers to thw whole hash JS object whereas 'pdfContent' refers to the hash itself. 

Example: 

const guidance1 ={
    pdfContent: 'cbe3d16cc9f5cef09648e350a1abfbd4a3fb02b7a7f1cd6c02c23b5ee9857e58',
    username: 'euler@python.com'
    studentUsername: 'student@emblemEDU.com'

}
*/


//get transcript
userService.getTranscript = (pdfContent) => {
    return transcriptRepository.getTranscript(pdfContent)
}

//create transcript
userService.storeTranscript = (transcriptInfo) => {
    console.log('CLIENT INPUT: ', transcriptInfo)
    //get hashValue from transcriptInfo and hash it, then resave it here
    console.log('OLD hashVALUE HERE: ', transcriptInfo.hashValue)
    transcriptInfo.hashValue = keccak256(transcriptInfo.hashValue)
    console.log('NEW hashVALUE HERE: ', transcriptInfo.hashValue)
    return transcriptRepository.storeTranscript(transcriptInfo)
}

//update transcript
userService.updateTranscript = (transcriptInfo) => {
    return transcriptRepository.updateTranscript(transcriptInfo)
}    
//delete transcript
userService.deleteTranscript = (pdfContent) => {
    return transcriptRepository.deleteTranscript(pdfContent)
}



// userService.getTranscriptByUsername = (username) => {
//     return transcriptRepository.getTranscriptByUsername(username)
// }

///////////////////////////////////////////////
// CODE FOR transcript INFO ENDS HERE //////////////
/////////////////////////////////////////////

module.exports = userService

