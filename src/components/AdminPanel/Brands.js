import { useState, useRef, useContext } from 'react';
import { useGetBrandsQuery, useAddBrandMutation, useDeleteBrandMutation, useEditBrandMutation } from '../../redux/brandsApi';
import {Form, Button, ListGroup, Tooltip, OverlayTrigger, Toast} from 'react-bootstrap';
import {ReactComponent as Edit} from '../../svg/edit.svg';
import {ReactComponent as Delete} from '../../svg/delete.svg';
import AlertContext from '../../context/AlertContext';
import { useEditProductMutation, useGetProductsQuery } from '../../redux/productsApi';

function Brand () {
    const {data = []} = useGetBrandsQuery();
    const {data: products} = useGetProductsQuery();
    const [addBrand] = useAddBrandMutation();
    const [deleteBrand] = useDeleteBrandMutation();
    const [editBrand] = useEditBrandMutation();
    const [editProduct] = useEditProductMutation();
    const brandRef = useRef(null);
    const [updateBrand, setUpdateBrand] = useState('');
    const [toast, setToast] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showA, setShowA] = useState(true);
    const [error, setError] = useState(false);
    const {setAlertMessage} = useContext(AlertContext);

    const toggleShowA = id => setToast(id);
    
    const CheckName = name => data.some(el => el.name === name.toLowerCase());

    const addNewBrand = async () => {
        let check = CheckName(brandRef.current.value);
        if(brandRef.current.value && !check) {

          await addBrand({name: brandRef.current.value.toLowerCase()}).unwrap();
          setAlertMessage({text: 'Бренд успішно додано', variant: 'success'});
          brandRef.current.value = '';
          setError(false);
        } else {
            setError(true);
            setErrorMessage(check ? 'Така назва вже існує' : 'Заповніть поле');
        }
    }
    const deleteBtn = async (id) => {
        const oldBrandName = data.filter(el => el.id === id)[0].name;
        const brandProductsToEdit = products.filter(el => el.brand === oldBrandName);
        await deleteBrand(id).unwrap();
        brandProductsToEdit.map(el => setEmptyBrandInProducts(el.id));
        setAlertMessage({text: 'Бренд видалено', variant: 'danger'});
    }
    const editBtn = async (id) => {
        let check = CheckName(updateBrand);
        if(updateBrand && !check) {
            const oldBrandName = data.filter(el => el.id === id)[0].name;
            await editBrand({id, name: updateBrand.toLowerCase()}).unwrap();
            const brandProductsToEdit = products.filter(el => el.brand === oldBrandName);
            brandProductsToEdit.map(el => setNewBrandInProducts(el.id));
            setUpdateBrand('');
            setAlertMessage({text: 'Бренд змінено', variant: 'success'});
        } else if(check) {
            setAlertMessage({text: 'Така назва вже існує', variant: 'danger'});
            setUpdateBrand('');
        }
    }
    const setNewBrandInProducts = async (id) => {
        await editProduct({id, brand: updateBrand.toLowerCase()}).unwrap();
    }
    const setEmptyBrandInProducts = async (id) => {
        await editProduct({id, brand: ''}).unwrap();
    }
    return <>
    <h3 className='text-center'>Всі Бренди</h3>
    <ListGroup className='my-4'>
        {data.map(el => (
        <ListGroup.Item 
          className='d-flex justify-content-between' 
          variant="secondary" 
          key={el.id}>
            <div className='text-uppercase customList'>{el.name}</div>
            <Toast show={el.id === toast ? showA : !showA} onClose={toggleShowA} className='d-flex toast border-0'>
                <Form.Control size="sm"
                    className='border-0'
                    type="text" 
                    value={updateBrand}
                    onChange={(e) => setUpdateBrand(e.target.value)}
                    placeholder="Введіть нову назву бренду"/>
                <Button size="sm" onClick={(e) => editBtn(el.id)}>Змінити</Button>
            </Toast>
            <div>
                <OverlayTrigger placement='bottom' overlay={<Tooltip>Edit</Tooltip>}>
                    <Edit className='mx-3 customIcon' onClick={() => toggleShowA(el.id)}/>
                </OverlayTrigger>
                <OverlayTrigger placement='bottom' overlay={<Tooltip>Delete</Tooltip>}>
                    <Delete className='customIcon' onClick={() => deleteBtn(el.id)}/>
                </OverlayTrigger>
            </div>
        </ListGroup.Item>
        ))}
    </ListGroup>
    <Form.Group className="my-4">
        <Form.Label><h5>Додайте бренд</h5></Form.Label>
        <Form.Control
            className={error ? 'border-danger' : ''}
            type="text"
            ref={brandRef}
            placeholder="Введіть назву бренду"
            required />
        <div className={error ? 'd-block text-danger' : 'd-none'}>{errorMessage}</div>
    </Form.Group>
    <Button variant='primary' type='button' onClick={addNewBrand}>Додати</Button>
    </>
}

export default Brand;