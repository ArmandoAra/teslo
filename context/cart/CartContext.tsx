// Este es las properties que tiene este componente
// aqui se van a guardar funciones que van a modificar el estado global de la aplicación, o metodos
// El context nos sirve para crear el Provider y el Consumer

import { createContext } from 'react';

//Interface
import { ICartProduct } from '@/interfaces';

//Como va a lucir el estado de los elementos del carrito
interface ContextProps {
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
    //Methods
    addProductToCart: (product: ICartProduct) => void;
    updateCartQuantity: (product: ICartProduct) => void;
    removeCartProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);