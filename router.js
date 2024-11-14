const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const formSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    query: { type: String, required: true },
});
const dataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    msg: { type: String, required: true },
});
const ContactData = mongoose.model('ContactData', dataSchema);
const FormData = mongoose.model('FormData', formSchema);

router.post('/form',async (req, res) => {
    try {
        console.log('req.body', req.body);
        const formData = new FormData(req.body);
        await formData.save();
        res.status(201).json({ message: 'Form data saved successfully' });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ error: 'Error saving form data' });
    }
});
router.post('/data',async (req, res) => {
    try {
        const Data = new ContactData(req.body);
        await Data.save();
        res.status(201).json({ message: 'contact data saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error saving form data' });
    }
});

module.exports = router;
