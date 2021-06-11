import React, { useRef, useState } from "react";
import { loginUsuario } from "../../services/autenticacion";
import Swal from "sweetalert2";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const { setCookie, setCurrentUser, cookies } = useAuth();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const correoRef = useRef();
  const pwdRef = useRef();

  const swalPersonalizado = Swal.mixin({
    customClass: {
      confirmButton:
        "bg-amber-500 text-white active:bg-amber-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear",
    },
    buttonsStyling: false,
  });

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const correo = correoRef.current.value;
    const pwd = pwdRef.current.value;

    if (!(correo && pwd)) {
      swalPersonalizado.fire({
        icon: "warning",
        title: "Campos",
        text: "Debes colocar tu correo y contraseña",
      });
      return;
    }

    const rawResponse = await loginUsuario(correo, pwd);
    const respuesta = await rawResponse.json();
    console.log(respuesta);

    if (rawResponse.status !== 200) {
      swalPersonalizado.fire({
        icon: "error",
        title: "Error",
        text: respuesta.mensaje,
      });
      setLoading(false);
      return;
    }

    Toast.fire({
      icon: "success",
      text: `Bienvenido ${respuesta.usuario.nombre}`,
    });

    localStorage.setItem("usuario", JSON.stringify(respuesta.usuario));
    await setCookie("accessToken", respuesta.accessToken, { path: "/" });
    setLoading(false);

    console.log("*******************",respuesta.usuario.tipo)

    if (respuesta.usuario.tipo === 0) {
      console.log("Es admin");
      history.push("/admin/settings");
    } else if (respuesta.usuario.tipo === 2) {
      console.log("Es cliente");
      history.push("/cliente/tienda");
    } else {
      console.log("Es editorial");
      history.push("/editorial/dashboard");
    }
  }

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-6/12 lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    BOOKSA
                  </h6>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Ingresa mediante tu correo y contraseña</small>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Correo
                    </label>
                    <input
                      ref={correoRef}
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Correo electrónico"
                      required
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Contraseña
                    </label>
                    <input
                      ref={pwdRef}
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Contraseña"
                      required
                    />
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      {loading ? "Cargando..." : "Iniciar sesión"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-full text-center">
                <Link to="/auth/register" className="text-blueGray-200">
                  <small>¿No tienes una cuenta? Registrarme</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
