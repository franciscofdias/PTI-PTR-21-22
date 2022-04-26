import React, { ComponentProps } from "react";
import { Link } from "react-router-dom";
import "./Carousel.css";
import SwiperCore, { Navigation,  } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css'

export default function Carousel(props: any) {

  class Product {
    id: number;
    name: string;
    location: string;
    pic: any;
    price: any;

    constructor(
      id: number,
      name: string,
      location: string,
      pic: string,
      price: string
    ) {
      this.id = id;
      this.name = name;
      this.location = location;
      this.pic = pic;
      this.price = price;
    }
  }

  var myPrice;
  var myPriceString;

  myPrice.setPrice(myPrice.getPrice());

  myPriceString = myPrice.getPrice() +" €";


  var product1 = new Product(1,"Água Luso 2L","Oeiras Parque","pic.jpg", myPriceString);
  var product2 = new Product(2,"Figorifico LG55","Eletro Lda","pic.jpg", myPriceString);
  var product3 = new Product(3,"Água Luso 2L","Oeiras Parque","pic.jpg", myPriceString);
  var product4 = new Product(4,"Figorifico LG55","Campo Grande","pic.jpg",myPriceString);
  var product5 = new Product(5,"Água Luso 2L","Oeiras Parque","pic.jpg", myPriceString);
  var product6 = new Product(6,"Figorifico LG55","Oeiras Parque","pic.jpg", myPriceString);

  var listOfProducts: Array<Product>;

  var imagem = "https://picsum.photos/600/400/?random";

  listOfProducts = [product1, product2, product3, product4, product5, product6];


  const productCards = [];

  SwiperCore.use([Navigation])

  for (const value of listOfProducts) {
    //to
      productCards.push(
        <SwiperSlide>
          <div className="container mt-1 mb-2 mx-auto ">
            <div className="flex flex-wrap justify-center">
              <div className="my-1 px-1">
                <article className="overflow-hidden rounded-lg shadow-lg">
                  <a href="#">
                    <img
                      className="block max-h-64 max-w-48"
                      alt="Placeholder"
                      src={imagem}
                    />
                  </a>

                  <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                    <h1 className="text-lg">
                      <a
                        className="no-underline hover:underline text-black text-base"
                        href=""
                      >
                        {value.name}
                      </a>
                    </h1>
                    <p className="text-grey-darker text-sm ">{value.price}</p>
                  </header>

                  <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                    <a
                      className="flex items-center no-underline hover:underline text-black"
                      href="#"
                    >
                      <img
                        alt="Placeholder"
                        className="block rounded-full"
                        src="https://picsum.photos/32/32/?random"
                      />
                      <p className="ml-2 text-base">{value.location}</p>
                    </a>
                  </footer>
                </article>
              </div>
            </div>
          </div>
        </SwiperSlide>
      );
  }
  

  return (
    // modules navigation, Mousewheel Control, Responsive Breakpoints
    <div className="mt-20">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold text-dark_blue ml-8 mb-4">{props.filter}</h1>
        <Link className="text-salmon mr-8" to="/" /*add params*/ >See All</Link>
      </div>
      <Swiper
      className="mb-6"
      spaceBetween = {0}
      slidesPerView = {1}
      navigation
      //spaceBetween needs to be fixed to appropriate size
      breakpoints = {{
        720: {
          slidesPerView: 2,
          spaceBetween: 0,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 0,
        },
        1366: {
          slidesPerView: 4,
          spaceBetween: 0
        },
        1680: {
          slidesPerView: 5,
          spaceBetween: 0,
        },
      }}
    >
      {productCards}
    </Swiper>
    </div>
    
  );
}