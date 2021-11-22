/**
 * SendGrid: platform
 * @sendgrid/mail: npm package installed
 * API KEY: just connecting sendGrid system with our website/app
 */
const sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
    to: 'mac.fira@gmail.com', // where to send the email
    from: 'ariful.islam@digitalcareerinstitute.org', // Official Verified email of your website/company
    subject: 'Email system test by sendgrid',
    html: '<h1>Hi, I can successfully send you a email</h1>'
}
sgMail
.send(msg)
.then(()=>{
    console.log('Email Successfully send!')
})
.catch(err=> console.log(err))
