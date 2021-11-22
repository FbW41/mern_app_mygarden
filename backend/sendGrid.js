const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRIDAPI);
const msg = {
  to: "alaani.hiba@gmail.com",
  from: "hiba.al-aani@digitalcareerinstitute.org",
  subject: "sending your authentication",
  text: "you are welcome in our company",
  //   html: "<h1>hello there</h1>",
};

sgMail
  .send(msg)
  .then(() => {
    console.log("your email is successfully sent");
  })
  .catch((error) => console.log(error));
