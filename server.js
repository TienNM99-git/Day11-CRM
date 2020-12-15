const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/crm');
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

const Employer = require('./Models/Employer.js');
app.use(express.static('static'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static('static'));

app.post('/api/employee', function (req, res) {
    console.log('Received request to create new Employer');
    console.log(req.body);
    if (!req.body || !req.body.name) {
        return res.status(403).send('Name is required')
    }
    let employerInstance = new Employer(req.body);
    employerInstance.save()
        .catch(err => {
            console.log(err.toString());
            res.status(500).send(err.message);
        })
        .then(dbres => {
            console.log(dbres);
            res.json(dbres);
        })
});
app.get('/api/employee', function (req, res) {
    Employer.find()
        .catch(err => {
            console.log(err.toString());
            res.status(500).send(err.message);
        })
        .then(dbres => {
            console.log(dbres);
            res.json(dbres);
        })
});
app.get('/api/employee/:id', function (req, res) {
    Employer.findById(req.params.id)
        .catch(err => {
            console.log(err.toString());
            res.status(500).send(err.message);
        })
        .then(dbres => {
            console.log(dbres);
            res.json(dbres);
        })
});
app.delete('/api/employee/:id', function (req, res) {
    let deleteId = req.params.id;
    Employer.findByIdAndRemove(deleteId)
        .catch(err => {
            console.log(err.toString());
            res.status(500).send(err.message);
        })
        .then(dbres => {
            console.log(dbres);
            if(dbres) {res.json(dbres);}
            else res.status(404).send('Id not found');
        })
});

app.put('/api/employee/:id', function (req, res) {
    let putId = req.params.id;
    Employer.findByIdAndUpdate(putId, req.body)
        .catch(err => {
            console.log(err.toString());
            res.status(500).send(err.message);
        })
        .then(dbres => {
            console.log(dbres);
            if(dbres) {res.json(dbres);}
            else res.status(404).send('Id not found');
        });
});

console.log(Employer);
app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});