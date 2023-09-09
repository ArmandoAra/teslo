//Interfaces
import type { NextPage } from 'next';

//MUI
import { Typography } from '@mui/material';

//Components
import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui';

//Data
import { initialData } from '@/database';

//Hooks
import { useProducts } from '@/hooks';


const KidsPage: NextPage = () => {

    const { products, isLoading, isError } = useProducts('/products?gender=kid');// se podria tambien recibir los datos del servidor por las props en vez de porr los hooks


    return (
        <ShopLayout title={'Teslo-Shop - Kids'} pageDescription={'Encuentra los mejores productos de Teslo para'}>
            <>
                <Typography variant='h1' component='h1'>Tienda</Typography>
                <Typography variant='h2' sx={{ mb: 1 }}>Todos los productos</Typography>

                {
                    isLoading
                        ? <FullScreenLoading />
                        : <ProductList products={products} />
                }
            </>


        </ShopLayout>
    )
}

export default KidsPage;