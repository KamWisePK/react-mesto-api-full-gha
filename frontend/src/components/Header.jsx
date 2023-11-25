import React from 'react';
import { Link } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import { useState } from "react"

import logo from '../images/logo.svg';
export default function Header({ onClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const handlToggleClick = () => {
    setIsOpen(!isOpen);
  }

  return (
    <header className="header ">
    <img
      className="header__logo"
      src={logo}
      alt="Логотип место"
    />
     <Routes>
        <Route path="/" element={
                
          <div className="header__log-out">
            <p className="header__login-link">{localStorage.getItem('email')}</p>
            <Link className="header__login-link"
              to='/sign-in'
              onClick={onClick}>
              Выйти
            </Link>
          </div> 
          
        } />
        <Route path="/sign-up" element={
          <Link className="header__login-link"
            to='/sign-in'>
            Войти
          </Link> 
        } />
        <Route path="/sign-in" element={
          <Link className="header__login-link"
            to='/sign-up'>
            Регистрация
          </Link> 
        } />
      </Routes>
  </header>
  );
}

