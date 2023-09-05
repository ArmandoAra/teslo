import { db, initialData } from '@/database'
import { ProductModel } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    if (process.env.NODE_ENV === 'production') {
        res.status(401).json({ message: 'You have not access to this service' })
    }

    await db.connectDB()
    // En este espacio podemos hacer las operaciones que queramos
    await ProductModel.deleteMany({})
    await ProductModel.insertMany(initialData.products)

    await db.disconnectDB()

    res.status(200).json({ message: 'The proccess was made correctly' })
}