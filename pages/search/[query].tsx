import type { GetServerSideProps, NextPage } from 'next';

//MUI
import { Box, Typography } from '@mui/material';

//Components
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '@/components/ui';

//Data
import { initialData } from '../../database/seed-data';

//Hooks
import { useProducts } from '@/hooks';
import { dbProduct } from '@/database';

//Interfaces
import { IProduct } from '@/interfaces';
interface Props {
    products: IProduct[];
    foundProducts: boolean;
    query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {



    return (
        <ShopLayout title={'Teslo-Shop - Search'} pageDescription={'Encuentra los mejores productos de Teslo aquí'}>
            <>
                <Typography variant='h1' component='h1'>Search Product</Typography>
                <Typography variant='h2' sx={{ mb: 1 }}>We are in the searchig page</Typography>
                {
                    foundProducts
                        ? (
                            <Box>
                                <Typography variant='h3' sx={{ mb: 1 }} textTransform='capitalize'>We found {products.length} products for: {query}</Typography>
                                <ProductList products={products} />
                            </Box>
                        )
                        : (<>
                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                                <Typography variant='h3' sx={{ mb: 1 }}>We did not find any product for: </Typography>
                                <Typography variant='h3' sx={{ mb: 1, textDecoration: 'underline', backgroundColor: 'red' }} textTransform='capitalize'>{query}</Typography>
                            </Box>
                            <ProductList products={products} />
                        </>
                        )
                }


            </>


        </ShopLayout>
    )
}

export const getServerSideProps: GetServerSideProps<{}> = async ({ params }) => {
    const { query = '' } = params as { query: string }

    //Si no hay query, redirigir a la página de inicio
    if (query.length === 0) return {
        redirect: {
            destination: '/',
            permanent: true
        }
    }

    //Preguntar a la API por los productos
    let products = await dbProduct.getProductsbyTerm(query);
    const foundProducts = products.length > 0;

    if (foundProducts === false) {
        products = await dbProduct.getAllProducts();
    }


    //Mandamos esto al cliente
    return {
        props: {
            products,
            foundProducts,
            query,
        }
    }
}

export default SearchPage;