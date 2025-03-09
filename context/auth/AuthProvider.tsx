
import { FC, use, useEffect, useReducer } from 'react';
import { AuthContext, authReducer, } from './';

import Cookies from 'js-cookie';
import { OrderSummary } from '../../components/cart/OrderSummary';
import { IUser } from '@/interfaces';
import { tesloApi } from '@/api';
import axios from 'axios';

interface AuthProviderProps {
    children: React.ReactNode;
}


export interface AuthState {
    isLogedIn: boolean;
    user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
    isLogedIn: false,
    user: undefined,
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);


    //Efecto para validar el token  y mantener la sesion
    useEffect(() => {
        //llamar al endpoint
        //Revalidar token guardado
        //Dispatch
        //borrar el token de las cookies
        const validateToken = async () => {
            try {
                const { data } = await tesloApi.get('/user/validate-token');
                const { token, user } = data;
                Cookies.set('token', token);
                dispatch({ type: 'LOGIN', payload: user });
            } catch (error) {
                Cookies.remove('token');
                dispatch({ type: 'LOGOUT' });
            }
        }
        validateToken();
    }, [])

    //Login
    const loginUser = async (email: string, password: string): Promise<boolean> => {
        try {
            const { data } = await tesloApi.post('/user/login', { email, password });
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: 'LOGIN', payload: user });
            return true;
        } catch (error) {
            return false;
        }
    }

    //Register
    const registerUser = async (name: string, email: string, password: string): Promise<{
        hasError: boolean;
        message?: any;
    }> => {
        try {
            const { data } = await tesloApi.post('/user/register', { name, email, password });
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: 'LOGIN', payload: user });
            return {
                hasError: false,
                message: 'Usuario registrado correctamente'
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data.message || 'Error al registrar el usuario'
                }
            }
            return {
                hasError: true,
                message: 'Error al registrar el usuario'
            }
        }
    }


    return (
        <AuthContext.Provider value={{
            ...state,

            loginUser,
            registerUser,
        }}>
            {children}
        </AuthContext.Provider>
    )

}
