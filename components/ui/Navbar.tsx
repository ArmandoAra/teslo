import { useContext, useEffect, useState } from 'react';

import Link from 'next/link'

import router, { useRouter } from 'next/router';

//MUI
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Toolbar, Typography } from '@mui/material';
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';

// Context
import { UIContext } from '@/context';

export const Navbar = () => {

    // Haciendo que los botones se modifiquen dependiendo en la url que estamos
    const { asPath } = useRouter()

    //Manejando el menu lateral
    const { openSideBar } = useContext(UIContext)

    const { sideMenuOpen, closeSideBar } = useContext(UIContext)


    const navigateTo = (url: string) => {
        router.push(url);
        closeSideBar();
    }

    //value y onChange del input respectivamete para ir controlando el valor del input
    const [searchTerm, setSearchTerm] = useState('')
    const [isSearchVisible, setIsSearchVisible] = useState(false); //Para mostrar el input de busqueda en pantallas grandes

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return; //Evaluamos que no este vacio el campo de busqueda

        navigateTo(`/search/${searchTerm}`);
    }


    return (
        <AppBar>
            <Toolbar>

                <Link href='/' >
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignContent: 'center', textDecoration: 'none' }}>
                        <Typography variant='h6'>Teslo |</Typography>
                        <Typography sx={{ ml: 0.5, display: 'flex', alignItems: 'center', }}>Shop</Typography>
                    </Box>
                </Link>


                <Box flex={1} />

                {/* Condicional para mostrar los botones solo en pantallas grandes, utilizando la ventaja 
                que nos proporciona material al poder tener acceso con sx a las propiedades globales como sm xs */}
                <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}
                    className='fadeIn'
                >

                    <Link href='/category/men' >
                        <Button color={(asPath === '/category/men') ? 'primary' : 'info'} >Hombres</Button>
                    </Link>


                    <Link href='/category/women'>
                        <Button color={(asPath === '/category/women') ? 'primary' : 'info'} >Mujeres</Button>
                    </Link>


                    <Link href='/category/kid'>
                        <Button color={(asPath === '/category/kid') ? 'primary' : 'info'}>Niños</Button>
                    </Link>

                </Box>


                <Box flex={1} />
                {/* Pantallas pantallas grandes */}
                {
                    isSearchVisible
                        ? (
                            <Input
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                                className='fadeIn'
                                autoFocus
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' ? onSearchTerm() : null}
                                type='text'
                                placeholder="Buscar..."
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setIsSearchVisible(false)}
                                        >
                                            <ClearOutlined />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        )
                        :
                        (
                            <IconButton
                                onClick={() => setIsSearchVisible(true)}
                                className="fadeIn"
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                            >
                                <SearchOutlined />
                            </IconButton>
                        )
                }
                {/* Small Screens */}
                <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                    onClick={openSideBar}
                >
                    <SearchOutlined />
                </IconButton>


                <Link href="/cart">
                    <IconButton>
                        <Badge badgeContent={2} color="secondary"> {/* El badgeContent es donde sale el numerito encima del carrito de compras */}
                            <ShoppingCartOutlined />
                        </Badge>
                    </IconButton>
                </Link>



                <Button
                    onClick={openSideBar}
                >
                    Menú
                </Button>

            </Toolbar>
        </AppBar>
    )
}