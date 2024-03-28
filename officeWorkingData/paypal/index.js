const express = require("express");
const paypal = require("paypal-rest-sdk");
const PORT = 4000;
paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "ARICHXPd10kNtmhn53P8uZI0LiGyGbrQyB_zEHWqBZ7uJNw7xJNPDoaQxAbFJNzenKIl-WPT4_Sy9m1G",
  client_secret:
    "EOqpD0wgcbj1LzLUIZzQkFzAIQ-zX6vgVcy4v8deyiydZRdWQMk1HrSUeEHqwFpto0p-2N0q8xo5i1Hl",
});
const app = express();
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

app.post("/doPayment", (req, res) => {
  const create_payment_json = {
    intent: "iDMX Payment",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:4000/home",
      cancel_url: "http://localhost:4000/buy",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "iDMX",
              sku: "001",
              price: "1.00",
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: "1.00",
        },
        description: "pay for iDMX",
      },
    ],
  };
  app.get("/home", (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: "USD",
            total: "1.00",
          },
        },
      ],
    };

    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      function (error, payment) {
        if (error) {
          console.log(error.response);
          throw error;
        } else {
          console.log(JSON.stringify(payment));
          res.json({payment : "Success"});
        }
      }
    );
  });
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
});
app.get("/buy", (req, res) =>{
    
    res.send("Cancelled");
});

app.listen(PORT, () => console.log(`Server Started on ${PORT}`));
