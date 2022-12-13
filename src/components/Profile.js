import {useSelector, useDispatch} from 'react-redux';
import {Form, Button, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useEditUserMutation } from "../redux/userApi";
import { setUser } from "../redux/userSlice";
import AlertContext from '../context/AlertContext';
import {ReactComponent as ChevroneLeft} from '../svg/chevrone-left.svg';
import '../css/ResetLink.css';
import '../css/Profile.css';

function Profile () {
    const user = useSelector(state => state.user.users);
    const dispatch = useDispatch();
    const [editUser] = useEditUserMutation();
    const {register, formState: {errors}, handleSubmit} = useForm({mode: "onChange"});
    const {setAlertMessage} = useContext(AlertContext);
    const [success, setSuccess] = useState(false);
    const cities = ["Київ", "Львів", "Дніпро", "Харків", "Івано-Франківськ", "Тернопіль", "Вінниця", "Одеса", "Рівне", "Запоріжжя",
    "Хмельницький", "Луцьк", "Полтава", "Житомир", "Черкаси", "Кропивницький", "Чернівці", "Миколаїв", "Ужгород", "Суми", "Херсон",
    "Донецьк", "Луганськ", "Сімферополь"];

    const onSubmit = async (data) => {
        const id = user.id;
        await editUser({id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            city: data.city,
            phone: data.phone
        }).unwrap();
        dispatch(setUser({...user, 
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            city: data.city,
            phone: data.phone
        }));
        localStorage.setItem('user', JSON.stringify({...user, 
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            city: data.city,
            phone: data.phone
        }));
        setAlertMessage({text: 'Ваші дані успішно змінено', variant: 'success'});
        setSuccess(true);
    }

    return <><Container>
    <span className='m-3'>
        <Link to="/" className="resetLink"><h6><ChevroneLeft /> На головну</h6></Link>
    </span>
    <div className='d-flex flex-column align-items-center justify-content-center'>
        <h4 className="text-center">Персональні дані</h4>
        <h5 className={success ? "d-block text-success" : 'd-none'}>Ваші дані змінено</h5>
    <div className='w-50 profile-form'>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-4">
                <Form.Label>Ваше Ім'я</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Введіть ім'я"
                    defaultValue={user?.firstName}
                    {...register("firstName")} />
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label>Ваше Прізвище</Form.Label>
                <Form.Control 
                    type="text"
                    placeholder="Введіть прізвище"
                    defaultValue={user?.lastName}
                    {...register("lastName")} />
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label>Ваш Email</Form.Label>
                <Form.Control 
                    type="email"
                    placeholder="Введіть email"
                    defaultValue={user?.email}
                    {...register("email", {required: true})}
                    className={errors?.email && 'border-danger'} />
                <div>{errors?.email && <p className='text-danger px-3'>Введіть ваш справжній Email</p>}</div>
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label>Ваш номер телефону</Form.Label>
                <Form.Control 
                    type="tel"
                    placeholder="Введіть номер телефону"
                    defaultValue={user?.phone}
                    className={errors?.phone && 'border-danger'}
                    {...register("phone", {pattern: {
                        value: /[+]\d{12}/,
                        message: 'Введіть ваш номер телефону у форматі 380ХХХХХХХХХ'}}
                        )}
                />
                <div>{errors?.phone && <p className='text-danger px-3'>{errors?.phone?.message || 'Введіть ваш номер телефону'}</p>}</div>
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label><h5>Оберіть ваше місто</h5></Form.Label>
                <Form.Select {...register("city")}>
                    <option value={user?.city || ''}>{user?.city || 'Оберіть місто'}</option>
                    {cities.map((el, index) => (<option key={index} value={el}>{el}</option>))}
                </Form.Select>
            </Form.Group>
            <Button variant='success' type="submit">Підтвердити</Button> 
        </Form>
    </div>
</div>
</Container></>
}

export default Profile;