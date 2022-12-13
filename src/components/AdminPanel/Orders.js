import { useDeleteOrderMutation, useGetOrdersQuery } from "../../redux/ordersApi";

import {Table, Button} from 'react-bootstrap';

function Orders () {
    const {data: orders} = useGetOrdersQuery();
    const [deleteOrders] = useDeleteOrderMutation();

    const deleteOrder = async(id) => {
        const conf = window.confirm('Видалити замовлення?');
        if(conf) {
            await deleteOrders(id).unwrap();
        }
    }

    return <>
    {orders?.map((customer, index) => 
        <div key={customer.id}><div className="mt-4"><b>Замовлення {index+1}</b></div>
        <div className="border border-primary">
        <div className='d-flex p-2'>
            <div>Замовник:<br/>Контаки Замовника:<br/>Місто доставки:</div>
            <div className="px-4"><b>{customer.customerName}<br/>{customer.customerPhone} {customer.customerEmail}<br/>{customer.deliverCity}</b></div>
        </div>
        <Table bordered size="sm">
            <thead><tr>
                <th>№</th>
                <th>Замовлення</th>
                <th>Кількість</th>
                <th>Ціна</th>
            </tr></thead>
            <tbody>
                {customer.orders?.map((order, ind) => 
                    <tr key={order.id}>
                        <td>{ind+1}</td>
                        <td>{order.name}</td>
                        <td>{order.count}</td>
                        <td>{order.price.toFixed(2)} грн.</td>
                    </tr>)}
            </tbody>
        </Table>
        <div><Button
            variant='primary'
            size="sm"
            type="button"
            style={{width: '100%'}}
            onClick={() => deleteOrder(customer.id)}>Виконано</Button>
        </div>
    </div></div>
    )}
    </>
}

export default Orders;