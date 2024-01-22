require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const registration = require('./routes/Registration');

mongoose.connect(process.env.CONNECTION_STRING)
        .then(() => console.log('connnected to MongoDB...'))
        .catch(error => console.log('Unable to connect to MongoDB...', error))

app.use(cors());
app.use(express.json());
app.use('/api/signup', registration);

const port  = process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port}`));
