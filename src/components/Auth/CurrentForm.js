import {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import '../../css/Form.css';

function CurrentForm ({title, handleClick, error}) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    
    return <>
    <Form.Group className="mb-3">
        <Form.Label>Email Адреса</Form.Label>
        <span className='text-danger'>*</span>
        <Form.Control 
            className={`${error === 'auth/invalid-email' ? 'border-danger' : ''}`}
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введіть Ваш email"
        />
        <Form.Text className={`${error === 'auth/invalid-email' ? 'text-danger' : 'text-muted'}`}>Введіть Ваш справжній email</Form.Text>
    </Form.Group>

    <Form.Group className="mb-3">
        <Form.Label>Введіть пароль</Form.Label>
        <span className='text-danger'>*</span>
        <Form.Control
            className={`${error === 'auth/internal-error' ? 'border-danger' : ''}`}
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Введіть Пароль"
        />
        <Form.Text className={`${error === 'auth/internal-error' ? 'text-danger' : 'text-muted'}`}>Пароль має бути не менше 6 символів</Form.Text>
    </Form.Group>
    <Button 
        variant="primary" 
        type="submit"
        onClick={() => handleClick(email, pass)}>
    {title}</Button></>
}

export default CurrentForm;