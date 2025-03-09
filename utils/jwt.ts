import { error } from 'console';
import jwt from 'jsonwebtoken';


//funcion para crear el token
export const signToken = (_id: string, email: string) => {

    if (!process.env.JWT_SECRET_SEED) throw new Error('JWT_SECRET not defined');

    //Esto regresa un string
    return jwt.sign(
        //Payload(Información que queremos guardar en el token que no sea sensible)
        { _id, email },
        //Seed
        process.env.JWT_SECRET_SEED,
        //Opciones
        {
            expiresIn: '30d'
        })

};

//Si todo sale bien esta funcion regresa el id del usuario
export const isValidToken = (token: string): Promise<string> => {
    if (!process.env.JWT_SECRET_SEED) throw new Error('JWT_SECRET not defined');

    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
                if (err) reject('Invalid token');
                const { _id } = payload as { _id: string };
                resolve(_id);
            });
        } catch (error) {
            reject('Invalid token');
        }
    });

}