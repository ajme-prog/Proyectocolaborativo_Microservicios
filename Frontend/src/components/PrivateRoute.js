import React, { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useCookies } from "react-cookie";

export default function PrivateRoute({ component: Component, ...rest }) {

    /*const [cookies, setCookie] = useCookies(["usuario"]);

    useEffect(() => {
        async function recuperarCookies () {
            await cookies.accessToken
        }

        recuperarCookies()
    }, [])*/

    return (
        <Route
            {...rest}
            render={props => {
                //return cookies.accessToken ? <Component {...props} /> : <Redirect to="/auth/login"/>
                return true ? <Component {...props} /> : <Redirect to="/auth/login"/>
            }}
        ></Route>
    )
}