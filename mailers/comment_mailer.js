const nodemailer = require('../config/nodemailer');

exports.newComment = (comments) => {
    nodemailer.transporter.sendMail({
        
        from : 'sagarkpr6@gmail.com',
        to: comments.user.email,
        subject: 'mail sent',
        html: '<h1>first email</h1>'
    }, (err, info) => {
        if(err) { console.log('err in sending email:::', err); return}
        console.log('msg done', info);
    });
}