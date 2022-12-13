import { useGetProductsQuery } from '../../redux/productsApi';
import { useState, useEffect } from 'react';
import {Row, Spinner, Container} from 'react-bootstrap';
import Product from './Product';
import ProductsFilter from './ProductsFilter';

function ProductsSale ({sale}) {
    const {data: products, isLoading, isSuccess} = useGetProductsQuery();
    const [productsToRender, setProductsToRender] = useState([]);
    
    useEffect(() => {
        if (isSuccess) setProductsToRender(products?.filter(el => el.sale === true));
    },[products]);

    return <>
    <Container>

        <ProductsFilter productsToRender ={productsToRender} setProductsToRender={setProductsToRender} sale={sale}/>

        { isLoading && <><div className='text-center my-5'><Spinner animation="border" variant="success" /></div></> }
        {productsToRender?.length ? (<><div>{`${productsToRender?.length} товарів`}</div>
        <Row>{productsToRender?.map(product => <Product key={product.id} product={product} />)}</Row></>) : 
        <Row><h4 className='text-center'>На жаль товарів не знайдено</h4></Row>}

    </Container>
    </>
}

export default ProductsSale;