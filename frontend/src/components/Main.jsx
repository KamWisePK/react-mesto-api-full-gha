import React, { useContext } from "react";
import api from "../utils/Api.js";
import profileAvatar from "../images/Kusto-profile.jpg";
import Card from "./Card.jsx";
import App from "./App.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
  onCardDeleteClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            //  style={{ backgroundImage: `url(${userAvatar})` }}
            src={currentUser.avatar}
            alt="Фото профиля"
            className="profile__avatar"
          />
          <button
            className="profile__avatar-btn"
            type="button"
            aria-label="Поменять аватар"
            title="Поменять аватар"
            onClick={onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__info-name">{currentUser.name}</h1>
            <button
              className="profile__edit-btn opacity"
              type="button"
              aria-label="Редактирвоать профиль"
              title="Редактировать профиль"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__info-job">{currentUser.about} </p>
        </div>
        <button
          className="profile__add-btn opacity"
          type="button"
          aria-label="Добавить карточку"
          title="Добавить карточку"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {cards.map((item) => (
          <Card
            card={item}
            onCardClick={onCardClick}
            key={item._id}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            onCardDeleteClick={onCardDeleteClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
