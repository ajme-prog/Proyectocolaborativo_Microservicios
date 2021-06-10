import React from "react";
import { createPopper } from "@popperjs/core";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const UserDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["usuario"]);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  function handleLogout () {
    removeCookie('accessToken', { path: '/'})
    
    localStorage.removeItem("usuario")
  }

  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={require("assets/img/user.svg").default}
              
            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <span
          className={
            "text-sm py-2 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
        >
          Nombre
        </span>
        <div className="h-0 my-2 border border-solid border-amber-100" />
        <Link
          to="/admin/perfil"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
        >
          Perfil
        </Link>
        <Link
          to="/auth/login"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={handleLogout}
        >
          Salir
        </Link>
        
        
      </div>
    </>
  );
};

export default UserDropdown;
