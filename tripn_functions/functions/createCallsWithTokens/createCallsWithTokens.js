const functions = require('firebase-functions')
const admin = require('firebase-admin')
const {
    RtcTokenBuilder,
    RtcRole,
    RtmTokenBuilder
} = require('agora-access-token')

const {
    adminInitApp
} = require('../adminInitApp.js')

const defaultApp = adminInitApp()

const db = admin.firestore()

const createCallsWithTokens = functions.https.onCall(async (data, context) => {
    try{
        const { channelId } = data;
        const appId = 'a7dbe5e4d7574145b90146011fca9599'
        const appCertificate = 'fa3be476a26a4a5893837112d39ac4c5'
        const role = RtcRole.PUBLISHER
        const expirationTimeInSeconds = 3600
        const currentTimestamp = Math.floor(Date.now()/1000)
        const priviledgeExpired = currentTimestamp + expirationTimeInSeconds
        const uid = 0
        //const channelName = Math.floor(Math.random() * 100).toString()

        const token = RtcTokenBuilder.buildTokenWithUid(
            appId,
            appCertificate,
            channelId,
            uid,
            role,
            priviledgeExpired
        )
        return {
            data: {
                token: token,
                channelId: channelId
            }
        }
    }catch(error){
        console.log(error)
    }
})

module.exports = {
    createCallsWithTokens,
}