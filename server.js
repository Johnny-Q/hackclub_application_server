const express = require('express');
const parser = require('body-parser');
const nodemailer = require("nodemailer");

const app = express();
app.use(parser.urlencoded({extended: true}));

const t = nodemailer.createTransport({
    "service":"gmail",
    "auth":{
        "user": process.env.send_mail,
        "pass": process.env.send_pass
    }
});

app.post('/', (req, res) => {
    console.log(req.body, req.body.name);
    if(req.body){
        var email = {
            "from": process.env.send_mail,
            "to": process.env.recv_mail,
            "subject":"Hackclub Application",
            "text": `${req.body.name}\n${req.body.stdnum}\n${req.body.response}`
        }
        t.sendMail(email, function(error, info){
            if(error){
                console.log(error);
                res.sendStatus(300);
            }else{
                res.sendStatus(200);
            }
        });
    }

});

app.listen(process.env.port || 8080);