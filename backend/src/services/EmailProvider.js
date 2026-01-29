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

export async function sendEmailUser(to, pass) {
    await transporter.sendMail({
        from: 'Sales Buddy',
        to: to,
        subject: 'Senha temporária - Sales Buddy',
        html: `<h2>NÃO COMPARTILHE ISSO COM NINGUÉM.</h2>
                <p>Sua senha temporária é:
                    <strong>${pass}</strong>
                </p>
                <p>Por favor, altere sua senha após o login.</p>`
    });
}

export async function sendReceiptEmail(file, clientEmail) {
    await transporter.sendMail({
        from: 'Sales Buddy <felipe.lima@gfxconsultoria.com>',
        to: clientEmail,
        subject: 'Comprovante de Venda - Sales Buddy',
        html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2>Olá!</h2>
                    <p>Obrigado por comprar conosco.</p>
                    <p>Segue em anexo o comprovante detalhado da sua venda.</p>
                    <br>
                    <p>Atenciosamente,<br>Equipe Sales Buddy</p>
                </div>
            `,
        attachments: [
            {
                filename: 'comprovante-venda.png',
                content: file.buffer,
                contentType: 'image/png'
            }
        ]
    });
}
