import {useParams, Navigate} from "react-router-dom";
import { useContext, useState } from "react";
import {Form, InputGroup, Button, Spinner, Image, Container} from 'react-bootstrap';
import { useEditProductMutation, useGetProductQuery, useGetProductsQuery } from "../../redux/productsApi";
import { useGetCategoriesQuery } from '../../redux/categoriesApi';
import {useGetBrandsQuery} from '../../redux/brandsApi';
import { useForm } from "react-hook-form";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import AlertContext from '../../context/AlertContext';

function AddProducts () {
    const {productId} = useParams();
    const {data: product, isLoading} = useGetProductQuery(productId);
    const {data: categories} = useGetCategoriesQuery();
    const {data: brands} = useGetBrandsQuery();
    const {data: products} = useGetProductsQuery();
    const [editProduct] = useEditProductMutation();
    const {setAlertMessage} = useContext(AlertContext);
    const {register, formState: {errors}, handleSubmit} = useForm({mode: "onChange"});
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const CheckProduct = (model, brand, category, point, price) => products.record?.some(el => {
        if(el.model === model && el.brand === brand && el.category === category && el.point === point && el.price === price) {
            return true;
        } else return false;
    });
    const onSubmit = (data) => {
        const check = CheckProduct(data.model.toUpperCase(), data.brand, data.category, data.point, +data.price);
        if(check && !data.img[0]) {
            setAlertMessage({text: 'Такий товар вже існує', variant: 'danger'});
        } else {
            new Promise(resolve => {
                if(data.img[0]) {
                    const storageRef = ref(getStorage(), data.model.toLowerCase()+'_'+data.img[0].name);
                    const uploadTask = uploadBytesResumable(storageRef, data.img[0]);
                    uploadTask.on('state_changed', (snapshot) => {
                        setLoading(true);
                        }, (error) => {
                            console.log(error.code);
                        }, () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    })})
                } else resolve(data.imgSrc)
            }).then(result => {
                const id = productId;
                editProduct({id, 
                    point: data.point,
                    category: data.category,
                    brand: data.brand,
                    model: data.model.toUpperCase(),
                    price: +data.price,
                    sale: data.sale,
                    imgSrc: result,
                    size: data.sizes
                
                }).unwrap();
                setAlertMessage({text: 'Товар успішно змінено', variant: 'success'});
                setSuccess(true);
            })
        }
    }

    if(isLoading) {
        return <><div className='text-center my-5'><Spinner animation="border" variant="success" /></div></>
    }  
    return <>
    <Container>
        <div className="w-50 mt-4 mx-auto">
            <h4 className="text-center">{'Змінити товар '+product?.brand.toUpperCase()+' '+product?.model.toUpperCase()}</h4>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="my-4">
                    <Form.Label><h5>Призначення товару</h5></Form.Label>
                    <Form.Select {...register("point", {required: true})}>
                        <option value={product?.point}>{product?.point}</option>
                        <option value="Чоловікам">Чоловікам</option>
                        <option value="Жінкам">Жінкам</option>
                        <option value="Дітям">Дітям</option>
                    </Form.Select>
                    <div>{errors?.point && <p className='text-danger px-3'>Обов'язкове поле. Виберіть свій вариант</p>}</div>
                </Form.Group>
                <Form.Group className="my-4">
                    <Form.Label><h5>Категорія</h5></Form.Label>
                    <Form.Select {...register("category", {required: true})}>
                        <option value={product?.category}>{product?.category.toUpperCase()}</option>
                        {categories?.record?.map(el => (<option className='text-capitalize' key={el.id} value={el.name}>{el.name}</option>))}
                    </Form.Select>
                    <div>{errors?.category && <p className='text-danger px-3'>Обов'язкове поле. Виберіть свій вариант</p>}</div>
                </Form.Group>
                <Form.Group className="my-4">
                    <Form.Label><h5>Бренд</h5></Form.Label>
                    <Form.Select {...register("brand", {required: true})}>
                        <option value={product?.brand}>{product?.brand.toUpperCase()}</option>
                        {brands?.record?.map(el => (<option className='text-capitalize' key={el.id} value={el.name}>{el.name}</option>))}
                    </Form.Select>
                    <div>{errors?.brand && <p className='text-danger px-3'>Обов'язкове поле. Виберіть свій вариант</p>}</div>
                </Form.Group>
                <Form.Group className="my-4">
                    <Form.Label><h5>Модель</h5></Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={product?.model}
                        {...register("model", {required: true, minLength: 3})}
                        className={errors?.model && 'border-danger'}/>
                    <div>{errors?.model && <p className='text-danger px-3'>Обов'язкове поле. Введіть назву товару, не менш ніж 3 символи</p>}</div>
                </Form.Group>
                <div className="d-flex">
                    <div style={{width: "20%"}}><Image style={{width: "100%"}} src={product.imgSrc}/></div>
                    <Form.Group className="px-4">
                        <Form.Label><h5>Оберіть нове фото товару</h5></Form.Label>
                        <Form.Control accept=".png, .jpg, .jpeg, .webp" type="file" {...register("img")} />
                    </Form.Group>
                </div>
                <Form.Group className="my-4">
                    <Form.Label><h5>Таблиця розмірів</h5></Form.Label>
                    <Form.Select {...register("sizes", {required: true})} className={errors?.sizes && 'border-danger'}>
                        <option value={product?.size}>{product?.size}</option>
                        <option value="clothSizes">Одяг</option>
                        <option value="shoesSizes">Взуття</option>
                    </Form.Select>
                    <div>{errors?.sizes && <p className='text-danger px-3'>Обов'язкове поле. Виберіть один з вариантів</p>}</div>
                </Form.Group>
                <div className='d-flex'>
                    <Form.Group className="mt-4">
                        <InputGroup className="mb-3">
                            <InputGroup.Text><h5 className='m-0'>Ціна</h5></InputGroup.Text>
                            <Form.Control type="number" min="1" defaultValue={product?.price} {...register("price", {required: true})}/>
                        </InputGroup>
                    </Form.Group>
                    <Form.Check type='checkbox' className='align-self-center mx-4'>
                        <Form.Check.Input type='checkbox' defaultChecked={product?.sale ? true : false} {...register("sale")} />
                        <Form.Check.Label><h5 className='text-danger'>Sale</h5></Form.Check.Label>
                    </Form.Check>
                </div>
                <div>{errors?.price && <p className='text-danger px-3'>Обов'язкове поле. Введіть ціну більше 1</p>}</div>
                <Button variant='success' type="submit" disabled={loading ? true : false} >Змінити дані товару</Button>
            </Form>
        </div>
        {success ? <Navigate to='/products' /> : ''}
    </Container>
    </>
}

export default AddProducts;