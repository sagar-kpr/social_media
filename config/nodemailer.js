const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('./environment');

let transporter = nodemailer.createTransport(env.smtp);


let ejsTemplate = (data, relativePath) => {
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
            if(err) { console.log('err in ejs render file in ejstemplate', err); return}

            mailHtml = template;
        }
    )
    return mailHtml;
}

module.exports = {
    transporter : transporter,
    renderTemplate: ejsTemplate
}
