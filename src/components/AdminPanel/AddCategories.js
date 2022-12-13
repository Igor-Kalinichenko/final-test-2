import { useState, useRef, useContext } from 'react';
import { useGetCategoriesQuery, useAddCategoryMutation, useDeleteCategoryMutation, useEditCategoryMutation } from '../../redux/categoriesApi';
import {Form, Button, ListGroup, Tooltip, OverlayTrigger, Toast} from 'react-bootstrap';
import {ReactComponent as Edit} from '../../svg/edit.svg';
import {ReactComponent as Delete} from '../../svg/delete.svg';
import AlertContext from '../../context/AlertContext';
import { useEditProductMutation, useGetProductsQuery } from '../../redux/productsApi';

function AddCategories () {
    const {data = []} = useGetCategoriesQuery();
    const {data: products} = useGetProductsQuery();
    const [addCategory] = useAddCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();
    const [editCategory] = useEditCategoryMutation();
    const [editProduct] = useEditProductMutation();
    const categoryRef = useRef(null);
    const [updateCategory, setUpdateCategory] = useState('');
    const [toast, setToast] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showA, setShowA] = useState(true);
    const [error, setError] = useState(false);
    const {setAlertMessage} = useContext(AlertContext);

    const toggleShowA = id => setToast(id);
    const CheckName = name => data.some(el => el.name === name.toLowerCase());
    const addNewCategory = async () => {
        let check = CheckName(categoryRef.current.value);
        if(categoryRef.current.value && !check) {
          await addCategory({name: categoryRef.current.value.toLowerCase()}).unwrap();
          setAlertMessage({text: 'Категорію успішно додано', variant: 'success'});
          categoryRef.current.value = '';
          setError(false);
        } else {
            setError(true);
            setErrorMessage(check ? 'Така назва вже існує' : 'Заповніть поле');
        }
    }
    const deleteBtn = async (id) => {
        const oldCategoryName = data.filter(el => el.id === id)[0].name;
        const categoryProductsToEdit = products.filter(el => el.category === oldCategoryName);
        await deleteCategory(id).unwrap();
        categoryProductsToEdit.map(el => setAllCategoriesInProducts(el.id));
        setAlertMessage({text: 'Категорію видалено', variant: 'danger'});
    }
    const editBtn = async (id) => {
        let check = CheckName(updateCategory);
        if(updateCategory && !check) {
            const oldCategoryName = data.filter(el => el.id === id)[0].name;
            await editCategory({id, name: updateCategory.toLowerCase()}).unwrap();
            const categoryProductsToEdit = products.filter(el => el.category === oldCategoryName);
            categoryProductsToEdit.map(el => setNewCategoryInProducts(el.id));
            setUpdateCategory('');
            setAlertMessage({text: 'Категорію змінено', variant: 'success'});
        } else if(check) {
            setAlertMessage({text: 'Така назва вже існує', variant: 'danger'});
            setUpdateCategory('');
        }
    }
    const setNewCategoryInProducts = async (id) => {
        await editProduct({id, category: updateCategory.toLowerCase()}).unwrap();
    }
    const setAllCategoriesInProducts = async (id) => {
        await editProduct({id, category: 'Всі'}).unwrap();
    }
    return <>
    <h3 className='text-center'>Всі Категорії</h3>
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
                    value={updateCategory}
                    onChange={(e) => setUpdateCategory(e.target.value)}
                    placeholder="Введіть нову назву бренду"/>
                <Button size="sm" onClick={(e) => editBtn(el.id)}>Змінити</Button>
            </Toast>
            <div>
                <OverlayTrigger
                    key='bottom'
                    placement='bottom'
                    overlay={<Tooltip id={`tooltip-bottom`}>Edit</Tooltip>}>
                    <Edit className='mx-3 customIcon' onClick={() => toggleShowA(el.id)}/>
                </OverlayTrigger>
                <OverlayTrigger
                    placement='bottom'
                    overlay={<Tooltip id={`tooltip-bottom`}>Delete</Tooltip>}>
                    <Delete 
                        className='customIcon' 
                        onClick={() => deleteBtn(el.id)}
                        data-toggle="tooltip"
                        title="Delete" />
                </OverlayTrigger>
            </div>
        </ListGroup.Item>
        ))}
    </ListGroup>
    <Form.Group className="my-4">
        <Form.Label><h5>Додайте Категорію</h5></Form.Label>
        <Form.Control
            className={error ? 'border-danger' : ''}
            type="text"
            ref={categoryRef}
            placeholder="Введіть назву категорії"
            required />
        <div className={error ? 'd-block text-danger' : 'd-none'}>{errorMessage}</div>
    </Form.Group>
    <Button variant='primary' type='button' onClick={addNewCategory}>Додати</Button>
    </>
}

export default AddCategories;