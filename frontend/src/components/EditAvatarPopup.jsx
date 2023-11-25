import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.jsx";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar-change"
      title="Смена аватара"
      buttonName="Cменить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="edit-form__label">
        <input
        ref={avatarRef}
          type="url"
          name="avatar"
          className="edit-form__input edit-form__input_type_avatar-url"
          minLength="4"
          placeholder="Ссылка на аватар"
          required
        />
        <span id="avatar-error" className="edit-form__error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
