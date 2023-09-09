// Este uiReducer se va a colocar en el Provider de UIState, para que todos los componentes que esten dentro del provider puedan acceder al state y a las funciones que modifican el state


// Recibe un estado y una acción y devuelve un nuevo estado,No se permiten hacer mutaciones del estado,
// El estado es inmutable, por lo que no se puede modificar directamente
// Se debe crear un nuevo estado a partir del anterior
// El reducer no es asincrono, por lo que no se puede usar async/await


import { UIState } from '.';


// la accion le va a decir al reducer que modificacion se debe hacer en el state, el payload es la informacion que se necesita para hacer la modificacion
type UIActionType =
    | { type: 'OPEN_SIDEBAR' }
    | { type: 'CLOSE_SIDEBAR' }
    | { type: 'LIGHT-THEME' }
    | { type: 'DARK-THEME' }



export const uiReducer = (state: UIState, action: UIActionType): UIState => {

    switch (action.type) {
        case 'OPEN_SIDEBAR':
            // regresar un nuevo estado
            return {
                ...state,
                sideMenuOpen: true
            }

        case 'CLOSE_SIDEBAR':
            return {
                ...state,
                sideMenuOpen: false
            }
        case 'LIGHT-THEME':
            return {
                ...state,
                isOnLightTheme: true
            }
        case 'DARK-THEME':
            return {
                ...state,
                isOnLightTheme: false
            }

        default:
            // regresar el estado sin modificar
            return state;
    }
}
