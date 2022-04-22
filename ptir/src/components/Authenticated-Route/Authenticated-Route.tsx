import React, { useState } from "react";
import { Navigate, Route, useLocation } from "react-router-dom";
import isAuthenticated from "../../_services/Authenticator";
import { Cookies } from 'react-cookie';

interface IProps {
    children: any,
    path: string,
    exact: boolean | undefined
}

/*
Se um utilizador se autenticar será redirecionado para o search
*/
export default function AuthenticatedRoute({ children, ...rest }: IProps) {
  const { pathname, search } = useLocation();
  const cookies = new Cookies();
  const isAuth = cookies.get("authenticated")
  const isAuthBool = isAuth === 'true' ? true : false
  return (
    <Route {...rest}>
      {isAuthBool ? (
        children
      ) : (
        <Navigate to={`/login?navigate=${pathname}${search}`} />
      )}
    </Route>
  );
}