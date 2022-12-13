import {useParams, Link} from "react-router-dom";
import {useEffect, useContext, useState} from "react";
import {Col, Spinner, Image, Button, Container} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {setToCart} from '../../redux/cartSlice';
import { useGetProductQuery } from "../../redux/productsApi";
import {ReactComponent as ChevroneLeft} from '../../svg/chevrone-left.svg';
import {ReactComponent as Delivery} from '../../svg/delivery.svg';
import {ReactComponent as Pay} from '../../svg/pay.svg';
import {ReactComponent as Guarantee} from '../../svg/guarantee.svg';
import {ReactComponent as Certificate} from '../../svg/certificate.svg';
import { nanoid } from 'nanoid';
import SizeTable from '../SizeTable';
import AlertContext from '../../context/AlertContext';
import '../../css/ResetLink.css';
import '../../css/SingleProduct.css';
import DeliveryInfo from "../static/DeliveryInfo";
import PayInfo from "../static/PayInfo";
import GuaranteeInfo from "../static/GuaranteeInfo";
import CertificateInfo from "../static/CertificateInfo";

function SingleProduct() {
  const {productId} = useParams();
  const {data: product, isLoading} = useGetProductQuery(productId);
  const [sizeTable, setSizeTable] = useState([]);
  const [active, setActive] = useState('');
  const [size, setSize] = useState('');
  const [infoMessage, setInfoMessage] = useState({});
  const [showInfoBlock, setShowInfoBlock] = useState('');
  const {setPoint, setAlertMessage} = useContext(AlertContext);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);

  const clothSizes = [{us: 'XS', eu: 'EUR 40/42'}, {us: 'S', eu: 'EUR 44/46'}, {us: 'M', eu: 'EUR 48/50'}, {us: 'L', eu: 'EUR 52/54'},
  {us: 'XL', eu: 'EUR 56/58'}, {us: 'XXL', eu: 'EUR 60/62'}];
  const shoesSizes = [{us: '25.5', eu: 'EUR 40.5'}, {us: '26', eu: 'EUR 41'}, {us: '26.5', eu: 'EUR 42'}, {us: '27', eu: 'EUR 42.5'},
  {us: '27.5', eu: 'EUR 43'}, {us: '28', eu: 'EUR 44'}, {us: '29', eu: 'EUR 45'}, {us: '29.5', eu: 'EUR 45.5'}, {us: '30', eu: 'EUR 46'}];

  
  useEffect(() => {
    setSizeTable(product?.size === 'shoesSizes' ? shoesSizes : clothSizes);
  }, [product]);

  const handleClick = (event) => {
    setActive(event.currentTarget.dataset.value);
    setSize(event.currentTarget.dataset.value);
    setInfoMessage({});
  }

  const showInfo = (e) => {
    Array.prototype.forEach.call(document.getElementsByClassName('info-btn'), el => {
        el.classList.remove('info-btn-active');
    })
    setShowInfoBlock(e.dataset.value);
    document.getElementById(e.dataset.value).classList.add('info-btn-active');
  }

  const addToCart = () => {
    if(!size) {
        setAlertMessage({text: 'Виберіть розмір', variant: 'danger'});
        setInfoMessage({text: 'Виберіть розмір', style: 'danger'});
    } else {
        const id = nanoid(5);
        const order = {
            id: id,
            imgSrc: product.imgSrc,
            name: product.brand+' '+product.model,
            price: +product.price,
            size: size,
            count: 1
        };
        dispatch(setToCart([...cart, order]));
        localStorage.setItem('cart', JSON.stringify([...cart, order]));
        setAlertMessage({text: 'Товар додано у кошик', variant: 'success'});
        setInfoMessage({text: 'Товар додано у кошик', style: 'success'});
    }

  }
  if(isLoading) {
    return <><div className='text-center my-5'><Spinner animation="border" variant="success" /></div></>
    }  
  return <><Container>
    <span className='m-3'>
        <Link to="/" className="resetLink"><h6><ChevroneLeft /> На головну</h6></Link>
        <Link className="resetLink" onClick={() => setPoint(product.point)} to="/products"><h6 className="px-2">
            <ChevroneLeft />{product.point}</h6></Link>
    </span>
    <Col xs={12}>
        <div className="d-flex py-4 product-box">
            <div style={{width: "50%"}} className="product-img">
                <Image style={{width: "100%"}} src={product.imgSrc} />
            </div>
            <div className="px-5 w-50 product-info">
                <h2 className="text-capitalize text-center">{product.category+' '+product.brand+' '+product.model}</h2>
                <div className="text-center py-4 custom-price text-secondary">{'Ціна '+product.price.toFixed(2)+' грн'}</div>
                <div><h5>Таблиця Розмірів</h5></div>
                <div className="d-flex flex-wrap sizeTable">
                    {sizeTable.map((sizes, index) => <SizeTable key={index} sizes={sizes} active={active} handleClick={handleClick}/>)}
                </div>
                <div className="text-center m-5">
                    <Button variant="success" size="lg" onClick={addToCart}>Додати в кошик</Button>
                    {infoMessage ? <p className={`text-${infoMessage.style}`}>{infoMessage.text}</p> : ''}
                </div>
                <div className="d-flex my-4 info-block">
                    <div className="info-block-item px-2 w-25" data-value='delivery' onClick={(e) => showInfo(e.currentTarget)}>
                        <div className="text-center"><Delivery /></div>
                        <div className="text-center">Безкоштовна доставка</div>
                    </div>
                    <div className="info-block-item px-2 w-25" data-value='pay' onClick={(e) => showInfo(e.currentTarget)}>
                        <div className="text-center"><Pay /></div>
                        <div className="text-center">Зручна оплата</div>
                    </div>
                    <div className="info-block-item px-2 w-25" data-value='guarantee' onClick={(e) => showInfo(e.currentTarget)}>
                        <div className="text-center"><Guarantee /></div>
                        <div className="text-center">Гарантія повернення</div>
                    </div>
                    <div className="info-block-item px-2 w-25" data-value='certificate' onClick={(e) => showInfo(e.currentTarget)}>
                        <div className="text-center"><Certificate /></div>
                        <div className="text-center">Оригінальні товари</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="d-flex align-center justify-content-center flex-wrap">
            <div className="m-3 custom-tabs info-btn" data-value='delivery' id="delivery" onClick={(e) => showInfo(e.target)}>Delivery</div>
            <div className="m-3 custom-tabs info-btn" data-value='pay' id="pay" onClick={(e) => showInfo(e.target)}>Pay</div>
            <div className="m-3 custom-tabs info-btn" data-value='guarantee' id="guarantee" onClick={(e) => showInfo(e.target)}>Guarantee</div>
            <div className="m-3 custom-tabs info-btn" data-value='certificate' id="certificate" onClick={(e) => showInfo(e.target)}>Certificate</div>
        </div>
        <div>
            <div className={`${showInfoBlock === 'delivery' ? 'd-block' : 'd-none'}`}><DeliveryInfo/></div>
            <div className={`${showInfoBlock === 'pay' ? 'd-block' : 'd-none'}`}><PayInfo/></div>
            <div className={`${showInfoBlock === 'guarantee' ? 'd-block' : 'd-none'}`}><GuaranteeInfo/></div>
            <div className={`${showInfoBlock === 'certificate' ? 'd-block' : 'd-none'}`}><CertificateInfo/></div>
        </div>
    </Col>
    </Container>
    </>
}

export default SingleProduct;