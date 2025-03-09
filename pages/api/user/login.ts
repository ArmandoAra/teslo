import type { NextApiRequest, NextApiResponse } from 'next'

//Database
import { db } from '@/database'

//Models
import User from '@/models/User'

//Utils
import bcrypt from 'bcryptjs';
import { jwt } from '@/utils';

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
        case 'POST':
            return loginUser(req, res)
        default:
            res.status(400).json({ message: 'Endpoint not found' })
    }
}

async function loginUser(req: NextApiRequest, res: NextApiResponse<Data>) {

    //Leyendo del body
    const { email = '', password = '' } = req.body;

    await db.connectDB();
    //Traemos el usuario si existe
    const user = await User.findOne({ email });
    await db.disconnectDB();

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' })
    }

    //Si lo anterior es correcto, comparamos las contraseñas.
    if (!bcrypt.compareSync(password, user.password!)) { //Si no coinciden
        return res.status(401).json({ message: 'Invalid email or password' })
    }

    //Si todo es correcto, extraemos nombre y role
    const { name, role, _id } = user;

    //Creamos el token
    const token = jwt.signToken(_id!, email);

    return res.status(200).json(
        {
            token, //JWT
            user: {
                name,
                email,
                role
            }
        }
    )

}
