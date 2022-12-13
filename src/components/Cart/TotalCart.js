import {ListGroup} from 'react-bootstrap';
import {useEffect, useState} from "react";

function TotalCart({orders}) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(orders.reduce((acc, order) => acc + (order.price * order.count), 0));
  }, [orders]);

  return <><ListGroup.Item className='d-flex justify-content-between'>
    <h4>До сплати:</h4>
    <h4>{total.toFixed(2)} грн.</h4>
    </ListGroup.Item></>
}

export default TotalCart;