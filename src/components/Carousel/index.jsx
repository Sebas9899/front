import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './style.css';

export const ControlledCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className='carousel-div'>
        <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
            <img
            className="d-block w-100 top"
            src="https://www.xtrafondos.com/wallpapers/resized/osito-de-peluche-con-luces-de-navidad-2868.jpg?s=large"
            alt="First slide"
            />
            <Carousel.Caption>
            <h3>¡Feliz Navidad!</h3>
            <p>🎄🎅🏻🤶🏻🧑🏻‍🎄🎄</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src="https://www.recetasnestle.com.co/sites/default/files/2022-03/golosinas-y-dulces-tipicos-de-la-region.jpg"
            alt="Second slide"
            />

            <Carousel.Caption>
            <h3>Dulcería</h3>
            <p>Tenemos los mejores dulces 🤪</p>
            
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src="https://www.xtrafondos.com/wallpapers/resized/dulces-de-colores-4762.jpg?s=large"
            alt="Third slide"
            />

            <Carousel.Caption>
            <h3>Pero...</h3>
            <p>De verdad los mejores 😂</p>
            </Carousel.Caption>
        </Carousel.Item>
        </Carousel>
    </div>
  );
}