import { useContext, useState } from 'react';
import {Form, InputGroup, Button} from 'react-bootstrap';
import {useGetBrandsQuery} from '../../redux/brandsApi';
import { useGetProductsQuery, useAddProductMutation } from '../../redux/productsApi';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import AlertContext from '../../context/AlertContext';
import { useGetCategoriesQuery } from '../../redux/categoriesApi';
import { useForm } from "react-hook-form";

function AddProducts () {
    const {data: brands} = useGetBrandsQuery();
    const {data: categories} = useGetCategoriesQuery();
    const {data: products} = useGetProductsQuery();
    const [addProduct] = useAddProductMutation();
    const {setAlertMessage} = useContext(AlertContext);
    const {register, formState: {errors}, handleSubmit, reset} = useForm({mode: "onChange"});
    const [loading, setLoading] = useState(false);

    const date = Date.now();
    const CheckProduct = (model, brand, category, point) => products?.some(el => {
        if(el.model === model && el.brand === brand && el.category === category && el.point === point) {
            return true;
        } else return false;
    });
    const onSubmit = (data) => {
        const check = CheckProduct(data.model.toLowerCase(), data.brand, data.category, data.point);
        if(check) {
            setAlertMessage({text: 'Такий товар вже існує', variant: 'danger'});
        } else {
            new Promise(resolve => {
                if(data.img[0]) {
                    const storageRef = ref(getStorage(), data.model.toLowerCase()+'_'+data.img[0].name);
                    const uploadTask = uploadBytesResumable(storageRef, data.img[0]);
                    uploadTask.on('state_changed', (snapshot) => {
                        setLoading(true);
                    },
                    (error) => {
                        console.log(error.code);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    })});
                } else resolve('https://firebasestorage.googleapis.com/v0/b/final-59c5a.appspot.com/o/empty.jpg?alt=media&token=e3fb1551-06f2-4b6e-9571-7bc66db9c3db');
            }).then(result => {
                addProduct({
                    point: data.point,
                    category: data.category,
                    brand: data.brand,
                    model: data.model.toUpperCase(),
                    price: +data.price,
                    sale: data.sale,
                    imgSrc: result,
                    size: data.sizes,
                    addedToCart: false,
                    count: 0,
                    date: date
                }).unwrap();
                setAlertMessage({text: 'Товар успішно додано', variant: 'success'});
                reset();
                setLoading(false);
            })
        }
    }
    return <>
    <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="my-4">
            <Form.Label><h5>Призначення товару</h5></Form.Label>
            <Form.Select {...register("point", {required: true})} className={errors?.point && 'border-danger'}>
                <option value="">Оберіть призначення</option>
                <option value="Чоловікам">Чоловікам</option>
                <option value="Жінкам">Жінкам</option>
                <option value="Дітям">Дітям</option>
            </Form.Select>
            <div>{errors?.point && <p className='text-danger px-3'>Обов'язкове поле. Виберіть свій вариант</p>}</div>
        </Form.Group>
        <Form.Group className="my-4">
            <Form.Label><h5>Категорія</h5></Form.Label>
            <Form.Select {...register("category", {required: true})} className={errors?.category && 'border-danger'}>
                <option value="">Оберіть категорію</option>
                {categories?.map(el => (<option key={el.id} value={el.name.toUpperCase()}>{el.name.toUpperCase()}</option>))}
            </Form.Select>
            <div>{errors?.category && <p className='text-danger px-3'>Обов'язкове поле. Виберіть свій вариант</p>}</div>
        </Form.Group>
        <Form.Group className="my-4">
            <Form.Label><h5>Бренд</h5></Form.Label>
            <Form.Select {...register("brand", {required: true})} className={errors?.brand && 'border-danger'}>
                <option value="">Оберіть бренд</option>
                {brands?.map(el => (<option key={el.id} value={el.name.toUpperCase()}>{el.name.toUpperCase()}</option>))}
            </Form.Select>
            <div>{errors?.brand && <p className='text-danger px-3'>Обов'язкове поле. Виберіть свій вариант</p>}</div>
        </Form.Group>
        <Form.Group className="my-4">
            <Form.Label><h5>Модель</h5></Form.Label>
            <Form.Control 
                type="text" 
                placeholder="Введіть назву товару" 
                {...register("model", {required: true, minLength: 3})} 
                className={errors?.model && 'border-danger'}/>
            <div>{errors?.model && <p className='text-danger px-3'>Обов'язкове поле. Введіть назву товару, не менш ніж 3 символи</p>}</div>
        </Form.Group>
        <Form.Group className="my-4">
            <Form.Label><h5>Оберіть фото товару</h5></Form.Label>
            <Form.Control accept=".png, .jpg, .jpeg, .webp" type="file" {...register("img")} />
        </Form.Group>
        <Form.Group className="my-4">
            <Form.Label><h5>Таблиця розмірів</h5></Form.Label>
            <Form.Select {...register("sizes", {required: true})} className={errors?.sizes && 'border-danger'}>
                <option value="">Оберіть таблицю розмірів</option>
                <option value="clothSizes">Одяг</option>
                <option value="shoesSizes">Взуття</option>
            </Form.Select>
            <div>{errors?.sizes && <p className='text-danger px-3'>Обов'язкове поле. Виберіть один з вариантів</p>}</div>
        </Form.Group>
        <div className='d-flex'>
            <Form.Group className="mt-4 w-50">
                <InputGroup className="mb-3">
                    <InputGroup.Text><h5 className='m-0'>Ціна</h5></InputGroup.Text>
                    <Form.Control 
                        type="number"
                        min="1"
                        step="0.01"
                        placeholder="Введіть ціну товару" 
                        {...register("price", {required: true, min: 1})} 
                        className={errors?.price && 'border-danger'}/>
                </InputGroup>
            </Form.Group>
            <Form.Check type='checkbox' className='align-self-center mx-4'>
                <Form.Check.Input type='checkbox' {...register("sale")} />
                <Form.Check.Label><h5 className='text-danger'>Sale</h5></Form.Check.Label>
            </Form.Check>
        </div>
        <div>{errors?.price && <p className='text-danger px-3'>Обов'язкове поле. Введіть ціну більше 1</p>}</div>
        <Button variant='success' type="submit" disabled={loading ? true : false}>Додати товар</Button>
    </Form>
    </>
}

export default AddProducts;