import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Container, ListGroup} from 'react-bootstrap';
import {setToCart} from '../../redux/cartSlice';

import CartItem from './CartItem';
import TotalCart from './TotalCart';
import DeliveryInfoCart from './DeliveryInfoCart';

import {ReactComponent as ChevroneLeft} from '../../svg/chevrone-left.svg';
import '../../css/ResetLink.css';
import '../../css/Cart.css';

function Cart () {
    const orders = useSelector(state => state.cart.cart);
    const dispatch = useDispatch();
    const [orderSuccess, setOrderSuccess] = useState(false);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(orders));
      }, [orders]);

    const removeFromCart = (id) => {
        dispatch(setToCart(orders.filter(el => el.id !== id)));
    }

    const addCount = id => {
        dispatch(setToCart(orders.map(order => ({...order,
        count: order.id === id ? order.count + 1 : order.count }))))
    }
    
    const reduceCount = id => {
        dispatch(setToCart(orders.map(order => ({...order,
        count: order.id === id ? order.count - 1 : order.count }))))
    }

    if(orderSuccess) return <>
        <h1 className='text-center text-success mt-5'>Ваше замовлення успішно оформлено</h1>
        <h4 className='text-center'>Найближчим часом з Вами зв'яжеться наш менеджер</h4>
        <div className='text-center'>
            <Link to="/" className="resetLink border border-success p-2 px-4 mt-5 to-main-btn">
                <h5 className='m-0 text-success'>Повернутися до покупок</h5>
            </Link>
        </div>
    </>
    return <><Container>
    <span className='m-3'>
        <Link to="/" className="resetLink"><h6><ChevroneLeft /> На головну</h6></Link>
    </span>
        <h4 className="text-center text-uppercase">Мій кошик</h4>
    <div className='d-flex justify-content-between my-5 bucket'>
        <div className='products-box'>
            {
            orders?.length ? <>
                <ListGroup>
                    {
                        orders.map((order, index) => <CartItem
                                                            key={index}
                                                            order={order}
                                                            removeFromCart={removeFromCart}
                                                            addCount={addCount}
                                                            reduceCount={reduceCount}/>)
                    }
                </ListGroup>
                <ListGroup className='mt-2'>
                    <TotalCart orders={orders}/>
                </ListGroup></> : <><ListGroup>
                    <ListGroup.Item><h4 className='text-center'>На жаль Ваш кошик пустий</h4></ListGroup.Item></ListGroup></>
            }
            
        </div>
        <div className='info-box'>
            <ListGroup>
                <DeliveryInfoCart orders={orders} setOrderSuccess={setOrderSuccess}/>
            </ListGroup>
        </div>
    </div>
    </Container></>
}

export default Cart