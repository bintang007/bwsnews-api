const PORT = 3001
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const feedRoute = require('./routes/feed');
const adminRoute = require('./routes/admin');

const app = express()

mongoose.connect('mongodb+srv://admin:A23571113z@cluster0.puy0j.mongodb.net/bwsnews-db?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(_ => console.log('Connected to DB'))
    .catch(err => console.error(err));

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use('/feed', feedRoute);
app.use(adminRoute);


app.listen(PORT, _ => console.log(`Server connected on port ${PORT}`));



