import CarouselCards from "./CarouselCards";
import CarouselSale from "./CarouselSale";
import CarouselImages from './CarouselImages';
import forWomenShoes from './images/forWomenShoes.jpeg';
import forWomenClothes from './images/forWomenClothes.jpeg';
import forMenShoes from './images/forMenShoes.jpeg';
import forMenClothes from './images/forMenClothes.jpeg';
import '../../css/Home.css'
import { Link } from "react-router-dom";
import AlertContext from '../../context/AlertContext';
import { useContext } from 'react';
import { Container } from "react-bootstrap";


function Home () {
    const {setPoint} = useContext(AlertContext);
    return <>
    <CarouselImages />
    <Container>
        <h2 className="text-center mt-5 mb-3 text-uppercase">Наші Новинки</h2>
        <CarouselCards/>
        <h2 className="text-center mt-5 mb-3 text-uppercase">MEGASPORT - ОФІЦІЙНИЙ ІНТЕРНЕТ-МАГАЗИН</h2>
        <div className="d-flex justify-content-between flex-wrap">
            <div className="shoesImg mt-4">
                <img src={forWomenShoes} alt='Shoes for women'/>
            </div>
            <div className="clothImg mt-4 position-relative">
            <Link onClick={() => setPoint('Жінкам')} to="products"><img src={forWomenClothes} alt='clothes for women'/></Link>
                <div className="position-absolute" style={{color: '#c67ba7'}}>Товари Для Жінок</div>
            </div>
            <div className="shoesImg mt-4">
                <img src={forMenShoes} alt='Shoes for men'/>
            </div>
            <div className="clothImg mt-4 position-relative">
            <Link onClick={() => setPoint('Чоловікам')} to="products"><img src={forMenClothes} alt='clothes for men'/></Link>
                <div className="position-absolute" style={{color: '#3e4369'}}>Товари Для Чоловіків</div>
            </div>
        </div>
        <h2 className="text-center mt-5 mb-3 text-uppercase">Розпродаж</h2>
        <div className="mx-auto">
            <CarouselSale/>
        </div>
    </Container>
    </>
}

export default Home;