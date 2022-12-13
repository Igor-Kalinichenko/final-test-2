import {useGetCategoriesQuery} from '../../redux/categoriesApi';
import { useGetProductsQuery } from '../../redux/productsApi';
import { useState, useEffect, useContext } from 'react';
import {NavDropdown, Nav, Form, Button} from 'react-bootstrap';
import {ReactComponent as Search} from '../../svg/search.svg';
import {ReactComponent as ShortArrow} from '../../svg/short-arrow.svg';
import AlertContext from '../../context/AlertContext';
import '../../css/ResetLink.css';

function ProductsFilter ({ productsToRender, setProductsToRender, novelty, sale, point }) {

    const {data: products} = useGetProductsQuery();
    const {data: categories} = useGetCategoriesQuery();
    const [filteredBySale, setFilteredBySale] = useState(false);
    const [beforeSale, setBeforeSale] = useState([]);
    const [category, setCategory] = useState('');
    const {setPoint, setSale, setNovelty} = useContext(AlertContext);

    const dateNow = Date.now();
    const thirtyDaysAgo = dateNow - 2592000000;

    useEffect(() => {
        setCategory('');
    },[point]);

    const filterCurrentBySale = () => {
        if(!filteredBySale) {
            setBeforeSale(productsToRender);
            setProductsToRender(productsToRender?.filter(el => el.sale === true));
            setFilteredBySale(true);
        } else {
            setProductsToRender(beforeSale);
            setFilteredBySale(false);
        }
    }

    const SortByLowerPrice = () => {
        const sortedProducts = productsToRender.slice().sort((a, b) => a.price - b.price);
        setProductsToRender(sortedProducts);
    }
    const SortByHigherPrice = () => {
        const sortedProducts = productsToRender.slice().sort((a, b) => b.price - a.price);
        setProductsToRender(sortedProducts);
    }

    const FilterByCategory = (category) => {
        setFilteredBySale(false);
        setCategory(category);
        if(novelty) {
            setProductsToRender(products?.filter(el => el.date > thirtyDaysAgo)
            .filter(el => el.category.toLowerCase() === category.toLowerCase()));
        }
        if(sale) {
            setProductsToRender(products?.filter(el => el.sale === sale)
            .filter(el => el.category.toLowerCase() === category.toLowerCase()));
        }
        if(point) {
            setProductsToRender(products?.filter(el => el.point === point)
            .filter(el => el.category.toLowerCase() === category.toLowerCase()));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const search = (e) => {
        setCategory('');
        setFilteredBySale(false);
        let searchValue = e.currentTarget.value.toLowerCase().trim();
        if(novelty) {
            setProductsToRender(products?.filter(el => el.date > thirtyDaysAgo)
            .filter(el => el.model?.toLowerCase().includes(searchValue)));
        }
        if(sale) {
            setProductsToRender(products?.filter(el => el.sale === true)
            .filter(el => el.model?.toLowerCase().includes(searchValue)));
        }
        if(point) {
            setProductsToRender(products?.filter(el => el.point === point)
            .filter(el => el.model?.toLowerCase().includes(searchValue)));
        }
    }

    const AllProducts = () => {
        setProductsToRender(products);
        setFilteredBySale(false);
        setCategory('');
        setPoint('');
        setNovelty(false);
        setSale(false);
    }

    return <>

    <div className='mt-3 d-inline-block'>
        <h6 className='text-uppercase' onClick={AllProducts}><span className='all-products'>Усі товари </span>
        <ShortArrow /> {point || ''} {sale ? 'SALE' : ''} {novelty ? 'Новинки' : ''}</h6>
    </div>

    <div className='d-flex flex-wrap align-items-center'>
        <Nav.Link onClick={filterCurrentBySale} className={`${!filteredBySale ? 'bg-secondary' : 'bg-danger'} mx-2 px-3 py-2 text-light`}>SALE</Nav.Link>
        
        <NavDropdown title="Сортування" className='mx-2 p-2 bg-secondary text-light'>
            <NavDropdown.Item onClick={SortByLowerPrice}>Спочатку дешевші</NavDropdown.Item>
            <NavDropdown.Item onClick={SortByHigherPrice}>Спочатку дорожчі</NavDropdown.Item>
        </NavDropdown>

        <NavDropdown title={`${category ? category : 'Категорії'}`} className='mx-2 p-2 bg-secondary text-light text-capitalize'>
            {categories?.map(el => <NavDropdown.Item 
                                        className='text-capitalize' 
                                        key={el.id} 
                                        onClick={() => FilterByCategory(el.name)}>
                                    {el.name}</NavDropdown.Item>)}
        </NavDropdown>

        <Form onSubmit={handleSubmit} className='my-5 mx-2 d-flex position-relative'>
            <Form.Control
                className='border-success'
                style={{paddingRight: '3rem'}}
                type='search' name='search'
                onKeyUp={(e) => search(e)}
                placeholder='Пошук' />
            <Button variant='success' type='submit' className='position-absolute border-0' style={{left: '12.1rem'}}><Search /></Button>
        </Form>
    </div>
    </>
}

export default ProductsFilter;