
import { IUser } from '@/interfaces';
import { AuthState } from '.';



type AuthActionType =
    | { type: 'LOGIN', payload: IUser }
    | { type: 'LOGOUT' }


export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {

    switch (action.type) {
        case 'LOGIN':
            // regresar un nuevo estado
            return {
                ...state,
                isLogedIn: true,
                user: action.payload
            }
        case 'LOGOUT':
            // regresar un nuevo estado
            return {
                ...state,
                isLogedIn: false,
                user: undefined,
            }



        default:
            // regresar el estado sin modificar
            return state;
    }
}
