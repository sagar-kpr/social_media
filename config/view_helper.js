const env = require('./environment');
const fs = require('fs')
const path = require('path');

module.exports = (app) => {
    app.locals.assetsPath = function(filePath){
        if(env.name == ' development'){
        
            return filePath
        }
        console.log('file', filePath)
        return '/'+JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/rev-manifest.json')))[filePath]
    }
}