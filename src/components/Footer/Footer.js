import {ReactComponent as Logo} from '../../svg/logo.svg';
import {ReactComponent as Facebook} from './svg/facebook.svg';
import {ReactComponent as YouTube} from './svg/youtube.svg';
import {ReactComponent as Instagram} from './svg/instagram.svg';
import {ReactComponent as Telegram} from './svg/telegram.svg';
import {Link} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import '../../css/Footer.css';
function Footer () {
    return <>
    <div className='bg-dark mt-5'>
        <Container className='d-flex justify-content-between align-items-center footer'>
            <Link to="/"><Logo /></Link>
            <div className='d-flex m-4'>
                <div className='text-light mx-4'>Приєднуйся</div>
                <Link to="https://www.facebook.com" className='social mx-1' style={{backgroundColor: '#415893'}}><Facebook/></Link>
                <Link to="https://www.youtube.com" className='social mx-1' style={{backgroundColor: '#df4a46'}}><YouTube/></Link>
                <Link to="https://www.instagram.com" className='social mx-1' style={{background: 'linear-gradient(45deg,#f09433,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888)'}}>
                    <Instagram/></Link>
                <Link to="https://t.me" className='social mx-1' style={{backgroundColor: '#54a2dc'}}><Telegram/></Link>
            </div>
        </Container>
        
    </div>
    </>
}

export default Footer;