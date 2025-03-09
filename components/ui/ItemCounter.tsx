import { FC, useState, useEffect } from 'react';

import { Box, IconButton, Typography } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';


interface Props {
    currentValue: number,
    maxValue: number,
    //Methods
    updateQuantity: (quantity: number) => void;
}

export const ItemCounter: FC<Props> = ({ currentValue, maxValue, updateQuantity }) => {

    const operation = (value: string) => {
        if (value === 'add') {
            (currentValue < maxValue) && updateQuantity(currentValue + 1)
        }
        if (value === 'remove') {
            (currentValue > 1) && updateQuantity(currentValue - 1)
        }
    }

    return (
        <Box display='flex' alignItems='center'>
            <IconButton
                onClick={() => {
                    operation('remove')
                }}
            >
                <RemoveCircleOutline />
            </IconButton>
            <Typography sx={{ width: 40, textAlign: 'center' }}> {currentValue} </Typography>
            <IconButton
                onClick={() => {
                    operation('add')
                }}
            >
                <AddCircleOutline />
            </IconButton>
        </Box>
    )
}