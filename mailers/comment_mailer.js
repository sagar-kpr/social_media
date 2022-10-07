const nodemailer = require('../config/nodemailer');

exports.newComment = (comments) => {
    htmlString = nodemailer.renderTemplate({comment: comments}, '/comment/new_comment.ejs');
    nodemailer.transporter.sendMail({
        from : 'sagarkpr6@gmail.com',
        to: comments.user.email,
        subject: 'mail sent',
        html: htmlString
    }, (err, info) => {
        if(err) { console.log('err in sending email:::', err); return}
        console.log('msg done', info);
    });
}