const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000
const DBuri = "mongodb+srv://yogitakohli12345:yogitakohli@clusterwedding-website.ezuxk.mongodb.net/wedding-website";
const formRouter = require('./router');
app.use(express.json());
const allowedOrigins = [
    'https://instantlegalweddings.com',
    'http://localhost:3000'
];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        const normalizedOrigin = origin.endsWith('/') ? origin.slice(0, -1) : origin;
        if (allowedOrigins.includes(normalizedOrigin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use('/api', formRouter);
app.get('/', async (req, res) => {
    res.send('server is running');
})
mongoose.connect(DBuri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('connection successful'); })
    .catch((err) => console.log('no connection', err));

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})

module.exports = app;
