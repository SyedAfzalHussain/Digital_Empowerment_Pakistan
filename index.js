const express = require('express');
// const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const { MongoClient } = require("mongodb");
const mongoose = require('mongoose');
dotenv.config();
const app = express();

// Replace the following with your Atlas connection string                                                                                                                                        
const url = `mongodb+srv://test:${process.env.DB_PSWD}@digitalpak.yl8cbcq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to MongoDB Atlas');
})
    .catch((err) => {
        console.log('Unable to connect to MongoDB Atlas');
        console.error(err);
    });

const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/about-us', (req, res) => {
    res.sendFile(__dirname + '/about.html');
});

app.get('/aims', (req, res) => {
    res.sendFile(__dirname + '/aims.html');
});

app.get('/woffer', (req, res) => {
    res.sendFile(__dirname + '/woffer.html');
});

app.get('/apply', (req, res) => {
    res.sendFile(__dirname + '/apply.html');
});

app.get('/apply-for-vol', (req, res) => {
    res.sendFile(__dirname + '/volunteerForm.html')
});

app.get('/apply-for-dir', async (req, res) => {
    res.sendFile(__dirname + '/directorForm.html');
});

const schema1 = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    gender: String,
    fbLink: String,
    instaLink: String,
    linkedinLink: String,
    region: String,
    institute: String,
    field: String,
    year: String,
    exp: String,
    skills: Array
});

const user1 = mongoose.model('Volunteer', schema1);

app.post('/volForm', (req, res) => {
    console.log("This is Volunteer Form ...")
    const propertyValues = Object.values(req.body);

    let skills = propertyValues.slice(12, propertyValues.length);
    
    console.log(skills)

    const usr1 = new user1({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.number,
        gender: req.body.gender,
        fbLink: req.body.fbLink,
        instaLink: req.body.instaLink,
        linkedinLink: req.body.LinkedlnLink,
        region: req.body.region,
        institute: req.body.inst,
        field: req.body.field,
        year: req.body.year,
        experience: req.body.experiences,
        skills: skills
    });

    usr1.save().then(() => console.log('inserted data into database'));
    res.redirect('/')
})

const schema = new mongoose.Schema({
    postfor: String,
    name: String,
    email: String,
    phone: String,
    gender: String,
    fbLink: String,
    instaLink: String,
    linkedinLink: String,
    region: String,
    institute: String,
    field: String,
    year: String,
    exp: String,
    skills: Array
});

const userDir = mongoose.model('CampusDirectors', schema);

const userVol = mongoose.model('Ambassador', schema);

app.post('/dirForm', (req, res) => {
    console.log('This is Directors Form ...')
    console.log(req.body)
    const propertyValues = Object.values(req.body);
    let skills = propertyValues.slice(13, propertyValues.length);
    console.log(skills);
    if (req.body.postfor === 'director') {
        const user1 = new userDir({
            postfor: req.body.postfor,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.number,
            gender: req.body.gender,
            fbLink: req.body.fbLink,
            instaLink: req.body.instaLink,
            linkedinLink: req.body.LinkedlnLink,
            region: req.body.region,
            institute: req.body.inst,
            field: req.body.field,
            year: req.body.year,
            experience: req.body.experiences,
            skills: skills
        });

        user1.save().then(() => console.log('inserted data into database'));
    }
    else {
        const user2 = new userVol({
            postfor: req.body.postfor,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.number,
            gender: req.body.gender,
            fbLink: req.body.fbLink,
            instaLink: req.body.instaLink,
            linkedinLink: req.body.LinkedlnLink,
            region: req.body.region,
            institute: req.body.inst,
            field: req.body.field,
            year: req.body.year,
            experience: req.body.experiences,
            skills: skills
        });

        user2.save().then(() => console.log('inserted data into database'));
    }

    res.redirect('/')
})

app.listen(port, () => {
    console.log(`Example app listening at http://${process.env.HOST}:${process.env.PORT}`);
});
