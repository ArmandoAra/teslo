//Next
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next';

//MUI
import { Box, Button, Chip, Grid, Typography } from '@mui/material';

//Components
import { ShopLayout } from '../../components/layouts';
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui/ItemCounter';

//Api DB
import { dbProduct } from '@/database';
import { getProductBySlug } from '@/database/dbProducts';

//Interface
import { IProduct } from '@/interfaces';


interface Props {
    product: IProduct
}


const ProductPage: NextPage<Props> = ({ product }) => {


    return (
        <ShopLayout title={product.title} pageDescription={product.description}>

            <Grid container spacing={3}>

                <Grid item xs={12} sm={7}>
                    <ProductSlideshow
                        images={product.images}
                    />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Box display='flex' flexDirection='column'>

                        {/* titulos */}
                        <Typography variant='h1' component='h1'>{product.title}</Typography>
                        <Typography variant='subtitle1' component='h2'>{`$${product.price}`}</Typography>

                        {/* Cantidad */}
                        <Box sx={{ my: 2 }}>
                            <Typography variant='subtitle2'>Cantidad</Typography>
                            <ItemCounter />
                            <SizeSelector
                                // selectedSize={ product.sizes[2] } 
                                sizes={product.sizes}
                            />
                        </Box>


                        {/* Agregar al carrito */}
                        {/* <Button color="secondary" className='circular-btn'>
                            Agregar al carrito
                        </Button> */}

                        {/* <Chip label="No hay disponibles" color="error" variant='outlined' /> */}

                        {/* Descripción */}
                        <Box sx={{ mt: 3 }}>
                            <Typography variant='subtitle2'>Descripción</Typography>
                            <Typography variant='body2'>{product.description}</Typography>
                        </Box>

                    </Box>
                </Grid>


            </Grid>

        </ShopLayout>
    )
}

//getServerSideProps
//No Hacer esto, Esto va a hacer que cada vez que el usuario necesite la pagina, haga la req al servidor
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {

//     const { slug = '' } = params as { slug: string }
//     const product = await dbProduct.getProductBySlug(slug)
//     if (!product) {
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false,
//             }
//         }
//     }
//     return {
//         props: {
//             product,
//         }
//     }
// }


//Hacer el getStaticPaths
//Generar todas las paginas posibles por los slug que devuelve el getAllProductsSlugs
//Verificar bien la sintaxis, puede dar error de tipos y ser causa de la sintaxis
export const getStaticPaths: GetStaticPaths = async () => {

    //Obtener todos los slugs
    const dataSlugs = await dbProduct.getAllProductsSlugs();

    return {
        paths: dataSlugs.map(({ slug }) => ({ //desestructuramos slug de dataSlugs.slug en el map
            params: {
                slug //Esto estara en la url
            }
        })),
        fallback: 'blocking',
    }

}


//Hacer el getStatictProps
//Envial al cliente el producto solicitado

export const getStaticProps: GetStaticProps = async (ctx) => {

    const { slug } = ctx.params as { slug: string }
    console.log(slug)
    const product = await getProductBySlug(slug)


    if (!product) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
            revalidate: 60 * 60 * 24
        }
    }

    return {
        props: {
            product
        }
    }
}

//Resumen de lo que hicimos
//El getStaticPath obtiene los datos de todos los posibles slugs de los productos para crear todas las 
//paginas estaticas con las urls basadas en los slugs
//El getStaticProps va a leer por los params del ctx el slug que le enviamos previamende del Path, hace 
//la busqueda en la DB y manda el resultado por las props al componente, y revalidamos la data cada 24 horas



export default ProductPage;
