import jwt from 'jsonwebtoken';
import { promisify } from 'util';

export default async function middleware (req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token não existe" });
    }
    const [, token] = authHeader.split(' ');

    try {
        const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
        req.userId = decode.id;
        return next();
    } catch (error) {
        return res.status(401).json({ error: "Token inválido" });
    }
}