import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';

interface Props extends PropsWithChildren {
    title: string;
}

export const AuthLayout: FC<Props> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            <main>
                <Box display='flex' justifyContent='center' alignItems='center' height="calc(100vh - 200px)">
                    {children}
                </Box>
            </main>

        </>
    )
}