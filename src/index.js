const express = require("express");
const nodemailer = require("nodemailer");
const axios = require("axios");
const qs = require("qs");
const bodyParser = require("body-parser");

const hbs = require("nodemailer-express-handlebars");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const createMail = (email, type) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "u.doxp34@gmail.com",
      pass: "omnixp34",
    },
  });

  transporter.use(
    "compile",
    hbs({
      viewEngine: {
        extName: ".handlebars",
        partialsDir: "./src/views/",
        layoutsDir: "./src/views/",
        defaultLayout: undefined,
      },
      viewPath: "./src/views/",
      extName: ".handlebars",
    })
  );

  let mailOptions = {};

  /*
    se o tipo da for 1, envia o conteudo do primeiro form. se for 2, envia o do segundo form.
  */

  if (type == 1) {
    mailOptions = {
      from: "u.doxp34@gmail.com",
      to: email,
      subject: "🌟 Brilha, brilha estrelinha!",
      text: "🌟 Brilha, brilha estrelinha!",
      template: "firstEmail",
    };
  } else {
    mailOptions = {
      from: "u.doxp34@gmail.com",
      to: email,
      subject: "🎁 Seu mimo chegou!",
      text: "🎁 Seu mimo chegou!",
      template: "secondEmail",
    };
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

app.post("/", (req, res) => {
  const { email, type, name } = req.body;

  console.log(email, name);

  axios({
    method: "post",
    url: "https://smtl.gama.academy/leads/bfef0a20-b7e1-11ea-8228-89cff86db9a0",
    data: qs.stringify({
      name,
      email,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });

  createMail(email, type);

  return res.status(200).json({ success: "ok" });
});

app.listen(3000, (req, res) => {
  console.log("is running boy");
});
