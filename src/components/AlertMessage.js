import {Alert} from 'react-bootstrap';
import {useEffect, useContext} from "react";
import '../css/AlertMessage.css';
import AlertContext from '../context/AlertContext';

function AlertMessage({message}) {
    const {setAlertMessage} = useContext(AlertContext);
    useEffect(() => {
        const timer = setTimeout(() => setAlertMessage({text: ''}), 3000);
        return () => clearTimeout(timer);
    }, [message]);

    return <><div>
        {message.text.length ? <div className={'alert-fixed position-fixed'} style={{right: '1rem', bottom: '-5rem', zIndex: 3}}>
        <Alert variant={message.variant || 'success'}>{message.text}</Alert>
        </div> : ''}
        </div></>
}

export default AlertMessage;