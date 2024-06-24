const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/dashboard', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// Define Mongoose schemas and models
const numberSchema = new mongoose.Schema({
    value: Number,
    result: Number,
    file: String
});

const NumberEntry = mongoose.model('NumberEntry', numberSchema);

// Routes
app.post('/input', async (req, res) => {
    const { number } = req.body;
    if (number < 1 || number > 25) {
        return res.status(400).send('Number must be between 1 and 25');
    }

    // Check if all files (A, B, C, D) have at least one entry
    const files = await NumberEntry.distinct('file');
    if (files.length === 4) {
        return res.status(200).send('Process complete. No more numbers can be entered.');
    }

    const result = number * 7;
    let file;

    if (result > 140) {
        file = 'A';
    } else if (result > 100) {
        file = 'B';
    } else if (result > 60) {
        file = 'C';
    } else {
        file = 'D';
    }

    const numberEntry = new NumberEntry({ value: number, result, file });
    await numberEntry.save();

    res.status(200).send(`Number stored in file ${file}`);
});

app.get('/files', async (req, res) => {
    const files = await NumberEntry.find();
    res.status(200).send(files);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
