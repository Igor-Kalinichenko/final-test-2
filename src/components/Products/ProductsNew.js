import { useGetProductsQuery } from '../../redux/productsApi';
import { useState, useEffect } from 'react';
import {Row, Spinner, Container} from 'react-bootstrap';
import Product from './Product';
import ProductsFilter from './ProductsFilter';

function ProductsNew ({novelty}) {
    const {data: products, isLoading, isSuccess} = useGetProductsQuery();
    const [productsToRender, setProductsToRender] = useState([]);

    const dateNow = Date.now();
    const thirtyDaysAgo = dateNow - 2592000000;

    useEffect(() => {
        if (isSuccess) setProductsToRender(products?.filter(el => el.date > thirtyDaysAgo));
    },[products]);

    return <>
    <Container>

        <ProductsFilter productsToRender ={productsToRender} setProductsToRender={setProductsToRender} novelty={novelty}/>

        { isLoading && <><div className='text-center my-5'><Spinner animation="border" variant="success" /></div></> }
        {productsToRender?.length ? (<><div>{`${productsToRender?.length} товарів`}</div>
        <Row>{productsToRender?.map(product => <Product key={product.id} product={product} />)}</Row></>) : 
        <Row><h4 className='text-center'>На жаль товарів не знайдено</h4></Row>}

    </Container>
    </>
}

export default ProductsNew;