import {ListGroup, Image} from "react-bootstrap";
import {ReactComponent as AddCount} from '../../svg/add.svg';
import {ReactComponent as ReduceCount} from '../../svg/reduce.svg';
import {ReactComponent as DeleteBucket} from '../../svg/deleteBucket.svg';

function CartItem({order, removeFromCart, addCount, reduceCount}) {
    
  return <ListGroup.Item className={'d-flex'}>
    <div style={{width: '20%'}}><Image src={order.imgSrc} style={{width: '100%'}}/></div>
      <div className="mx-4">
          <h5 className="text-center mb-3">{order.name.toUpperCase()}</h5>
          <h6 className="mb-3">{(order.price * order.count).toFixed(2)} грн.</h6>
          <div className="d-inline-block border py-2 mt-3">
              <div className='d-inline px-2 py-1 count-btn'>
                  {
                      order.count === 1 ? <DeleteBucket onClick={() => removeFromCart(order.id)}/> :
                      <ReduceCount onClick={() => reduceCount(order.id)}/>
                  }
              </div>
              <div className="d-inline px-3">{order.count}</div>
              <div className='d-inline px-2 py-1 count-btn'><AddCount onClick={() => addCount(order.id)}/></div>
      </div>
    </div>
  </ListGroup.Item>
}

export default CartItem