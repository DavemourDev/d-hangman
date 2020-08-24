import styles from './layout.module.scss'; 

import Head from 'next/head';

const Layout = ({title, children}) => {

    return (
        <div className={styles.layout}>
            <Head>
                <title>{ title }</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />    
            </Head>
            <div className={ styles.background }></div>    
            <div className={ styles.container }>
                <main>
                    {children}
                </main>
            </div>
            <footer className={ styles.pageFooter }>Copyright davemour&copy;2020</footer>
        </div>
    );
}

export default Layout;