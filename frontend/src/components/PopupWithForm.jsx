import React from "react";

function PopupWithForm({
  onSubmit,
  title,
  isOpen,
  onClose,
  name,
  buttonName,
  children
}) {
  return (
    <section className={`popup  ${isOpen ? "popup_opened" : ""} `}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <button
          className="popup__close-btn opacity"
          type="button"
          aria-label="Закрыть без сохранения"
          title="Закрыть"
          onClick={onClose}
        ></button>
        <form className="edit-form" name={name} id={name} onSubmit={onSubmit}>
          {children}
          <button
            className={`edit-form__button edit-form__button_type_${name} opacity`}
            type="submit"
          >
            {buttonName || 'Сохранить'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
