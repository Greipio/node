"use strict";

var dotenv = require("dotenv");
var { Greip } = require("./dist/index.js");

dotenv.config();

let greip = new Greip(process.env.TOKEN);

greip
    .PaymentFraud({
        data: {
            transaction_amount: 100,
            currency: "USD"
        }
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
