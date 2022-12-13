import {Col, Card, Badge, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {Link} from "react-router-dom";
import { useContext } from 'react';
import {useAuth} from '../../hooks/useAuth';
import AlertContext from '../../context/AlertContext';
import {ReactComponent as Edit} from '../../svg/edit.svg';
import {ReactComponent as Delete} from '../../svg/delete.svg';
import { useDeleteProductMutation } from '../../redux/productsApi';
import '../../css/ResetLink.css';
import '../../css/Products.css';

function Product ({product}) {
    const {role} = useAuth();
    const [deleteProduct] = useDeleteProductMutation();
    const {setAlertMessage} = useContext(AlertContext);

    const dateNow = Date.now();
    const oneDay = 1000 * 60 * 60 * 24;

    const deleteBtn = async (id) => {
        const conf = window.confirm('Ви впевнені що хочете видалити товар?');
        if(conf) {
            await deleteProduct(id).unwrap();
            setAlertMessage({text: 'Товар видалено', variant: 'danger'});
        }
    }

    return <><Col xs={12} sm={6} md={4} lg={3}>
    <Card className='mb-3 position-relative card-hover'>
        <Card.Img variant="top" src={product.imgSrc} />
        <Card.Body>
            <div className='position-absolute' style={{top: '.5rem', left: '0rem'}}>
                {product.sale ? <Badge style={{marginLeft: '0.5rem'}} bg="danger">SALE</Badge> : ''}
                {Math.round((dateNow - product.date) / oneDay)<30 ? <Badge style={{marginLeft: '0.5rem'}} bg="success">NEW</Badge> : ''}
            </div>

            {role === 'admin' && <>
            <Link to={`/products/${product.id}/edit-product`}>
                <OverlayTrigger placement='bottom' overlay={<Tooltip>Edit</Tooltip>}>
                    <Edit className='position-absolute edit-product' style={{top: '.5rem', right: '2rem'}}/>
                </OverlayTrigger>
            </Link>
        <OverlayTrigger placement='bottom' overlay={<Tooltip>Delete</Tooltip>}>
            <Delete onClick={() => deleteBtn(product.id)} className='position-absolute delete-product' style={{top: '.5rem', right: '.5rem'}}/>
        </OverlayTrigger></>}

            <Card.Title className='text-capitalize'>
                <Link to={`/products/${product.id}`} className='resetLinkCard'>
                    <span className='text-capitalize'>{product.category} </span> 
                    <span className='text-capitalize'>{product.brand} </span> 
                    {product.model}</Link></Card.Title>
            <Card.Text className='text-dark text-end'><b>{product.price.toFixed(2)} UAH</b></Card.Text>
        </Card.Body>
    </Card>
  </Col></>
}

export default Product;