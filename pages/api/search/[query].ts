import type { NextApiRequest, NextApiResponse } from 'next'

//DBCONEXION
import { connectDB, disconnectDB } from '@/database/db'

//Interfaces
import { IProduct } from '@/interfaces'
type Data =
    | { message: string }
    | IProduct[]
//Model
import { ProductModel } from '@/models'

export default function handleSearch(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return searchProducts(req, res)
        default:
            return res.status(400).json({ message: 'Invalid Request' })
    }
}


const searchProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    let { query = '' } = req.query; //Obtener de la url el nombre debe ser el mismo que el archivo [query].ts

    query = query.toString().toLowerCase();

    if (query.length === 0) {
        return res.status(400).json({ message: 'Searching query should not be empty' })
    }


    //Conexion, pedir los datos y desconectarse
    await connectDB();
    const products = await ProductModel.find({
        $text: { $search: query }
    })

    await disconnectDB();

    return res.status(200).json(products)
}