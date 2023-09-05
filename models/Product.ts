import { IProduct } from '@/interfaces';
import mongoose, { Schema, Model } from 'mongoose';


export interface InterfaceProducts extends IProduct { };

const productSchema = new Schema({
    description: { type: String, required: true },
    images: [{ type: String }],
    inStock: { type: Number, required: true },
    price: { type: Number, required: true },

    sizes: [{
        type: String,
        enum: {
            values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            message: '{VALUE} is not a valid zise'
        }
    }],

    slug: { type: String, required: true, unique: true }, //(unique)Crea un indice muy util para que sean mas rapidas las consultas por este campo
    tags: [{ type: String }],
    title: { type: String, required: true },

    type: {
        type: String,
        enum: {
            values: ['shirts', 'pants', 'hoodies', 'hats'],
            message: '{VALUE} is not a valid clothe type'
        }
    },

    gender: {
        type: String,
        enum: {
            values: ['men', 'women', 'kid', 'unisex'],
            mesage: '{VALUE} Wrong Gender',
        },
        default: 'men',
    },

}, {
    timestamps: true //Hace que mongo cree el timestamp
});


//crear un indice, nos va a servir para buscar rapidamente entre dos columnas
productSchema.index({ title: 'text', tags: 'text' });

//Haciendo da creacion del modelo
const ProductModel: Model<InterfaceProducts> = mongoose.models.Product || mongoose.model('Product', productSchema);

export default ProductModel;