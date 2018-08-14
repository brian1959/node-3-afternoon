require ('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const checkForSession = require('./middlewares/checkForSession');
const swag_controller = require('./controllers/swag_controller');
const auth_controller = require('./controllers/auth_controller');
const cart_controller = require('./controllers/cart_controller');
const search_controller = require('./controllers/search_controller');

const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUnitialized:true
}))
app.use(checkForSession);
app.use( express.static(`${__dirname}/build`));

app.get('/api/swag', swag_controller.read);

app.post('/api/login', auth_controller.login);
app.post('/api/register', auth_controller.register);
app.post('/api/signout', auth_controller.signout);
app.get('api/user', auth_controller.getUser);

app.post('/api/cart', cart_controller.addSwag);
app.post('/api/cart/checkout',cart_controller.checkOut);
app.delete('/api/cart', cart_controller.deleteSwag);

app.get('/api/search', search_controller.searchSwag);


const PORT = process.env.SERVER_PORT
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});