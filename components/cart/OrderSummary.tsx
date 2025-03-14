import { useContext } from "react"

import { CartContext } from "@/context"

import { Grid, Typography } from "@mui/material"

import { currency } from "@/utils"


export const OrderSummary = () => {

    const { numberOfItems, subTotal, total, tax } = useContext(CartContext)


    return (
        <Grid container>

            <Grid item xs={6}>
                <Typography>No. Productos</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{numberOfItems > 1 ? `${numberOfItems} items` : `${numberOfItems} item`}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>SubTotal</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{currency.format(subTotal)}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Taxes ({Number(process.env.NEXT_PUBLIC_TAXRATE) * 100}%)</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{currency.format(tax)}</Typography>
            </Grid>

            <Grid item xs={6} sx={{ mt: 2 }}>
                <Typography variant="subtitle1">Total:</Typography>
            </Grid>
            <Grid item xs={6} sx={{ mt: 2 }} display='flex' justifyContent='end'>
                <Typography variant="subtitle1">{currency.format(total)}</Typography>
            </Grid>

        </Grid>
    )
}