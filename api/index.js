const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.CONNECTION_STRING)
        .then(() => console.log('connnected to MongoDB...'))
        .catch(error => console.log('Unable to connect to MongoDB...', error))

app.use(cors());
app.use(express.json());

const port  = process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port}`));
