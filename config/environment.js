
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname, '../production_log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

const accessLogStream = rfs.createStream('access.log', {
    interval : '1d',
    path : logDirectory
})



const development = {
    name : 'development',
    assets_path : './assets',
    session_key : 'kwality',
    db : 'facebook',
    smtp : {
        service:'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure:false,
        auth: {
            user:'sagarkpr6',
            pass: 'ndlqznlpvigcdxpo'
        }
    },
    google_client_id : "594983700466-saoqqo9dbo1lh8b6sin8hflju1cf79le.apps.googleusercontent.com",
    google_client_secret : "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",
    google_call_back_url : "http://localhost:8000/auth/google/callback",
    jwt_secret : 'social',
    morgan : {
        mode : 'dev',
        options : {stream : accessLogStream}
    }
}

const production = {
    name : 'production',
    assets_path : process.env.ASSETS_PATH,
    session_key : process.env.SESSION_KEY,
    db : process.env.DB,
    smtp : {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure:false,
        auth: {
            user:process.env.USER,
            pass: process.env.PASSWORD
        }
    },
    google_client_id : process.env.GOOGLE_CLIENT_ID,
    google_client_secret : process.env.GOOGLE_CLIENT_SECRET,
    google_call_back_url : "http://localhost:8000/auth/google/callback",
    jwt_secret : process.env.JWT_SECRET,
    morgan: {
        mode : 'combined',
        options : {stream : accessLogStream}
    }
}

//module.exports = eval(process.env.CODIAL_ENV) == undefined ? development : eval(process.env.CODIAL_ENV)

module.exports = development

