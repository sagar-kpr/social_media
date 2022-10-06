const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');


let transporter = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure:false,
    auth: {
        user:'sagarkpr6',
        pass: 'ndlqznlpvigcdxpo'
    },
});


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
