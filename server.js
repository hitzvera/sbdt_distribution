const express = require('express')
const cors = require('cors')
const { urlencoded } = require("express");
const cookieParser = require("cookie-parser");
const itemsRouter = require('./routes/items.route');
const reviewRouter = require('./routes/review.router');
const userRouter = require('./routes/user.route');
const transactionRouter = require('./routes/transaction.route')

const app = express();
const PORT = process.env.PORT || 7000;
const corsOption = { credential: true, origin: process.env.URL || "*" };

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: false }));

app.use('/items', itemsRouter)
app.use('/reviews', reviewRouter)
app.use('/user', userRouter)
app.use('/transaction', transactionRouter)


app.listen(PORT, ()=>{
    console.log(`listening to ${PORT}`)
})