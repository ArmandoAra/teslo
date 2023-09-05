import type { NextApiRequest, NextApiResponse } from 'next'

//DBCONEXION
import { connectDB, disconnectDB } from '@/database/db'

//Interfaces
import { IProduct } from '@/interfaces'
type Data =
    | { message: string }
    | IProduct
//Model
import { ProductModel } from '@/models'

export default function handlePoductsBySlug(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getProductBySlug(req, res)
        default:
            return res.status(400).json({ message: 'Invalid Request' })
    }
}


const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { slug } = req.query; //Obtener de la url para condicionar el genero que queremos obtener

    //Validar los diferentes valores que puede recibir el objeto, y darle el valor a la condicion que viene por el url,`${gender}` con este formato para que no se queje del tipo


    //Conexion, pedir los datos y desconectarse
    await connectDB();

    const product = await ProductModel.findOne({ slug })// va a buscar dependiendo de la peticion por la url http://localhost:3000/api/products?gender=<condition>
        .select('title images price inStock slug -_id')  //Indicando los campos que queremos y restamos el _id
    await disconnectDB();

    if (product)
        return res.status(200).json(product)

    return res.status(400).json({ message: 'Invalid Item' })
}