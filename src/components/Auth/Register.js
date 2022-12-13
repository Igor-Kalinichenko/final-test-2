import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {useDispatch} from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import {useState, useContext} from 'react';
import { setUser } from "../../redux/userSlice";
import CurrentForm from "./CurrentForm";
import { Link, Navigate} from 'react-router-dom';
import {Container, Form} from 'react-bootstrap';
import {useAddUserMutation} from '../../redux/userApi';
import AlertContext from '../../context/AlertContext';
import '../../css/Auth.css';

function Register () {
    const dispatch = useDispatch();
    const {isAuth} = useAuth();
    const [addUser] = useAddUserMutation();
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const {setAlertMessage} = useContext(AlertContext);
      
    const handleRegister = (email, password) => {
        createUserWithEmailAndPassword(getAuth(), email, password).then(({user}) => {
                AddNewUser(user.uid, name, email);
                let newUser = {
                    id: user.uid,
                    firstName: name,
                    lastName: '',
                    email: user.email,
                    city: '',
                    phone: '',
                    role: 'user'
                }
                dispatch(setUser(newUser));
                localStorage.setItem('user', JSON.stringify(newUser));
            }).catch((error) => {
                setError(error.code);
                if(error.code === 'auth/invalid-email') setAlertMessage({text: 'Невірний email', variant: 'danger'});
                if(error.code === 'auth/internal-error') setAlertMessage({text: 'Невірний пароль', variant: 'danger'});
            })
        }
    const AddNewUser = async (id, name, email) => {
        await addUser({
            id: id,
            firstName: name,
            lastName: '',
            email: email,
            city: '',
            phone: '',
            role: 'user'
        }).unwrap();
    }
    return <>
    <Container>
        <div className='d-flex flex-column align-items-center justify-content-center mt-4'>
            <h1>Реєстрація</h1>
            <div className='w-50 auth-form'>
                <Form.Group className="mb-3">
                    <Form.Label>Ім'я</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Введіть Ваше ім'я"
                    />
                </Form.Group>
                <CurrentForm title="Sign Up" handleClick = {handleRegister} error={error} />
                <p>Вже зареєстровані? <Link to="/login" >Вхід</Link></p>
            </div>
            {isAuth ? <Navigate to='/' /> : ''}
        </div>
    </Container></>
}

export default Register;