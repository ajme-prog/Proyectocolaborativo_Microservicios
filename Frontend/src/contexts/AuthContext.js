import React, { useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const url_api = "http://localhost:3001"
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [cookies, setCookie] = useCookies(["usuario"]);
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function registrarUsuario(usuario) {
    return fetch(`${url_api}/registro`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(usuario),
    });
  }

  async function loginUsuario(correo, pwd){
    return fetch(`${url_api}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        correo: correo,
        pwd: pwd
      }),
    });
  }

  useEffect(() => {
    /*const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) {
        firestore
          .collection("usuarios")
          .doc(user.uid)
          .get()
          .then((doc) => {
            setUsuarioA(doc.data());
          })
          .then(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
    return unsubscribe;*/
    async function recuperarAuth () {
        let accessToken = await cookies.accessToken
        let usuarioActual = localStorage.getItem("usuario")

        if(usuarioActual && accessToken){
            usuarioActual = await JSON.parse(usuarioActual)
        }
        setCurrentUser(usuarioActual)
        setLoading(false)
    }

    recuperarAuth()
  }, [cookies]);

  const value = {
    currentUser,
    setCurrentUser,
    cookies,
    setCookie,
    loginUsuario,
    registrarUsuario
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
