import type { NextApiRequest, NextApiResponse } from 'next'

//Database
import { db } from '@/database'

//Models
import User from '@/models/User'

//Utils
import bcrypt from 'bcryptjs';
import { jwt, validations } from '@/utils';

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
            return registerUser(req, res)
        default:
            res.status(400).json({ message: 'Endpoint not found' })
    }
}

async function registerUser(req: NextApiRequest, res: NextApiResponse<Data>) {

    //Leyendo del body
    const { name = '', email = '', password = '' } = req.body as { name: string, email: string, password: string }; //Esto es un type assertion 

    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    if (name.length < 3) {
        return res.status(400).json({ message: 'Name must be at least 3 characters' });
    }

    //Validamos el Campo email
    if (!validations.isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email' });
    }

    await db.connectDB();
    //Traemos el usuario si existe
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: 'User already exists' });
    }


    //Tenemos Todos los datos para crear el usuario
    const newUser = new User({
        name,
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password, 10),
        role: 'user'
    });

    try {
        await newUser.save({ validateBeforeSave: true });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating user' });
    }

    const { _id, role } = newUser;

    //Creamos el token
    const token = jwt.signToken(_id!, email);

    return res.status(200).json({
        token, //JWT
        user: {
            name,
            email,
            role,
        }
    }
    )

}
