// El provider ayuda a que los componentes hijos puedan acceder a los datos del contexto, 
// es decir, a los datos que se encuentran en el estado global de la aplicación.
// Va a guardar valores booleanos, strings, objetos, etc.

import { useReducer } from 'react';
import { UIContext, uiReducer } from '.';


interface UIProviderProps {
    children: React.ReactNode;
}

export interface UIState {
    sideMenuOpen: boolean;
    isOnLightTheme: boolean;
}

const UI_INITIAL_STATE: UIState = {
    sideMenuOpen: false,
    isOnLightTheme: true,
}

export const UIProvider = ({ children }: UIProviderProps) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const openSideBar = () => { dispatch({ type: 'OPEN_SIDEBAR' }) }
    const closeSideBar = () => { dispatch({ type: 'CLOSE_SIDEBAR' }) }

    const setTheme = () => { state.isOnLightTheme ? dispatch({ type: 'DARK-THEME' }) : dispatch({ type: 'LIGHT-THEME' }) }

    return (
        <UIContext.Provider value={{
            ...state,

            // Methods
            openSideBar,
            closeSideBar,
            setTheme,
        }}>
            {children}
        </UIContext.Provider>
    )

}
