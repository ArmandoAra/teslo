//Interfaces
import type { NextPage } from 'next';

//MUI
import { Typography } from '@mui/material';

//Components
import { ShopLayout } from '../components/layouts';
import { ProductList } from '../components/products';
import { FullScreenLoading } from '@/components/ui';

//Data
import { initialData } from '../database/seed-data';

//Hooks
import { useProducts } from '@/hooks';


const Home: NextPage = () => {

  const { products, isLoading, isError } = useProducts('/products');

  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Encuentra los mejores productos de Teslo aquí'}>
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

export default Home