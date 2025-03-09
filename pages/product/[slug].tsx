import { useState, useContext } from 'react';

//Next
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

//MUI
import { Box, Button, Chip, Grid, Typography } from '@mui/material';

//Components
import { ShopLayout } from '../../components/layouts';
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui/ItemCounter';

//Api DB
import { dbProduct } from '@/database';
import { getProductBySlug } from '@/database/dbProducts';

//Context


//Interface
import { ICartProduct, IProduct, ISize } from '@/interfaces';
import { useRouter } from 'next/router';
import { CartContext } from '@/context';


interface Props {
    product: IProduct
}


//Verificar que este grabado en el estado de cart 
//addProductToCart en CartProvider
//Se deve ver en el estorage que se acumulan los productos

const ProductPage: NextPage<Props> = ({ product }) => {

    const router = useRouter();
    const { addProductToCart } = useContext(CartContext)

    const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>(
        {
            _id: product._id,
            title: product.title,
            price: product.price,
            image: product.images[0],
            gender: product.gender,
            size: undefined,
            slug: product.slug,
            quantity: 1,
        }
    );


    //Manejar el cambio de la talla
    const selectedNewSize = (size: ISize) => {
        setTempCartProduct(currentProduct => ({
            ...currentProduct,
            size,
        }))
    }

    //Manejar el cambio de la cantidad
    const handleQuantity = (quantity: number) => {
        setTempCartProduct(currentProduct => ({
            ...currentProduct,
            quantity,
        }))
    }

    //Manejar el click de agregar al carrito
    const onAddProduct = () => {
        if (!tempCartProduct.size) return;

        addProductToCart(tempCartProduct)

        router.push('/cart');
    }

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

                            {/* Contador */}
                            <ItemCounter
                                currentValue={tempCartProduct.quantity}
                                updateQuantity={handleQuantity}
                                maxValue={product.inStock}

                            />

                            {/* Tallas */}
                            <SizeSelector
                                // selectedSize={ product.sizes[2] } 
                                sizes={product.sizes}
                                selectedSize={tempCartProduct.size}
                                handleSizeClick={(size) => selectedNewSize(size)}
                            />
                        </Box>

                        {/* Agregar al carrito */}
                        {
                            (product.inStock > 0)
                                ? <Button
                                    color="secondary"
                                    className='circular-btn'
                                    onClick={onAddProduct}
                                >
                                    {
                                        tempCartProduct.size
                                            ? 'Agregar al carrito'
                                            : 'Selecciona una talla'
                                    }
                                </Button>
                                : <Chip label="No hay disponibles" color="error" variant='outlined' />
                        }

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


