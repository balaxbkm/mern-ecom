const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRouter = require('./routes/auth/auth-routes');
const adminProductsRouter = require('./routes/admin/products-routes');
const adminOrderRouter = require('./routes/admin/orders-routes');
const shopProductsRouter = require('./routes/shop/products-routes');
const shopCartRouter = require('./routes/shop/cart-routes');
const shopAddressRouter = require('./routes/shop/address-routes');
const shopOrderRouter = require('./routes/shop/order-routes');
const shopSearchRouter = require('./routes/shop/search-routes');
const shopReviewRouter = require('./routes/shop/review-routes');
// const pdfsRouter = require('./routes/pdfs');

mongoose.connect('mongodb+srv://bala13bkm:GMoUTvr7kyXECbvS@cluster0.urewu.mongodb.net/')
    .then(() => console.log("MongoDB Connected!"))
    .catch((error) => console.error(error));

const app = express();
const port = process.env.PORT || 8000;

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],
    credentials: true
}));
app.use('/api/auth', authRouter);
app.use('/api/admin/products', adminProductsRouter);
app.use('/api/admin/orders', adminOrderRouter);
app.use('/api/shop/products', shopProductsRouter);
app.use('/api/shop/cart', shopCartRouter);
app.use('/api/shop/address', shopAddressRouter);
app.use('/api/shop/orders', shopOrderRouter);
app.use('/api/shop/search', shopSearchRouter);
app.use('/api/shop/reviews', shopReviewRouter);

// app.use('/api/pdfs', pdfsRouter); // for bulk downloading pdf files from urls (developed for client's need)

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server is now listening on port ${port}!`));