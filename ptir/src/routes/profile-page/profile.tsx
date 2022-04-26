import React from "react";
import "./profile.css";
import profilePicture from "../../assets/blank-profile-picture.png";
import Footer from "../../components/Footer/Footer.tsx";
import Chat from "../../components/Chat/Chat.tsx";
import Navbar from "../../components/Navbar/Navbar.tsx";
import { withTranslation } from "react-i18next";
import { MdNotificationsActive } from "react-icons/md";
import { GiPadlock } from "react-icons/gi";
import { MdPayment } from "react-icons/md";
import { ImCamera } from "react-icons/im";

interface IProfileState {
  currentFile: any,
  previewImage: any
}

class Profile extends React.Component<{t: any}, IProfileState>{
  constructor(props: any) {
    super(props)

    this.state = {
        currentFile: undefined,
        previewImage: profilePicture,
    };
    this.selectFile = this.selectFile.bind(this);
  } 

  selectFile(event: any) {
    this.setState({
      currentFile: event.target.files[0],
      previewImage: URL.createObjectURL(event.target.files[0]),
    });
  }

  render(){
    const  { t } = this.props 

    const {
      currentFile,
      previewImage,
    } = this.state;

    return (
      <div className="bg-beige_a_morrer">
        <Navbar />
        <div id="profilePic">
            {previewImage && (
                <div className="profImg content-center w-full ">
                    <img className="preview w-40 h-40 border-2 border-white rounded-full ml-28" src={previewImage} alt="" />
                    <div className="icon"><label htmlFor="upload" className="cursor-pointer"><ImCamera className="ml-64 text-4xl"/></label></div>
                </div>
            )}
            <input id="upload" type="file" accept="image/*" onChange={(this.selectFile)} />
        </div>
        <div className="grid grid-flow-col grid-cols-11 grid-rows-11 md:grid-flow-col">
          <div className="group border-2 border-opacity-75 border-gray-500 hover:bg-dark_blue hover:shadow-xs hover:border-transparent mr-3 col-start-3 col-end-10 row-start-1 row-end-2 rounded-lg">
            <h1 className="text-gray-900 text-xl font-semibold group-hover:text-white m-3">{t("profileInfo")}</h1>
            <div>
              <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline mx-3 ">{t("fullName")}: </p>
              <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline mx-3">Blabla </p>
              <button className="editBtn mb-5 inline" type="button" >{t("edit")}</button>
            </div>
            <div>
              <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline mx-3 ">{t("birthday")}: </p>
              <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline mx-3">Blabla </p>
              <button className="editBtn mb-5 inline" type="button" >{t("edit")}</button>
            </div>
            <div>
              <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline mx-3 ">{t("phoneNum")}: </p>
              <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline mx-3">Blabla </p>
              <button className="editBtn mb-5 inline" type="button" >{t("edit")}</button>
            </div>
            <div>
              <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline mx-3 ">{t("cardNum")}: </p>
              <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline mx-3">Blabla </p>
              <button className="editBtn mb-5 inline" type="button" >{t("edit")}</button>
            </div>
            <div>
              <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline mx-3 ">{t("password")}: </p>
              <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline mx-3">Blabla </p>
              <button className="editBtn mb-5 inline" type="button" >{t("edit")}</button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 col-start-3 col-end-10 row-start-2 row-end-3">
            <div className="group border-2 border-opacity-75 border-gray-500 hover:bg-dark_blue hover:shadow-xs hover:border-transparent m-3 rounded-lg">
              <h1 className="text-gray-900 text-xl font-semibold group-hover:text-white m-3">{t("account")}</h1>
              {}
              <div><MdNotificationsActive size={30} className={'ml-3 mr-2 mb-3 mt-1 inline text-gray-500 group-hover:text-white'}/><p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline m-3">{t("notifications")}</p></div>
              <div><GiPadlock size={30} className={'ml-3 mr-1 mb-3 mt-1 inline text-gray-500 group-hover:text-white'}/> <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline m-3">{t("privacy")}</p></div>
            </div>
            <div className="group border-2 border-opacity-75 border-gray-500 hover:bg-dark_blue hover:shadow-xs  hover:border-transparent m-3 rounded-lg">
              <h1 className="text-gray-900 text-xl font-semibold group-hover:text-white m-3">{t("activities")}</h1>
              <div><MdPayment size={30} className={'ml-3 mr-2 mb-3 mt-1 inline text-gray-500 group-hover:text-white'}/><p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline m-3">{t("payments")}</p></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 col-start-3 col-end-10 row-start-3 row-end-4">
            <div className="group border-2 border-opacity-75 border-gray-500 hover:bg-dark_blue hover:shadow-xs hover:border-transparent m-3 rounded-lg">
              <h1 className="text-gray-900 text-xl font-semibold group-hover:text-white m-3">{t("favourites")}</h1>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 col-start-3 col-end-10 row-start-4 row-end-5">
            <div className="group border-2 border-opacity-75 border-gray-500 hover:bg-dark_blue hover:shadow-xs hover:border-transparent m-3 rounded-lg">
              <h1 className="text-gray-900 text-xl font-semibold group-hover:text-white m-3">{t("myPurchases")}</h1>
            </div>
            <div className="group border-2 border-opacity-75 border-gray-500 hover:bg-dark_blue hover:shadow-xs hover:border-transparent m-3 rounded-lg">
              <h1 className="text-gray-900 text-xl font-semibold group-hover:text-white m-3">{t("addAccount")}</h1>
            </div>
          </div>
          <div className="group border-2 border-opacity-75 border-gray-500 hover:bg-dark_blue hover:shadow-xs hover:border-transparent m-3 col-start-3 col-end-10 row-start-5 row-end-6 rounded-lg">
            <h1 className="text-gray-900 text-xl font-semibold group-hover:text-white m-3">{t("logOut")}</h1>
          </div>
        </div>
        <div className="fixed bottom-0 right-0 z-50">
            <Chat/>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default withTranslation()(Profile);