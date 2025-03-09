import { useContext } from 'react'

import '../styles/globals.css';
import type { AppProps } from 'next/app';

// MUI
import { CssBaseline, ThemeProvider } from '@mui/material';

// Context
import { CartProvider, UIProvider, AuthProvider } from '@/context';

//Temas
import { lightTheme } from '../themes';

// Data fetchig global configuracion provider
import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps }: AppProps) {

  // const { isOnLightTheme } = useContext(UIContext) //Cambiar el tema

  return (
    <SWRConfig
      value={{
        //refreshInterval: 3000, //Intervalo de peticiones
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <AuthProvider>
        <CartProvider>
          <UIProvider>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline />  {/* Para que muestre los temas de MUI */}
              <Component {...pageProps} />
            </ThemeProvider>
          </UIProvider>
        </CartProvider>
      </AuthProvider>
    </SWRConfig>
  )
}

export default MyApp