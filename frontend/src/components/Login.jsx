import { useEffect } from "react";
import { useForm } from "../hooks/useForm";

export default function Login({ onLogin }) {
  const { values, handleChange, setValues } = useForm({ email: "", password: "" });

  useEffect(() => {
    setValues({ email: "", password: "" });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values.password, values.email).then(() => {
      setValues({ email: "", password: "" });
    });
  };

  return (
    <div className="popup__container popup__container_reg ">
      <h2 className="popup__title popup__title_reg">Вход</h2>
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
          minLength="5"
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
        />
        <span id="password-error" className="edit-form__error"></span>
        <button
          className="edit-form__button edit-form__button_type_register opacity"
          type="submit"
          id="register"
        >
          Войти
        </button>
      </form>
    </div>
  );
}
