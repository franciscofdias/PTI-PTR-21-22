import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./payment.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import successfulPayment from "../successfulPayment-page/successfulpayment.tsx"
import Dropzone from "react-dropzone";

import { FaCcVisa, FaCcMastercard, FaCcDiscover, FaCcAmex, FaPaypal } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";

export default function Payment(props: any) {
    const { t } = useTranslation()
    const [seenB, setSeenB] = useState(false);
    const [owner, setOwner] = useState("")
    const [cardNum, setCardNum] = useState("")
    const [expDate, setExpDate] = useState("")
    const [cvv, setCvv] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [zip, setZip] = useState("")
    const [file, setFile] = useState("");
    const [fileName, setFileName] = useState("")
    
    function handleDrop(file: any){
        const {name, path} = file[0]
        setFile(path)
        setFileName(name)
    }

    function dropText(){
        console.log("FILENAME" + fileName)
        if (fileName === ""){
            return(<p>{t("dragDrop")}<FiUpload className="inline ml-2" size={32}/></p>)
        }else{
            return(<p>{fileName}</p>)
            
        }
    }

    const minE = 10000;
    const maxE = 99999;
    const randE = Math.floor(minE + Math.random() * (maxE - minE));

    const minR = 100000000;
    const maxR = 999999999;
    const randR = Math.floor(minR + Math.random() * (maxR - minR));

    function whatToShow(info: any) {
        if (info === "creditCard") {
            return (
                <form>
                    <p className="label text-lg">{t("accept")}: <FaCcVisa className="inline ml-6" size={64} /> <FaCcMastercard className="inline ml-6" size={64} /> <FaCcDiscover className="inline ml-6" size={64} /> <FaCcAmex className="inline ml-6" size={64} /></p>
                    <hr className="contract bg-dark_blue"/>
                    <label className="label text-lg">{t("owner")}:</label>
                    <input
                        className="inputBar"
                        type="text"
                        name="owner"
                        placeholder={t("owner")}
                        onChange={() => setOwner}
                    />
                    <label className="label text-lg">{t("cardNum")}:</label>
                    <input
                        className="inputBar"
                        type="number"
                        name="cardNum"
                        placeholder="xxxx-xxxx-xxxx-xxxx"
                        onChange={() => setCardNum}
                    />
                    <label className="label text-lg">{t("expDate")}:</label>
                    <input
                        className="inputBar"
                        type="text"
                        name="expDate"
                        placeholder="MM/YY"
                        onChange={() => setExpDate}
                    />
                    <label className="label text-lg">CVV:</label>
                    <input
                        className="inputBar"
                        type="number"
                        name="cvv"
                        placeholder="CVV"
                        onChange={() => setCvv}
                    />
                    <hr className="contract bg-dark_blue"/>
                    <h1 className="label text-xl">{t("billing")}</h1>
                    <label className="label text-lg">{t("address")}:</label>
                    <input
                        className="inputBar"
                        type="text"
                        name="address"
                        placeholder={t("address")}
                        onChange={() => setAddress}
                    />
                    <label className="label text-lg">{t("city")}:</label>
                    <input
                        className="inputBar"
                        type="text"
                        name="city"
                        placeholder={t("city")}
                        onChange={() => setCity}
                    />
                    <label className="label text-lg">{t("zip")}:</label>
                    <input
                        className="inputBar"
                        type="text"
                        name="zip"
                        placeholder="xxxx-xxx"
                        onChange={() => setZip}
                    />
                </form>
            )
        } else if (info === "paypal") {
            return (
                <div>
                    <p className="label text-lg mx-5">{t("redirect")}:</p>
                    <button className="redBtn font-bold" type="button" ><FaPaypal className="inline" size={32} />PayPal</button>
                </div>
            )
        } else {
            return (
                <form>
                    <h1 className="label text-xl">{t("billing")}</h1>
                    <label className="label text-lg">{t("address")}:</label>
                    <input
                        className="inputBar"
                        type="text"
                        name="address"
                        placeholder={t("address")}
                        onChange={() => setAddress}
                    />
                    <label className="label text-lg">{t("city")}:</label>
                    <input
                        className="inputBar"
                        type="text"
                        name="city"
                        placeholder={t("city")}
                        onChange={() => setCity}
                    />
                    <label className="label text-lg">{t("zip")}:</label>
                    <input
                        className="inputBar"
                        type="text"
                        name="zip"
                        placeholder="xxxx-xxx"
                        onChange={() => setZip}
                    />
                    <hr className="contract bg-dark_blue"/>
                    <h1 className="label text-xl">{t("payData")}</h1>
                    <p className="label text-lg inline">{t("entity")}:</p>
                    <p className="labelS text-dark_blue text-lg inline ml-2">{randE}</p>
                    <br />
                    <p className="label text-lg inline">{t("reference")}:</p>
                    <p className="labelS text-dark_blue text-lg inline ml-2">{randR}</p>
                    
                    <p className="label text-lg ">{t("ifNot")}</p>
                </form>
            )
        }
    }


    return (
        <div className="bg-main">
            <Navbar />
            <div>
                <h1 className="label text-3xl">{t("pleaseInsertPay")}</h1>
                <p className="label text-2xl inline">{t("amountToPay")}:</p>
                <p className="labelS text-2xl text-salmon ml-2 inline">{props.location.state.amount}€</p>
                <hr className="contract bg-dark_blue"/>
                {whatToShow(props.location.state.paytype)}
                <hr className="contract bg-dark_blue"/>
                <div className="contract grid grid-cols-2 gap-2">
                    <div>
                        <Link to='/contract' target="_blank">
                            <button className="contBtn ml-4" type="button" >{t("contract")}</button>
                        </Link>
                    </div>
                    <div>
                        <Dropzone onDrop={handleDrop} multiple={false}>
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps({ className: "dropzone cursor-pointer" })}>
                                    <input {...getInputProps()} />
                                    {dropText()}
                                </div>
                            )}
                        </Dropzone>
                    </div>
                </div>
                <Link to="/successfulPayment"><button className="finBtn" type="button" >{t("finish")}</button></Link>         
            </div>
            <Footer />
        </div>
    )
}