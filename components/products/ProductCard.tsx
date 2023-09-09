import { FC, useMemo, useState } from 'react';
import Link from 'next/link';
import { Grid, Card, CardActionArea, CardMedia, Box, Typography, } from '@mui/material'

import { IProduct } from '../../interfaces'

interface Props {
    product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {

    const [isHovered, setIsHovered] = useState(false);
    const [isImageLoaded, setImageLoaded] = useState(false); //Para hacer que aparezca el texto solo cuando la imagen ya ha sido cargada

    const productImage = useMemo(() => {
        return isHovered
            ? `/products/${product.images[1]}`
            : `/products/${product.images[0]}`;

    }, [isHovered, product.images])

    return (
        <Grid item
            xs={6}
            sm={4}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Card>

                <Link href={`/product/${product.slug}`} prefetch={false}>
                    <CardActionArea>
                        <CardMedia
                            component='img'
                            className='fadeIn'
                            image={productImage}
                            alt={product.title}
                            onLoad={() => setImageLoaded(true)}//Despues que es cargada la imagen dispara la funcion para que se cargue el texto
                        />

                    </CardActionArea>
                </Link>


            </Card>


            {/* Solo se carga el texto despues que la imagen ha sido cargada */}
            <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} className='fadeIn'>
                <Typography fontWeight={700}>{product.title}</Typography>
                <Typography fontWeight={500}>{`$${product.price}`}</Typography>
            </Box>

        </Grid>
    )
}