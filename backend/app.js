// eslint-disable-next-line import/no-unresolved
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const auth = require('./middlewares/auth');

const cors = require('./middlewares/cors');

const { PORT, mestoDb } = require('./constants/config');
const { validateRegister, validateLogin } = require('./validation/userValidation');
const { createUser, login } = require('./controllers/users');

const app = express();
app.use(express.json());

app.use(cors);

app.use(helmet());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateLogin, login);
app.post('/signup', validateRegister, createUser);

app.use(auth);

mongoose.connect(mestoDb, {});

app.use(userRouter);
app.use(cardRouter);

app.use(errorLogger);

app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
