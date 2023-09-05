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



export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {


    res.status(400).json({
        message: 'Searching query should not be empty'
    })
}