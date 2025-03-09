// El provider ayuda a que los componentes hijos puedan acceder a los datos del contexto, 
// es decir, a los datos que se encuentran en el estado global de la aplicación.
// Va a guardar valores booleanos, strings, objetos, etc.

import { FC, useEffect, useReducer } from 'react';
import { CartContext, cartReducer } from './';

import Cookies from 'js-cookie';

//Interface
import { ICartProduct } from '@/interfaces';
import { OrderSummary } from '../../components/cart/OrderSummary';

interface CartProviderProps {
    children: React.ReactNode;
}

export interface CartState {
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
}

const CART_INITIAL_STATE: CartState = {
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
}

export const CartProvider = ({ children }: CartProviderProps) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    //usamos el useEffect para obtener los datos del carrito en las cookies
    useEffect(() => {
        //por si no logra parsear la cookie
        try {
            const cookieProducts = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')!) : []
            dispatch({ type: 'LOAD-CART-FROM-LOCALSTORAGE-COOKIES', payload: cookieProducts })
        } catch (error) {
            dispatch({ type: 'LOAD-CART-FROM-LOCALSTORAGE-COOKIES', payload: [] })
        }

    }, [])



    //usamos el useEffect par cada vez que se actualice el estado del carrito, se manden los datos a las cookies
    useEffect(() => {
        Cookies.set('cart', JSON.stringify(state.cart))
    }, [state.cart])

    //Efecto para actualizar el carrito en la base de datos
    useEffect(() => {
        const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0)
        const subTotal = state.cart.reduce((prev, current) => current.quantity * current.price + prev, 0)
        const taxRate = Number(process.env.NEXT_PUBLIC_TAXRATE || 0);

        const orderSummary = {
            numberOfItems,
            subTotal,
            tax: subTotal * taxRate,
            total: subTotal + (subTotal * taxRate)
        }

        dispatch({ type: 'UPDATE-ORDER-CART-SUMARY', payload: orderSummary })

    }, [state.cart])

    // product.slug === carProduct.slug && product.size === carProduct.size
    const addProductToCart = (product: ICartProduct) => {

        const productInCart = state.cart.some(item => item._id === product._id && item.size === product.size); //retorna boolean comprobando que el objeto existe y es igual la talla y el id
        if (!productInCart) return dispatch({ type: 'ADD-OR-UPDATE-PRODUCT', payload: [...state.cart, product] }) //Hace el dispatch con los productos que tiene y los nuevos si es falsa la condicion del productInCart

        //Acumulando los productos si existen previamente en el carrito con la misma talla
        const updatedProducts = state.cart.map(item => {
            if (item._id !== product._id) return item; // Retorna el mismo producto si no es el mismo comprobando por el id
            if (item.size !== product.size) return item; // Retorna el mismo producto si no es el mismo comprobando por el id(comparado anteriormente) y el size
            //Si logra pasar las dos comprobaciones anteriores:
            //Actualizamos la cantidad
            item.quantity += product.quantity;

            //Retornamos el producto con la nueva cantidad
            return item;
        })

        dispatch({ type: 'ADD-OR-UPDATE-PRODUCT', payload: updatedProducts })

    }

    //Mandar a llamar la funcion en el punto donde se necesite (en el cartList)
    const updateCartQuantity = (product: ICartProduct) => {
        dispatch({ type: 'CHANGE-CART-QUANTITY', payload: product })
    }

    const removeCartProduct = (product: ICartProduct) => {
        dispatch({ type: 'REMOVE-PRODUCT-IN-CART', payload: product })
    }

    return (
        <CartContext.Provider value={{
            ...state,

            // Methods
            addProductToCart,
            updateCartQuantity,
            removeCartProduct,
        }}>
            {children}
        </CartContext.Provider>
    )

}
