import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";
import {useDispatch} from 'react-redux';
import { useContext, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { setUser } from "../../redux/userSlice";
import CurrentForm from "./CurrentForm";
import { Link, Navigate} from 'react-router-dom';
import { useGetUsersQuery } from "../../redux/userApi";
import AlertContext from '../../context/AlertContext';
import { Container } from "react-bootstrap";

function Login () {
    const dispatch = useDispatch();
    const {isAuth} = useAuth();
    const {data: users} = useGetUsersQuery();
    const [error, setError] = useState('');
    const {setAlertMessage} = useContext(AlertContext);
    
      
    const handleRegister = (email, password) => {
        signInWithEmailAndPassword (getAuth(), email, password)
            .then(({user}) => {
                let newUser = users.filter(el => el.id === user.uid);
                dispatch(setUser(newUser[0]));
                localStorage.setItem('user', JSON.stringify(newUser[0]));
            })
            .catch((error) => {
                console.log(error.code);
                setError(error.code);
                if(error.code === 'auth/user-not-found') setAlertMessage({text: 'Користувач не знайден. Перевірте email або пароль', variant: 'danger'});
                if(error.code === 'auth/invalid-email') setAlertMessage({text: 'Невірний email', variant: 'danger'});
                if(error.code === 'auth/internal-error') setAlertMessage({text: 'Невірний пароль', variant: 'danger'});
            })
    }

      
    return <>
    <Container>
        <div className='d-flex flex-column align-items-center justify-content-center mt-4'>
            <h1>Вхід</h1>
            <div className='w-50 auth-form'>
                <CurrentForm title="Sign In" handleClick={handleRegister} error={error} />
                <p>Не маєте акаунту? <Link to="/register" >Зареєструватись</Link></p>
            </div>
            {isAuth ? <Navigate to='/' /> : ''}
        </div>
    </Container></>
}

export default Login;