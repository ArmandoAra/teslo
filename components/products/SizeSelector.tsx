import { FC, useState } from 'react';

//MUI
import { Box, Button } from '@mui/material';

//Interface
import { ISize } from '../../interfaces';
interface Props {
    selectedSize?: ISize;
    sizes: ISize[];
    //method
    handleSizeClick: (size: ISize) => void;
}


export const SizeSelector: FC<Props> = ({ selectedSize, sizes, handleSizeClick }) => {


    return (
        <Box>
            {
                sizes.map(size => (
                    <Button
                        key={size}
                        size='small'
                        color={selectedSize === size ? 'primary' : 'info'}
                        onClick={() => handleSizeClick(size)}
                    >
                        {size}
                    </Button>
                ))
            }
        </Box>
    )
}