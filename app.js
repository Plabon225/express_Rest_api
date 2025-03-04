const express = require('express');
const router = require("./src/routes/api");
const app = new express();


// sec meddleware
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cors = require('cors');

// middle ware implement
app.use(cors());
app.use(helmet());
app.use(hpp);
app.use(mongoSanitize);

// implement RATE LIMIT
 const limiter = rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 100
 })
app.use(limiter);


app.use("/api/v1", router)

// undefine route
app.use('*',(req,res)=>{
    res.status(404).json({status: "Not Found", data:"faild"});
})

module.exports = app;