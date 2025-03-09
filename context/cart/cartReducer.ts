// Este uiReducer se va a colocar en el Provider de UIState, para que todos los componentes que esten dentro del provider puedan acceder al state y a las funciones que modifican el state


// Recibe un estado y una acción y devuelve un nuevo estado,No se permiten hacer mutaciones del estado,
// El estado es inmutable, por lo que no se puede modificar directamente
// Se debe crear un nuevo estado a partir del anterior
// El reducer no es asincrono, por lo que no se puede usar async/await


import { ICartProduct } from '@/interfaces';
import { CartState } from '.';


// la accion le va a decir al reducer que modificacion se debe hacer en el state, el payload es la informacion que se necesita para hacer la modificacion
type CartActionType =
    | { type: 'LOAD-CART-FROM-LOCALSTORAGE-COOKIES', payload: ICartProduct[] }
    | { type: 'ADD-OR-UPDATE-PRODUCT', payload: ICartProduct[] }
    | { type: 'CHANGE-CART-QUANTITY', payload: ICartProduct } //payload es el producto que se va a modificar
    | { type: 'REMOVE-PRODUCT-IN-CART', payload: ICartProduct } //payload es el producto que se va a modificar
    | {
        type: 'UPDATE-ORDER-CART-SUMARY',
        payload: {
            numberOfItems: number;
            subTotal: number;
            tax: number;
            total: number;
        },
    }



//Funcion pura que deve resolver el estado con la data que recibe, ya los datos deben venir validados y listos para ser usados
export const cartReducer = (state: CartState, action: CartActionType): CartState => {

    switch (action.type) {
        case 'LOAD-CART-FROM-LOCALSTORAGE-COOKIES':
            // regresar un nuevo estado
            return {
                ...state,
                cart: action.payload,
            }
        case 'ADD-OR-UPDATE-PRODUCT':
            // regresar un nuevo estado
            return {
                ...state,
                cart: [...action.payload] //El nuevo valor del carrito va a ser literalmente el valor que tenga en el payload
            }

        case 'CHANGE-CART-QUANTITY':
            // regresar un nuevo estado
            return {
                ...state,
                cart: state.cart.map((product) => {
                    if (product._id !== action.payload._id) return product;
                    if (product.size !== action.payload.size) return product;

                    //retornar el producto con la cantidad modificada
                    return action.payload;

                })
            }
        case 'REMOVE-PRODUCT-IN-CART':
            // regresar un nuevo estado
            return {
                ...state,
                cart: state.cart.filter(product => !(product._id === action.payload._id && product.size === action.payload.size))
            }

        case 'UPDATE-ORDER-CART-SUMARY':
            return {
                ...state,
                ...action.payload
            }



        default:
            // regresar el estado sin modificar
            return state;
    }
}
