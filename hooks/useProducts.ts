//Data fetching del lado del cliente

//Peticiones fetch con swr
import useSWR, { SWRConfiguration } from 'swr'
// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json())

//Interfaces
import { IProduct } from '@/interfaces'

//Vamos a poder mandar las configuraciones desde cualquier lugar que usemos este hook, por defecto viene vacia y es opcional
export const useProducts = (url: string, config: SWRConfiguration = {}) => {

    // const { data, error, isLoading } = useSWR<IProduct[]>(`/api${url}`, fetcher, config)
    const { data, error, isLoading } = useSWR<IProduct[]>(`/api${url}`, config) //Esto funciona por el provider que configuramos en el _app.tsx

    return {
        products: data || [],
        isLoading: !data && !error,
        isError: error,
    }
}