import dotenv from "dotenv";
import path from "path"
dotenv.config({ path: path.resolve(__dirname, ".env") });
import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
}

const sendMail = (email) => {
    const options = {
        auth: {
            user: process.env.SENDGRID_USERNAME,
            pass: process.env.SENDGRID_PASSWORD
        }
    }
    const client = nodemailer.createTransport(sgTransport(options));
    return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
    const email = {
        from: "sgd@prismagram.com",
        to: address,
        subject: "🔓Login Secret for Prismagram🔓",
        html: `Hello! Your login secret it ${secret}.<br/>로그인 하기 위해 앱/웹사이트에 복사해서 뭍여넣어주세요.`
    };
    return sendMail(email);
}