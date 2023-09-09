//Metodos de conexion
import { connectDB, disconnectDB } from "./db";

//Modelo de DB
import { ProductModel } from "@/models";

//Interface
import { IProduct } from "@/interfaces";


//Recibe el slug de tipo string y Retorna Promesa de tipo IProduct
export const getProductBySlug = async (slug: string): Promise<IProduct | null> => {

    await connectDB();

    const product = await ProductModel.findOne({ slug })//Indicando los campos que queremos y restamos el _id
        .lean()
    await disconnectDB();

    if (!product)
        return null


    //Forzamos que el objeto sea serializado como un string    
    return JSON.parse(JSON.stringify(product));
}

interface ProductSlug {
    slug: string;
}

//Estos slugs van a ser los parametros que necesitamos para obtener los productos por esa categoria para que sea generado de manera estatica
export const getAllProductsSlugs = async (): Promise<ProductSlug[]> => {

    await connectDB();
    const slugs = await ProductModel.find()
        .select('slug -_id')
        .lean()
    await disconnectDB();

    return slugs;
}

//Creamos una funcion que nos permita buscar todos los productos por el termino de busqueda
export const getProductsbyTerm = async (term: string): Promise<IProduct[]> => {
    term = term.toLowerCase();

    await connectDB();
    const products = await ProductModel.find({
        $text: { $search: term }
    })
        .select('title inStock slug price images -_id')
        .lean();

    await disconnectDB();


    // return JSON.parse(JSON.stringify(products));
    return products;

}

export const getAllProducts = async (): Promise<IProduct[]> => {

    await connectDB();
    const products = await ProductModel.find()
        .select('title inStock slug price images -_id')
        .lean();
    await disconnectDB();

    return products;

}