const admin = require('firebase-admin')
const serviceAccount = require('./trip-n-44337-firebase-adminsdk-tuwpw-6b5509d71a.json')

const adminInitApp = () => {
    let defaultApp

    if(!admin.apps.length){
        defaultApp = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        })
    }else{
        defaultApp = admin.app()
    }

    return defaultApp
}

module.exports = {
    adminInitApp,
}