import type { NextApiRequest, NextApiResponse } from 'next'

import { SHOP_CONSTANTS } from '@/database'

//DBCONEXION
import { connectDB, disconnectDB } from '@/database/db'

//Interfaces
import { IProduct } from '@/interfaces'
type Data =
    | { message: string }
    | IProduct[]
//Model
import { ProductModel } from '@/models'

export default function handlePoductsMethods(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getAllProducts(req, res)
        default:
            return res.status(400).json({ message: 'Invalid Request' })
    }
}


const getAllProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {


    const { gender = 'all' } = req.query; //Obtener de la url para condicionar el genero que queremos obtener
    let condition = {};

    //Validar los diferentes valores que puede recibir el objeto, y darle el valor a la condicion que viene por el url,`${gender}` con este formato para que no se queje del tipo
    if (gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`)) {
        condition = { gender };
    }



    //Conexion, pedir los datos y desconectarse
    await connectDB();
    const allProducts = await ProductModel.find(condition) // va a buscar dependiendo de la peticion por la url http://localhost:3000/api/products?gender=<condition>
        .select('title images price inStock slug -_id')  //Indicando los campos que queremos y restamos el _id
        .sort({ created_at: 'ascending' });
    await disconnectDB();


    return res.status(200).json(allProducts)
}