const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// init the object for making the API request of stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

// in order to parse all the request to json
app.use(bodyParser.json());
// escape all the non-wanted characters for the url, is a strict mode to avoid problems
app.use(bodyParser.urlencoded({ extended: true }));

// CORS=Cross-Origin-Request in order to avoid blocks by the search monitor when we try to
// make a request from different origins, so aloud us to make proper requests to the backend
app.use(cors());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}


app.listen(port, error => {
   if (error) throw error;
   console.log('Server running on port ' + port);
});


// Inside the req obj we have a property body where we save all the props that we need to
// pass from the component where u are calling this route, that is the public token id of stripe
app.post('/payment', (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    }

    // depending on the API response we send to the client the error/response from stripe
    // create makes the call with the body obj and the second param is the callback to handle the response
    stripe.charges.create(body, (stripeError, stripeRes) => {
        if (stripeError) {
            res.status(500).send({ error: stripeError });
        } else {
            res.status(200).send({ error: stripeRes });
        }
    });
});

