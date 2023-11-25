import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm.jsx";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    const value = e.target.value;
    setName(value);
  }

  function handleChangeJob(e) {
    const value = e.target.value;
    setDescription(value);
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonName="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      
      
    >
      
      <input
        onChange={handleChangeName}
        value={name || ""}
        name="name"
        className="edit-form__input edit-form__input_type_name"
        minLength="2"
        maxLength="40"
        autoFocus
        placeholder="Укажите имя"
        required
      />
      <span id="userName-error" className="edit-form__error"></span>
      <input
        onChange={handleChangeJob}
        value={description || ""}
        name="about"
        className="edit-form__input edit-form__input_type_job"
        minLength="2"
        maxLength="200"
        placeholder="Укажите профессию"
        required
      />
      <span id="userJob-error" className="edit-form__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
