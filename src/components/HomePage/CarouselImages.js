import Carousel from 'react-bootstrap/Carousel';
import slider1 from './images/slider1.webp';
import slider2 from './images/slider2.webp';
import slider3 from './images/slider3.webp';
import slider4 from './images/slider4.webp';
import slider5 from './images/slider5.webp';

function CarouselImages () {
    return <>
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slider1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slider2}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slider3}
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slider4}
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slider5}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
    </>
}

export default CarouselImages;