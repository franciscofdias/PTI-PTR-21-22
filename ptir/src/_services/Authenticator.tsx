import React from 'react'
import { useCookies, Cookies } from 'react-cookie';
import { CheckToken } from './api.ts';

export default function IsAuthenticated () {
    const [, setCookie, removeCookie] = useCookies(['cookie-name'])
    const cookies = new Cookies();
    // check if cookie exists
    console.log(cookies.get('authenticated'))
    CheckToken().then(res => {
        setCookie("authenticated", true)
        setCookie("accountType", res.data.accountType)
    })
    .catch(err => {
        setCookie("authenticated", false)
    })
}