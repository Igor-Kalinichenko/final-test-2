import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer/Footer';

function Layout () {
    return (
        <>
        <div style={{flex: '1 0 auto'}}>
            <Header />
            <Outlet />
        </div>
        <div style={{flexShrink: '0'}}>
            <Footer />
        </div>
        </>
    )
}

export default Layout;