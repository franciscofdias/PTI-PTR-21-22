import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./product.css";
import Navbar from "../../components/Navbar/Navbar.tsx";
import SearchBar from "../../assets/svgs/search.svg";
import HousePicsSwiper from "../../components/ProductPicsSwiper/ProductPicsSwiper.tsx";
import FavPopup from "../../components/FavPopup/FavPopup.tsx";
import Footer from "../../components/Footer/Footer.tsx";


import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { BsBookmarkFill, BsBookmarkPlus, BsPeople } from "react-icons/bs";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

function Product(props: any) {
    const { t } = useTranslation();
    const [favourite, setFavourite] = useState(false);
    const [interest, setInterest] = useState(false);
    const [seen, setSeen] = useState(false);
    const [dots, setDots] = useState(true);
    const [dateAvailable, setDateAvailable] = useState({});
    const [focused, setFocused] = useState({});
    // fazer state true false para calender

    var imagem = "https://picsum.photos/600/400/?random";

    const listOfImages = [imagem, imagem, imagem, imagem, imagem]
    // DELETE THIS ^^ replace with api

    function search() {
        console.log("searching...")
    }

    function rating(num: number) {
        const max = 5
        const filled = num
        const notFilled = max - num
        const stars = []

        for (let i = 0; i < filled; i++) {
            stars.push(
                <svg className="mx-1 w-4 h-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
            )
        }

        for (let i = 0; i < notFilled; i++) {
            stars.push(
                <svg className="mx-1 w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
            )
        }
        return (
            <div className="flex items-center">
                <div className="flex items-center mt-2 mb-4">
                    {stars}
                </div>
            </div>
        )
    }

    /*
    cadeia logística
    - adicionar varios fornecedores para o mesmo produto, com a variavel qual é a mais ecologica
    -mais ecológicas:
    
    • Os recursos consumidos, como matérias primas e energia. Alguns exemplos são
    a água usada no setor agrícola, a eletricidade gasta em refrigeração, ou o combustível necessário aos transportes.

    • A poluição do ambiente, que pode estar diretamente relacionada com o consumo
    de recursos, como nos combustíveis, mas noutros, como a eletricidade, devem
    ser usados dados sobre a percentagem de fontes renováveis e não renováveis.
    */
    function impactEnv(com: any) {
        const commodities = []
        for (const value of com) {

        }
        return (
            commodities
        )
    }
    /*
    <ul class="hmenu-compress-section" style=""><li class="hmenu-mini-divider"></li><li><a href="" class="hmenu-item" data-menu-id="9" data-ref-tag="nav_em_1_1_1_10"><div>Automotive</div><i class="nav-sprite hmenu-arrow-next"></i></a></li><li><a href="" class="hmenu-item" data-menu-id="10" data-ref-tag="nav_em_1_1_1_11"><div>Baby</div><i class="nav-sprite hmenu-arrow-next"></i></a></li><li><a href="" class="hmenu-item" data-menu-id="11" data-ref-tag="nav_em_1_1_1_12"><div>Beauty and personal care</div><i class="nav-sprite hmenu-arrow-next"></i></a></li><li><a href="" class="hmenu-item" data-menu-id="12" data-ref-tag="nav_em_1_1_1_13"><div>Women's Fashion</div><i class="nav-sprite hmenu-arrow-next"></i></a></li><li><a href="" class="hmenu-item" data-menu-id="13" data-ref-tag="nav_em_1_1_1_14"><div>Men's Fashion</div><i class="nav-sprite hmenu-arrow-next"></i></a></li><li><a href="" class="hmenu-item" data-menu-id="14" data-ref-tag="nav_em_1_1_1_15"><div>Girls' Fashion</div><i class="nav-sprite hmenu-arrow-next"></i></a></li><li><a href="" class="hmenu-item" data-menu-id="15" data-ref-tag="nav_em_1_1_1_16"><div>Boys' Fashion</div><i class="nav-sprite hmenu-arrow-next"></i></a></li><li><a href="" class="hmenu-item" data-menu-id="16" data-ref-tag="nav_em_1_1_1_17"><div>Health and Household</div><i class="nav-sprite hmenu-arrow-next"></i></a></li><li><a href="" class="hmenu-item" data-menu-id="17" data-ref-tag="nav_em_1_1_1_18"><div>Home and Kitchen</div><i class="nav-sprite hmenu-arrow-next"></i></a></li><li><a href="" class="hmenu-item" data-menu-id="18" data-ref-tag="nav_em_1_1_1_19"><div>Industrial and Scientific</div><i class="nav-sprite hmenu-arrow-next"></i></a></li><li><a href="" class="hmenu-item" data-menu-id="19" data-ref-tag="nav_em_1_1_1_20"><div>Luggage</div><i class="nav-sprite hmenu-arrow-next"></i></a></li><li><a href="" class="hmenu-item" data-menu-id="20" data-ref-tag="nav_em_1_1_1_21"><div>Movies &amp; Television</div><i class="nav-sprite hmenu-arrow-next"></i></a></li><li><a href="" class="hmenu-item" data-menu-id="21" data-ref-tag="nav_em_1_1_1_22"><div>Pet supplies</div><i class="nav-sprite hmenu-arrow-next"></i></a></li><li><a href="" class="hmenu-item" data-menu-id="22" data-ref-tag="nav_em_1_1_1_23"><div>Software</div><i class="nav-sprite hmenu-arrow-next"></i></a></li><li><a href="" class="hmenu-item" data-menu-id="23" data-ref-tag="nav_em_1_1_1_24"><div>Sports and Outdoors</div><i class="nav-sprite hmenu-arrow-next"></i></a></li><li><a href="" class="hmenu-item" data-menu-id="24" data-ref-tag="nav_em_1_1_1_25"><div>Tools &amp; Home Improvement</div><i class="nav-sprite hmenu-arrow-next"></i></a></li><li><a href="" class="hmenu-item" data-menu-id="25" data-ref-tag="nav_em_1_1_1_26"><div>Toys and Games</div><i class="nav-sprite hmenu-arrow-next"></i></a></li><li><a href="" class="hmenu-item" data-menu-id="26" data-ref-tag="nav_em_1_1_1_27"><div>Video Games</div><i class="nav-sprite hmenu-arrow-next"></i></a></li></ul>
    */
    function longDescription(text: string){
        let visible = ""
        let invisible = ""
        if (text.length > 130){
            visible = text.substring(0,130)
            invisible = text.substring(130)
            return(
                <div className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl mt-1">
                    <p>{visible}{dots ? "..." : invisible}</p>
                    <button onClick={() => {setDots(!dots)}} className="moreBtn">{dots ? "Read More " : "Read Less "}{dots ? <IoIosArrowDropdown className="inline"/> : <IoIosArrowDropup className="inline"/>}</button>
                </div>
            )
        }
        else{
            return(
                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl mt-1">
                    {text}
                </p>
            )
            
        }
    }


    function showToggleDatePicker(dateAvailable: string){
        //meter a data e a hora da entrega
        var newDate = (new Date()).toLocaleDateString("ko-KR").split("-").toString();
        

        
    }

    
    return (
        <div>
            <Navbar />
            <div className="container mt-5 mb-2 mx-auto w-3/4">
                <article className="overflow-hidden rounded-lg shadow-lg">
                    <HousePicsSwiper pics={listOfImages} />
                    <div className="float-right mt-3 mr-2" >
                        <button className="w-6 h-auto focus:ring-0 focus:outline-none" onClick={() => setInterest(!interest)}>{interest ? <BsBookmarkFill size={24} color={'#F9C2A7'} /> : <BsBookmarkPlus size={24} />}</button>
                        <button className="w-6 h-auto ml-3 mr-4 focus:ring-0 focus:outline-none" onClick={() => { setFavourite(!favourite); (favourite ? setSeen(seen) : setSeen(!seen)); }}>{favourite ? <HiHeart size={24} color={'#EA5455'} /> : <HiOutlineHeart size={24} />}</button>
                        {favourite ? (seen ? <FavPopup toggle={() => setSeen(!seen)} lists={props.location.state.lists} /> : null)
                            : null
                        }
                    </div>
                    <div className="ml-5 mr-5 mt-3">

                        <h1 className="text-base xs:text-xl sm:text-3xl md:text-3xl lg:text-5xl xl:text-5xl font-semibold w-3/4">
                            {props.location.state.name}
                        </h1>

                        <a
                            className="flex items-center no-underline hover:underline text-black"
                            href="#"
                        >
                            <img
                                alt="Placeholder"
                                className="block rounded-full mt-2"
                                src="https://picsum.photos/32/32/?random"
                            />
                            <p className="ml-2">{props.location.state.companyName}</p>
                        </a>
                        <div className="grid grid-cols-2 gap-2 ml-5 mr-5 mt-3">
                            <div>
                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold mt-2">
                                    {props.location.state.productType}, host by {props.location.state.companyName}
                                </p>

                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold mt-1">Price</p>
                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl mt-1">{props.location.state.price}€</p>

                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold mt-1">Impact on the environment</p>
                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl mt-1">
                                    {impactEnv(props.location.state.commodities)}
                                </p>

                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold mt-1">Rating</p>
                                <div className="text-base xs:text-xs sm:text-xs md:text-xs lg:text-xs xl:text-xs mt-1">
                                    {rating(props.location.state.rating)}
                                </div>
                            </div>
                            <div>
                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold mt-1">Description
                                {longDescription(props.location.state.description)}
                                </p>

                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold mt-1">Location</p>
                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl mt-1">{props.location.state.place}</p>
                                <img className="block w-1/3 mt-2 mb-5" src="https://picsum.photos/100/100/?random"/>
                                
                                
                            </div>
                        </div>
                    </div>
                    <footer>
                        <button onClick={() => showToggleDatePicker(props.location.state.availableDate)}className="bookBtn items-center float-left font-semibold ml-4" type="button">Choose Dates</button>
                        <button className="bookBtn items-center float-left font-semibold ml-4" type="button">Book</button>
                    </footer>
                </article>
            </div>

            <Footer/>
        </div>
    )
}

export default Product