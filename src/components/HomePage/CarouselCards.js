import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useGetProductsQuery } from '../../redux/productsApi';
import {Card, Spinner, Button, Badge} from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../../css/Products.css';

function CarouselCards () {
    const {data: products, isLoading, isSuccess} = useGetProductsQuery();
    
    const dateNow = Date.now();
    const thirtyDaysAgo = dateNow - 2592000000;

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
          slidesToSlide: 4 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
    return <>
    { isLoading && <><div className='text-center my-5'><Spinner animation="border" variant="success" /></div></> }
    { isSuccess && 
    <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
    >
        {products?.filter(el => el.date > thirtyDaysAgo).map(product => <div key={product.id}><Card className='mx-1 position-relative card-hover'>
        <Card.Img variant="top" src={product.imgSrc} />
        <Card.Body className="">
            <div className='position-absolute' style={{top: '.5rem', left: '0rem'}}>
                {product.sale ? <Badge style={{marginLeft: '0.5rem'}} bg="danger">SALE</Badge> : ''}
                <Badge style={{marginLeft: '0.5rem'}} bg="success">NEW</Badge>
            </div>
            <Card.Title className='text-capitalize'>
                <Link to={`products/${product.id}`} className='resetLinkCard'>
                    <span className='text-capitalize'>{product.category} </span> 
                    <span className='text-capitalize'>{product.brand} </span> 
                    {product.model}</Link></Card.Title>
            <Card.Text className='text-dark text-end'><b>{product.price.toFixed(2)} UAH</b></Card.Text>
        </Card.Body>
        <Link to={`products/${product.id}`} className='resetLinkCard'>
            <Button variant="success" className="w-100">Переглянути</Button>
        </Link>
    </Card>  </div>)}
</Carousel>}
    </>
}

export default CarouselCards;