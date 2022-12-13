import {ReactComponent as Search} from '../svg/search.svg';
import {Button, Form} from 'react-bootstrap';
import '../css/Header.css';
import { useState, useEffect } from 'react';

function SearchForm ({setProductsToRender, productsToRender}) {
    const [productsBeforeSearch, setProductsBeforeSearch] = useState(productsToRender);

    useEffect(() => {
        setProductsBeforeSearch(productsToRender);
        console.log(productsToRender);
        console.log(productsBeforeSearch);
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const search = (e) => {
        let searchValue = e.currentTarget.value.toLowerCase().trim();
        let filteredProducts = productsBeforeSearch?.filter(el => el.model?.toLowerCase().includes(searchValue));
        setProductsToRender(filteredProducts);
    }
    return <>
        <Form onSubmit={handleSubmit} className='my-5 mx-2 d-flex position-relative'>
            <Form.Control
                className='border-success'
                style={{paddingRight: '3rem'}}
                type='search' name='search'
                onKeyUp={(e) => search(e)}
                placeholder='Пошук' />
                <input type="submit" value="Search" className='d-none' />
            <Button variant='success' type='submit' className='position-absolute border-0' style={{left: '12.1rem'}}><Search /></Button>
        </Form>
    
    </>
}

export default SearchForm;