import { useGetProductsQuery } from '../../redux/productsApi';
import {Row, Spinner, Container} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Product from './Product';
import ProductsFilter from './ProductsFilter';
import '../../css/Products.css';

function Products ({point}) {
    const {data: products, isLoading, isSuccess} = useGetProductsQuery();
    const [productsToRender, setProductsToRender] = useState([]);

    useEffect(() => {
        if (point) setProductsToRender(products?.filter(el => el.point === point));
        else setProductsToRender(products);      
    },[isLoading, products]);

    useEffect(() => {
        if(point.length && isSuccess) {
            setProductsToRender(products?.filter(el => el.point === point));
        }
    },[point]);
    
    
    return <>
    <Container>
    
        <ProductsFilter productsToRender ={productsToRender} setProductsToRender={setProductsToRender} point={point} />

        { isLoading && <><div className='text-center my-5'><Spinner animation="border" variant="success" /></div></> }
        {productsToRender?.length ? (<><div>{`${productsToRender?.length} товарів`}</div>
        <Row>{productsToRender?.map(product => <Product key={product.id} product={product} />)}</Row></>) : 
        <Row><h4 className='text-center'>На жаль товарів не знайдено</h4></Row>}
    </Container>
    </>
}

export default Products;