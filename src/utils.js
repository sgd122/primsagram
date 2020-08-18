import dotenv from "dotenv";
import path from "path"
dotenv.config({ path: path.resolve(__dirname, ".env") });
import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";
import sgTransport from "nodemailer-sendgrid-transport";

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
}

console.log("::process.env.SENDGRID_API_KEY::", process.env.SENDGRID_API_KEY)
const sendMail = (email) => {
    const options = {
        auth: {
            user: process.env.SENDGRID_USERNAME,
            pass: process.env.SENDGRID_PASSWORD
        }
    }
    // const client = nodemailer.createTransport(sgTransport(options));
    // return client.sendMail(email);


    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    return sgMail.send(email);
};

export const sendSecretMail = (address, secret) => {
    const email = {
        from: "sgd0947@gmail.com",
        // from: "sgd@prismagram.com",
        to: address,
        subject: "🔓Login Secret for Prismagram🔓",
        text: 'and easy to do anywhere, even with Node.js',
        html: `Hello! Your login secret it ${secret}.<br/>로그인 하기 위해 앱/웹사이트에 복사해서 뭍여넣어주세요.`
    };
    return sendMail(email);
}