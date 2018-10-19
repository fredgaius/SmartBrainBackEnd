const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const root = require('./controllers/root');
const profile = require('./controllers/profile');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');

const cnnPostgreSQL = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'FRED GAIUS',
    password : '',
    database : 'smart-brain'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', root.handleRootGet(cnnPostgreSQL));
app.post('/signin', signin.handleSignin(cnnPostgreSQL, bcrypt));
app.post('/register', register.handleRegister(cnnPostgreSQL, bcrypt));
app.get('/profile/:id', profile.handleProfileGet(cnnPostgreSQL));
app.put('/image', image.handleImagePut(cnnPostgreSQL));
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res); });

app.listen(3001, () => { console.log('app is running on port 3001'); });
