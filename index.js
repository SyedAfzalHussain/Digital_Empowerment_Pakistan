const express = require('express');
// const cors = require('cors');
const fs = require('fs');
const dotenv = require('dotenv');
// const firebaseConfig = require('./firebaseConfig');
const app = express();

dotenv.config();
// app.use(cors());
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

app.get('/apply-for-amb', (req, res) => {
    res.sendFile(__dirname + '/volunteerForm.html')
});

app.get('/apply-for-dir', async (req, res) => {
    res.sendFile(__dirname + '/directorForm.html');
});

app.post('/volForm', (req, res) => {
    console.log(req.body)
    console.log('director form')
    const formData = req.body;
    const jsonData = JSON.stringify(formData);
  
    fs.writeFile('data.json', jsonData, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving data');
      } else {
        res.send('Data saved successfully');
        console.log('Data saved successfully')
        res.redirect('/')
      }
    });
    res.redirect('/')
})

app.post('/dirForm', (req, res) => {
    console.log(req.body)
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`Example app listening at http://${process.env.HOST}:${process.env.PORT}`);
});
