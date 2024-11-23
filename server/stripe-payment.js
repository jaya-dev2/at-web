if (process.env.NODE_ENV === 'production') {
    require('dotenv').config({ path: './.env' });
}
else {
    require('dotenv').config({ path: './.env.test' });
}
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express');
const app = express();

app.use(bodyParser.json());
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const DOMAIN = process.env.DOMAIN;
const PORT = process.env.PORT;

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'client/index.html'));
})

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({

        line_items: [
            {
                price: req.body.price,
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${DOMAIN}/order/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${DOMAIN}/cancel.html`,
    });
    res.json({ url: session.url })
});

app.get('/get-coaching-price-id', function (req, res) {
    res.send({ id: process.env.COACHING_PRICE_ID })
})

app.get('/get-consultation-price-id', function (req, res) {
    res.send({ id: process.env.CONSULTATION_PRICE_ID })
})


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname + "/client"));
app.set('views', __dirname + '/client');

app.get('/order/success', async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

    res.render('success.html', {
        user_name: session.customer_details.name,
        meeting: "https://calendly.com/averagethamizhan/consultation-with-averagethamizhan"
    }
    );
});


app.listen(PORT, () => console.log(`Running on port ${PORT}`));