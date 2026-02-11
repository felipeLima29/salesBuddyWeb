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
    const myEmail = process.env.EMAIL_RESET;
    try {
        const info = await transporter.sendMail({
            from: myEmail,
            to: clientEmail,
            subject: 'Comprovante de Venda - Sales Buddy',
            html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2>Comprovante de Venda</h2>
                    <p>Olá,</p>
                    <p>Agradecemos a sua preferência!</p>
                    <p>Conforme solicitado, segue em anexo o comprovante digital da sua compra realizada no Sales Buddy.</p>
                    <hr>
                    <p style="font-size: 12px; color: #777;">Este é um e-mail automático, por favor não responda.</p>
                </div>
            `,
            attachments: [
                {
                    filename: `comprovante_venda.png`,
                    content: file.buffer,
                    contentType: 'image/png'
                }
            ]
        });
        return info;
    } catch (error) {
        throw error;
    }

}
