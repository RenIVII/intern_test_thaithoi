const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const payOS = require('./utils/payos');

const app = express();
const PORT = process.env.PORT || 3030;
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', express.static('public'));
app.use('/payment', require('./controllers/payment-controller'));
app.use('/order', require('./controllers/order-controller'));

app.post('/create-payment-link', async (req, res) => {
    const YOUR_DOMAIN = 'http://localhost:3030';
    const body = {
        orderCode: Number(String(Date.now()).slice(-6)),
        amount: 2000,
        description: 'Thanh toan don hang',
        returnUrl: `${YOUR_DOMAIN}/success.html`,
        cancelUrl: `${YOUR_DOMAIN}/cancel.html`
    };

    try {
        const paymentLinkResponse = await payOS.createPaymentLink(body);
        res.redirect(paymentLinkResponse.checkoutUrl);  
    } catch (error) {
        console.error(error);
        res.send('Something went error');
    }
});
//  https://0581-171-240-218-127.ngrok-free.app/receive-hook
// app.get('/receive-hook', async (req, res) => {
//     console.log(req.body);
//     //res.json()
//     res.send("aaaa")
// });

app.post("/confirm-webhook", async (req, res) => {
    const { webhookUrl } = req.body;
    try {
      await payOS.confirmWebhook(webhookUrl);
      return res.json({
        error: 0,
        message: "ok",
        data: null,
      });
    } catch (error) {
      console.error(error);
      return res.json({
        error: -1,
        message: "failed",
        data: null,
      });
    }
  });

app.listen(PORT, function () {
    console.log(`Server is listening on port ${PORT}`);
});