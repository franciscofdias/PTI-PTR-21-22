import React, { Suspense, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useTranslation } from "react-i18next";
import LanguageChanger from '../Language-Changer/Language-Changer.tsx'
import { Transition } from "@headlessui/react";
import IsAuthenticated from "../../_services/Authenticator.tsx";
import { Cookies } from "react-cookie";
import { FaSearch } from "react-icons/fa"



export default function Navbar () {

 
  const { t } = useTranslation();
  const cookies = new Cookies();

  const [isMainOpen, setIsMainOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  /*
  Verificar se o user está logged in,
   se este não estiver não há a opçao no canto direito do dropdown
  */
  IsAuthenticated()
  const [isLoggedIn, setIsLoggedIn] = useState(cookies.get('authenticated')==='true'? true : false);
    let DesktopNavbar;
    let MobileNavbar;
    let SearchNavbar;
    useEffect(()=> {
      setIsLoggedIn(cookies.get('authenticated')==='true'? true : false)
    }, [])

    let location = useLocation()
    function showHideSearch() {
      if(location.pathname !== "/") {
        let searchNavbar = document.getElementById('searchNavbar');
        if(isSearchOpen){
          searchNavbar?.classList.remove("w-48")
          searchNavbar?.classList.add("w-0")
        } else {
          searchNavbar?.classList.remove("w-0")
          searchNavbar?.classList.add("w-48")
        }
        setIsSearchOpen(!isSearchOpen)
      }
    }
    console.log(location)

    if(location.pathname !== "/") {
      SearchNavbar = (<div className="flex items-center justify-end">
      <div className="flex-shrink-0 flex items-center">
        <input id="searchNavbar" className="border-none focus:ring-0 bg-transparent transition-width duration-500 ease-in-out transform w-0" type="text" placeholder="Search"/>
        <div onClick={showHideSearch}>
        <FaSearch className="h-6 w-6 trasition duration-500 ease-in-out transform hover:rotate-360"/>
        </div>
      </div>
    </div>)
    }


    //NECESSARIO TIRAR A MUDANÇA DE LINGUA PARA FORA DO DROPDOWN DE MODO A QUE UM UTILIZAR AUTENTICADO OU NAO CONSIGA MUDAR DE LINGUA
    if(isLoggedIn){
      DesktopNavbar = (<div className="ml-3 relative">
      <div>
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          type="button"
          className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-0"
          id="user-menu"
          aria-expanded="false"
          aria-haspopup="true"
        >
          <span className="sr-only">{t("open-menu")}</span>
          <img
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </button>
      </div>
      <Transition
        show={isProfileOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
        >
          <Link
            to="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            {t("profile")}
          </Link>
          <LanguageChanger />
          <Link
            to="/"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            {t("sign-out")}
          </Link>
        </div>
      </Transition>
    </div>)
      MobileNavbar = ""
    } else {
      DesktopNavbar = (<div className="hidden sm:block sm:ml-6">
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="bg-dark_blue text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-darker_blue"
        >
          {t("login")}
        </Link>
        <Link
          to="register"
          className="bg-dark_blue text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-darker_blue"
        >
          {t("sign-up")}
        </Link>
      </div>
    </div>)
      MobileNavbar = (<button
      onClick={() => setIsMainOpen(!isMainOpen)}
      type="button"
      className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white bg-dark_blue hover:bg-darker_blue focus:outline-none focus:ring-0"
      aria-controls="mobile-menu"
      aria-expanded="false"
    >
      <span className="sr-only">{t("open-menu")}</span>
      <svg
        className="block h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="#ffffff"
        viewBox="0 0 24 24"
        stroke="#ffffff"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>

      <svg
        className="hidden h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="#ffffff"
        viewBox="0 0 24 24"
        stroke="#ffffff"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>)

    }

    return (
      <div className="">
        <div className="max-w-full px-2 sm:px-6 lg:px-6">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/">
                  <img
                    className="block lg:hidden h-12 w-auto"
                    src="https://cdn4.iconfinder.com/data/icons/circular-economy-aesthetics-vol-1/256/Green_Economy-512.png"
                    alt="Logo"
                  />
                </Link>
                <Link to="/">
                  <img
                    className="hidden lg:block h-20 w-auto"
                    src="https://cdn4.iconfinder.com/data/icons/circular-economy-aesthetics-vol-1/256/Green_Economy-512.png"
                    alt="Logo"
                  />
                </Link>
              </div>
            </div>
            {SearchNavbar}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {DesktopNavbar}
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:hidden">
              {MobileNavbar} 
            </div>
          </div>
        </div>
        <Transition
          show={isMainOpen}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="sm:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/login"
                className="bg-dark_blue text-white block px-3 py-2 rounded-md text-base text-center font-medium hover:bg-darker_blue"
              >
                {t("login")}
              </Link>
              <Link
                to="/register"
                className="bg-dark_blue text-white block px-3 py-2 rounded-md text-base text-center font-medium hover:bg-darker_blue"
              >
                {t("sign-up")}
              </Link>
            </div>
          </div>
        </Transition>
      </div>
    );
  
}
