import Link from 'next/link'

import { AppBar, Badge, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';

export const Navbar = () => {
    return (
        <AppBar>
            <Toolbar>

                <Link href='/' >
                    <Typography variant='h6'>Teslo |</Typography>
                    <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                </Link>


                <Box flex={1} />

                {/* Condicional para mostrar los botones solo en pantallas grandes, utilizando la ventaja 
                que nos proporciona material al poder tener acceso con sx a las propiedades globales como sm xs */}
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>

                    <Link href='/category/men'>
                        <Button>Hombres</Button>
                    </Link>


                    <Link href='/category/women'>
                        <Button>Mujeres</Button>
                    </Link>


                    <Link href='/category/kid'>
                        <Button>Niños</Button>
                    </Link>

                </Box>


                <Box flex={1} />

                <IconButton>
                    <SearchOutlined />
                </IconButton>


                <Link href="/cart">
                    <IconButton>
                        <Badge badgeContent={2} color="secondary"> {/* El badgeContent es donde sale el numerito encima del carrito de compras */}
                            <ShoppingCartOutlined />
                        </Badge>
                    </IconButton>
                </Link>



                <Button>
                    Menú
                </Button>

            </Toolbar>
        </AppBar>
    )
}