import { useEffect } from "react"
import {Link, useNavigate} from 'react-router-dom'
import { useForm } from "../hooks/useForm.jsx"

export default function Register({ onRegister }) {

  const {values, handleChange, setValues} = useForm({email: '', password: ''});
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    onRegister( values.password, values.email )
  };

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      navigate('/');
    }
  }, []);
  
  useEffect(() => {
    setValues({email: '', password: ''});
  }, []);

  return (
    <div className="popup__container popup__container_reg">
      <h2 className="popup__title popup__title_reg">Регистрация</h2>
      <form className="edit-form" method="get" onSubmit={handleSubmit}>
        <input
          className="edit-form__input edit-form__input_type_email"
          type="email"
          name="email"
          id="email"
          required
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
          minLength="4"
          maxLength="50"
        />
        <span id="email-error" className="edit-form__error"></span>
        <input
          className="edit-form__input edit-form__input_type_password"
          type="password"
          name="password"
          id="password"
          required
          value={values.password}
          onChange={handleChange}
          placeholder="Пароль"
          minLength="4"
          maxLength="50"
        />
        <span id="password-error" className="edit-form__error"></span>
        <button className="edit-form__button edit-form__button_type_register opacity" type="submit" id="register">
          Зарегистрироваться
        </button>
      </form>
      <div className="popup__link-container">
        <p className="popup__link-text">Уже зарегистрированы?</p>
        <Link className="popup__link opacity" to="/sign-in">
          Войти
        </Link>
      </div>
    </div>
  );
}


