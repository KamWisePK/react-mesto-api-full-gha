
 class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
  _response(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Произошла ошибка: ${res.status}`);
    }
  }

  getAllInfo() {
    return Promise.all([this.getUserInfo(), this.getCards()])
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._response);
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._response);
  }

  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._response);
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._response);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._response);
  }

  editAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._response);
  }

  changeLikeCardStatus(idCard, isLiked) {
    return fetch(`${this._url}/cards/${idCard}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers,
    })
      .then(this._response)
  }

}

 const api = new Api ({
  url: "https://mesto.nomoreparties.co/v1/cohort-73/",
  headers: {
    authorization: "9d53ee09-a4cc-4b6a-9f72-a12f979618e1",
    "Content-Type": "application/json",
  },
});

export default api;