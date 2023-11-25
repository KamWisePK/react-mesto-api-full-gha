export const baseUrl = 'https://auth.nomoreparties.co';

const getResponseData = (res) => {
  if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
  }
  return res.json();
} 

export const register = ( password, email ) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json" 
    },
    body: JSON.stringify({ password, email })
  })
  .then(getResponseData)
};

export const authorize = ( password, email ) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json" 
    },
    body: JSON.stringify({ password, email })
  })
  .then(getResponseData)
};

export const checkToken = (token) => {
    return fetch(`${baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    })
    .then(getResponseData)
  };