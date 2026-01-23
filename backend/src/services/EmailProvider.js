import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_RESET,
        pass: process.env.PASSWORD_RESET
    },
    
});

async function sendEmailUser(to, pass) {
    await transporter.sendMail({
        from: 'Sales Buddy',
        to: to,
        subject: 'Senha temporária - Sales Buddy',
        html: `<p>Sua senha temporária é: 
                    <strong>${pass}</strong>
                </p>
                <p>Por favor, altere sua senha após o login.</p>`
    });
}

export default sendEmailUser;