import {Link} from 'react-router-dom';
import {ReactComponent as ChevroneLeft} from '../../svg/chevrone-left.svg';
import '../../css/ResetLink.css';
import { Container } from 'react-bootstrap';

function Contacts () {
    return <>
    <Container>
        <span className='m-3'>
            <Link to="/" className="resetLink"><h6><ChevroneLeft /> На головну</h6></Link>
        </span>
        <h5 className="text-center mt-4">Контакти</h5>
        <p><b>Гаряча лінія:</b></p>
        <p>068-075-07-07</p>
        <p>073-075-07-07</p>
        <p>050-075-07-07</p>
        <div className="border my-3"></div>
        <p><b>Viber</b> 073-075-07-07 ( тільки для повідомлень )</p>
        <p><b>e-mail</b> support@megasport.ua;</p>
        <p><b>Офіційний сайт</b> www.megasport.ua;</p>
        <div className="border my-3"></div>
        <p><b>Гаряча лінія</b></p>
        <p><b>support@megasport.ua</b></p>
        <p>Всі звернення приймаються та обробляються в робочий час:</p>
        <p>Щодня: з 9:00 до 20:00</p>
        <p>без перерви та вихідних</p>
    </Container></>
}

export default Contacts;