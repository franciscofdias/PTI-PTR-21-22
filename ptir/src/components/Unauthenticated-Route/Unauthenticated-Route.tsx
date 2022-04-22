import React, { useState } from "react";
import { Navigate, Route, useLocation } from "react-router-dom";
import querystring from "../../_services/helper.ts";
import { Cookies } from 'react-cookie'

interface IProps {
    children: any,
    path: string,
    exact: boolean | undefined
}

/*
Se um utilizador se autenticar será redirecionado para a home
*/
export default function UnauthenticatedRoute({ children, ...rest }: IProps) {
  const navigate = querystring("navigate", false)
  const cookies = new Cookies()
  const isAuth = cookies.get("authenticated")
  const isAuthBool = isAuth === 'true' ? true : false
    return (
        <Route {...rest}>
          {!isAuthBool ? (
            children
          ) : (
            <Navigate to={navigate === "" || navigate === null ? "/home" : navigate}/>
          )}
        </Route>
      );
}