



const development = {
    name : process.env.NAME,
    assets_path : process.env.ASSETS_PATH,
    session_key : process.env.KEY,
    db : process.env.DB,
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
    google_client_id : process.env.GOOGLE_CLIENT_ID,
    google_client_secret : process.env.GOOGLE_CLIENT_SECRET,
    google_call_back_url : "http://localhost:8000/auth/google/callback",
    jwt_secret : process.env.JWT_KEY,
    morgan : {
        moode : 'dev',
        options : {stream : accessLogStream}
    }
}

const production = {
    name : process.env.NAME,
    assets_path : process.env.ASSETS_PATH,
    session_key : process.env.KEY,
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
    morgan : {
        moode : 'combined',
        options : {stream : accessLogStream}
    }
}

module.exports = eval(process.env.CODIAL_ENV) == undefined ? development : eval(process.env.CODIAL_ENV)

//module.exports = development

