import { useContext } from 'react'

import '../styles/globals.css';
import type { AppProps } from 'next/app';

// MUI
import { CssBaseline, ThemeProvider } from '@mui/material';

//UI
import { UIContext, UIProvider } from '@/context';

//Temas
import { lightTheme } from '../themes';

// Data fetchig global configuracion provider
import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps }: AppProps) {

  // const { isOnLightTheme } = useContext(UIContext) //Cambiar el tema

  return (

    <UIProvider>
      <SWRConfig
        value={{
          //refreshInterval: 3000, //Intervalo de peticiones
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />  {/* Para que muestre los temas de MUI */}
          <Component {...pageProps} />
        </ThemeProvider>
      </SWRConfig>
    </UIProvider>
  )
}

export default MyApp