import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import * as auth from "../utils/Auth.jsx";
import api from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import "../index.css";

import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login.jsx";

import ImagePopup from "./ImagePopup.jsx";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import CardDeletePopup from "./CardDeletePopup";
import InfoTooltip from "./InfoTooltip.jsx";

import regSuccess from "../images/registration-success.svg";
import regError from "../images/registration-error.svg";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isCardDeletePopupOpen, setIsCardDeletePopupOpen] = useState(false);

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isTooltipSuccess, setIsTooltipSuccess] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  const [message, setMessage] = useState('');

  const firstAuth = (jwt) => {
    return auth
      .checkToken(jwt)
      .then(() => {
        if (jwt) {
          setLoggedIn(true);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) firstAuth(token);
  }, []);

  useEffect(() => {
    if (loggedIn) navigate("/");
  }, [loggedIn]);

  const handleRegister = (password, email) => {
    return auth
      .register(password, email)
      .then((res) => {
        if (res.data) {
          setIsTooltipOpen(true);
          setIsTooltipSuccess(true);
          navigate("/sign-in");
          return res;
        }
      })
      .catch((err) => {
        setIsTooltipOpen(true);
        setIsTooltipSuccess(false);
        console.log(err);
      });
  };

  const handleLogin = (password, email) => {
    const authorizationError = document.getElementById("email-error");
    authorizationError.innerText="";
    return auth
      .authorize(password, email)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem("jwt", res.token);
          localStorage.setItem("email", email);
          navigate("/");
        }
      })
      .catch(() => authorizationError.innerText="Некорректный Email или пароль ");
      
  };

  const handleExit = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("email");
  };

  useEffect(() => {
    if (loggedIn) fetchInfo();
  }, [loggedIn]);

  const fetchInfo = function () {
    api
      .getAllInfo()
      .then(([data, res]) => {
        setCurrentUser(data);
        setCards(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userInfo, initialCards]) => {
        setCurrentUser(userInfo);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDeleteClick(card) {
    setIsCardDeletePopupOpen(true);
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((deleteCard) => card._id !== deleteCard._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
     ;
  }

  function handleUpdateUser(data) {
    api
      .editUserInfo(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
     ;
  }

  function handleUpdateAvatar(data) {
    api
      .editAvatar(data)
      .then((avatarData) => {
        setCurrentUser(avatarData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
     ;
  }

  function handleAddPlace(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
     ;
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsCardDeletePopupOpen(false);
    setIsTooltipOpen(false);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header onClick={handleExit} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleEditPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onCardDeleteClick={handleCardDeleteClick}
                element={Main}
              />
            }
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />

          <Route
            path="/*"
            element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />}
          />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <CardDeletePopup
          isOpen={isCardDeletePopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          card={selectedCard}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          isOpen={isTooltipOpen}
          onClose={closeAllPopups}
          img={`${isTooltipSuccess ? regSuccess : regError}`}
          text={`${
            isTooltipSuccess
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."
          }`}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
