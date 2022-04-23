import React, { useState } from "react";
import "./createProduct.css";
import { useTranslation } from "react-i18next";
import { withCookies } from "react-cookie";
import Select from 'react-select';
import Navbar from "../../components/Navbar/Navbar.tsx";
import Footer from "../../components/Footer/Footer.tsx";

type OptionType = {
    label: string;
    value: any;
}
/*EDITAR*/

