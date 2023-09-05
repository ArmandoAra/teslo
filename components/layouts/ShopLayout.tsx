import { FC, ReactNode } from 'react';
import Head from 'next/head';

import { Navbar, SideMenu } from '../ui';
import { JsxElement } from 'typescript';

// Otra opción sería usar extends de PropsWithChildren a Props (interface Props extends PropsWithChildren)
interface Props {
    title: string;
    pageDescription: string;
    imageFullUrl?: string; //Para cuando compartimos el url, sepa que imagen mostrar en predeterminado
    children?: ReactNode;
}

export const ShopLayout: FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
    return (
        <>
            <Head>
                <title>{title}</title>

                <meta name="description" content={pageDescription} />


                <meta name="og:title" content={title} />
                <meta name="og:description" content={pageDescription} />

                {
                    imageFullUrl && (
                        <meta name="og:image" content={imageFullUrl} />
                    )
                }

            </Head>

            <nav>
                <Navbar />
            </nav>

            <SideMenu />

            <main style={{
                margin: '80px auto',
                maxWidth: '1440px',
                padding: '0px 30px'
            }}>
                {children}
            </main>

            {/* Footer */}
            <footer>
                {/* TODO: mi custom footer */}
            </footer>

        </>
    )
}