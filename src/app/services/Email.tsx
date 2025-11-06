// pages/api/send-email.js
import nodemailer from "nodemailer";
type emailVideoInfo = {
  subject: string;
  discrition: string;
  video: File;
};

function SendVideo(data: emailVideoInfo) {
  const transporter = nodemailer.createTransport({
    service: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "colinlanclos@gmail.com",
      pass: "hinj cdlu blbo yrug",
    },
  });

  transporter
    .sendMail({
      to: "colinlanclos@gmail.com",
      subject: data.subject,
      html: "<p>" + data.discrition + "<p>",
      attachments: [
        {
          filename: data.subject,
          path: "../public/imgs/EMergePlayerDevelopment-removebg.png",
        },
      ],
    })
    .then(() => {
      console.log("ig it worked");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      console.log("boom");
    });
}

export default SendVideo;
