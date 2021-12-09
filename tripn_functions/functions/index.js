const functions = require('firebase-functions')
const {
    createCallsWithTokens
} = require('./createCallsWithTokens/createCallsWithTokens.js')
const {
    adminInitApp
} = require('./adminInitApp.js')

adminInitApp()

module.exports = {
    createCallsWithTokens
}