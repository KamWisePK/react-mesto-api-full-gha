import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";

function Card({card, onCardClick, onCardDeleteClick, onCardLike }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName =  
    `element__like-button ${isLiked && 'element__like-button_active'}`; 

function handleCardClick() {
    onCardClick(card);
}

function handleDeleteClick() {
  onCardDeleteClick(card);
}

function handleLikeClick() {
  onCardLike(card);
}


  return (
    <article className="element">
      {isOwn &&  ( 
      <button
        className="element__del"
        type="button"
        aria-label="Удалить"
        title="Удалить карточку"
        onClick={handleDeleteClick} 
        />
        )}
      <img src={card.link} alt={card.name} onClick={handleCardClick} className="element__image" aria-label="Увеличить изображение" title="Увеличить" />
      <div className="element__container">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Кнопка лайка"
            title="Нравится"
            onClick={handleLikeClick}
          ></button>
          <span className="element__like-count">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
