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


const WomenPage: NextPage = () => {

    const { products, isLoading, isError } = useProducts('/products?gender=women');

    return (
        <ShopLayout title={'Teslo-Shop - Women'} pageDescription={'Encuentra los mejores productos para mujeres de Teslo '}>
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

export default WomenPage;