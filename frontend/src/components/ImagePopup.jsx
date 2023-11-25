import React from 'react';

function ImagePopup({card, onClose}) {
  
  return (
    <section className="popup popup_type_img">
    <figure className="popup__figure">
      <img className="popup__img" src={card?.link} alt={card?.name}/>
      <figcaption className="popup__figcaption">{card ? card.name : ''}</figcaption>
      <button
        className="popup__close-btn opacity"
        type="button"
        aria-label="Закрыть без сохранения"
        title="Закрыть"
        onClick={onClose}
      ></button>
    </figure>
  </section>
  );
}

export default ImagePopup;