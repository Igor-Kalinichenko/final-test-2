import {ListGroup, Form, Button} from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux';
import { useForm } from "react-hook-form";
import { useAddOrderMutation } from "../../redux/ordersApi";
import {setToCart} from '../../redux/cartSlice';
import '../../css/Cart.css';

function DeliveryInfoCart({orders, setOrderSuccess}) {
    const user = useSelector(state => state.user.users);
    const {register, formState: {errors}, handleSubmit, reset} = useForm({mode: "onChange"});
    const [addOrder] = useAddOrderMutation();
    const dispatch = useDispatch();
    
    const onSubmit = async data => {

        await addOrder({
            customerName: data.firstName+' '+data.lastName,
            customerPhone: data.phone,
            customerEmail: data.email,
            deliverCity: data.city,
            orders: orders
        }).unwrap();
        reset();
        dispatch(setToCart([]));
        setOrderSuccess(true);

    }
  return <ListGroup.Item>
    <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="d-flex justify-content-between mb-4">
            <div className="delivery-info-input">
                <Form.Label>Ваше Ім'я</Form.Label>
                <Form.Control 
                        type="text" 
                        placeholder="Введіть ім'я"
                        defaultValue={user?.firstName}
                        {...register("firstName")} />
            </div>
            <div className="delivery-info-input">
            <Form.Label>Ваше Прізвище</Form.Label>
                <Form.Control 
                    type="text"
                    placeholder="Введіть прізвище"
                    defaultValue={user?.lastName}
                    {...register("lastName")} />
            </div>
        </Form.Group>
            <Form.Label>Ваш номер телефону</Form.Label>
            <Form.Control 
                type="tel"
                placeholder="Введіть номер телефону"
                defaultValue={user?.phone}
                className={errors?.phone && 'border-danger'}
                {...register("phone", {required: true, pattern: {
                    value: /[+]\d{12}/,
                    message: 'Введіть ваш номер телефону у форматі +380ХХХХХХХХХ'}}
                    )} />
            <div>{errors?.phone && <p className='text-danger px-3 delivery-error'>{errors?.phone?.message || 'Введіть ваш номер телефону'}</p>}</div>  
        <Form.Group className="mb-4">
            
        </Form.Group>
        <Form.Group className="d-flex justify-content-between mb-4">
            <div className="delivery-info-input">
                <Form.Label>Ваш Email</Form.Label>
                <Form.Control 
                    type="email"
                    placeholder="Введіть email"
                    defaultValue={user?.email}
                    {...register("email")} />
            </div>
            <div className="delivery-info-input">
                <Form.Label>Місто відправки</Form.Label>
                <Form.Control 
                    type="text"
                    placeholder="Введіть назву міста"
                    defaultValue={user?.city}
                    {...register("city", {required: true})}
                    className={errors?.city && 'border-danger'} />
                <div>{errors?.city && <p className='text-danger px-3 delivery-error'>Введіть місто доставки</p>}</div>
            </div>
        </Form.Group>
        <div>
            <Button
                variant='success'
                type="submit"
                disabled={orders.length ? false : true}
                style={{width: '100%'}}>Оформити</Button>
        </div>
    </Form>
  </ListGroup.Item>
}

export default DeliveryInfoCart