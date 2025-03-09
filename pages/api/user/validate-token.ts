import type { NextApiRequest, NextApiResponse } from 'next'

//Database
import { db } from '@/database'

//Models
import User from '@/models/User'

//Utils
import { jwt } from '@/utils';
import { UserModel } from '@/models';

type Data =
    | { message: string }
    | {
        token: string,
        user: {
            name: string,
            email: string,
            role: string
        }
    }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return checkJWT(req, res)
        default:
            res.status(400).json({ message: 'Endpoint not found' })
    }
}

async function checkJWT(req: NextApiRequest, res: NextApiResponse<Data>) {

    //Leyendo de las cookies
    const { token = '' } = req.cookies;

    //Revisamos si el token es Permitido

    let userID = '';

    try {
        userID = await jwt.isValidToken(token);
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }

    await db.connectDB();
    const user = await UserModel.findById(userID);
    await db.disconnectDB();

    if (!user) return res.status(404).json({ message: 'User not found' });

    const { name, email, role, _id } = user;

    return res.status(200).json({
        token: jwt.signToken(_id, email),
        user: {
            name,
            email,
            role
        }
    });

}

