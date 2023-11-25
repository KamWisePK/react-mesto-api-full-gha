import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm.jsx";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleChangeName(e) {
    const value = e.target.value;
    setName(value);
  }

  function handleChangeLink(e) {
    const value = e.target.value;
    setLink(value);
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name="new-card"
      title="Новое место"
      buttonName="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}
    >
      <label className="edit-form__label">
        <input
          value={name || ""}
          onChange={handleChangeName}
          name="name"
          className="edit-form__input edit-form__input_type_card-name"
          minLength="2"
          maxLength="30"
          autoFocus
          placeholder="Укажите название"
          required
        />
        <span id="name-error" className="edit-form__error"></span>
      </label>
      <label className="edit-form__label">
        <input
          value={name || ""}
          onChange={handleChangeLink}
          type="url"
          name="link"
          className="edit-form__input edit-form__input_type_card-url"
          minLength="4"
          placeholder="Ссылка на картинку"
          required
        />
        <span id="link-error" className="edit-form__error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
