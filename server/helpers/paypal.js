const paypal = require("paypal-rest-sdk");

paypal.configure({
    mode: "sandbox",
    client_id: "ATK4Lvhrbcq3gMLcLN6kolEcujvYZtffgsTgQeAjBJ0chBFxd22hnblIv3jOd8EDB2MU2E0L5CsvZ4K3",
    client_secret: "EL8wNNdUlLAyUrGQKZ0I-3KBtQ79gvuIJnLl7anfFabaJjDWEsSNpAU6avfauFMx9ukJgiOSqspaBDEP"
});

module.exports = paypal;