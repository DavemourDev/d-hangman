import styles from './layout.module.scss'; 

import Head from 'next/head';

const Layout = ({title, children}) => {

    return (
        <div className={styles.layout}>
            <Head>
                <title>{ title }</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />    
            </Head>    
            {children}
        </div>
    );
}

export default Layout;