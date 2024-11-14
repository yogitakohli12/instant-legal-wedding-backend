const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000


const DBuri= process.env.DB;

const allowedOrigins = [
    'https://instantlegalweddings.com',
    'http://localhost:3000'
  ];

mongoose.connect(DBuri ,{ useNewUrlParser:true, useUnifiedTopology:true })
        .then(() => { console.log('connection successful'); })
        .catch((err)=> console.log('no connection',err));

const formSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    query: { type: String, required: true },
});
const FormData = mongoose.model('FormData', formSchema);
app.post('/api/form', async (req, res) => {
    try {
        const formData = new FormData(req.body);
        await formData.save();
        res.status(201).json({ message: 'Form data saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error saving form data' });
    }
});

app.get('/', async (req, res) => {
    res.send('server is running');

})
// contact form data
const dataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    msg: { type: String, required: true },
});
const ContactData = mongoose.model('ContactData', dataSchema);
app.post('/api/data', async (req, res) => {
    try {
        const Data = new ContactData(req.body);
        await Data.save();
        res.status(201).json({ message: 'contact data saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error saving form data' });
    }
});
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
    credentials: true, // Allow credentials if needed
  };
  
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.listen(port ,()=>{
    console.log(`server is running on port ${port}`);
})

module.exports=app;