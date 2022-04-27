import React from "react"
import "./search.css"
import Navbar from "../../components/Navbar/Navbar";
import ProductList from "../../components/ProductList/ProductList.tsx";
import Filter from "../../components/Filter/Filter.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import SearchBar from "../../assets/svgs/search.svg";
import Chat from "../../components/Chat/Chat.tsx";
import { withTranslation } from "react-i18next.ts";
import { VscSettings } from "react-icons/vsc";
import { Swiper } from 'swiper/react';

import 'swiper/swiper.min.css';

interface SwiperElement extends Element {
    swiper: any; // can't assign Type because Swiper doesn't extends SwiperClass.d.ts where slidePrev is 
}

interface ISearchState {
    openMenu: boolean
}

class Search extends React.Component<{ t: any }, ISearchState> {

    constructor(props: any) {
        super(props)

        this.state = {
            openMenu: false
        }

        this.MenuToggle = this.MenuToggle.bind(this);
    }


    search() {
        console.log("searching...")
    }
    menuButton = document.getElementsByClassName('menu-button');
    MenuToggle () {
        const swiper= (document.getElementsByClassName('swiper-container') as HTMLCollectionOf<SwiperElement>)[0].swiper;
        console.log(this.state)
        if(this.state.openMenu===false) {
            swiper.slidePrev();
            this.setState({ "openMenu": true });
        } else {
            swiper.slideNext();
            this.setState({ "openMenu": false });
        }

    }
    

    render() {
        const { t } = this.props
        return(
            <div>
                <Navbar />
                <Swiper
                    className="swiper-container"
                    slidesPerView="auto"
                    initialSlide={1}
                    slideToClickedSlide={true}

                    allowTouchMove={false}
                    preventClicks={false}
                    preventClicksPropagation={false}
                    touchStartPreventDefault={false}
                    simulateTouch={false}
                
                >
                    <div className="swiper-wrapper mt-4">
                        <div className="swiper-slide menu">
                            <Filter/>
                        </div>
                        <div className="swiper-slide content">
                            <div className="menu-button" onClick={this.MenuToggle} >
                                <VscSettings size={32}/>
                            </div>
                            <div>
                                <ProductList id="1" name="Televisão LG" location="Worten" address="Rua dos Peixes F, 2788-007" description="Polegadas:42 fps:60" price="350" rating="5"/>
                            </div>
                        </div>
                    </div>
                    
                </Swiper>
                <div className="fixed bottom-0 right-0 z-50">
                    <Chat/>
                </div>
                <Footer />
                
            </div>
        )
    }
}

export default withTranslation()(Search)