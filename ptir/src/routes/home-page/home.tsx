import React from "react";
import "./home.css";
import Footer from "../../components/Footer/Footer.tsx";
import Chat from "../../components/Chat/Chat.tsx";
import Navbar from "../../components/Navbar/Navbar.tsx";
import Carousel from '../../components/Carousel/Carousel.tsx';

interface IHomeState {
    future: any
}
/*
Este component só é visto por utilizadores autenticados
*/
class Home extends React.Component<{t: any}, IHomeState>{
    constructor(props: any) {
        super(props)

        this.state = {
            future: "something"
        }
    }

    render() {
        return (
            <div>
                <Navbar />
                <Carousel filter="Most Popular Products"/>
                <Carousel filter="Top Rated Products"/>
                <Carousel filter="New Products" />
                <div className="fixed bottom-0 right-0 z-50">
                    <Chat/>
                </div>
                <Footer />
            </div>
           
        )
    }
}

export default Home;
