const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const app= express(); 

const connexionDb=process.env.DB_URL || DB_URL;

const Thing = require('./models/Things');

 mongoose.connect(connexionDb,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !')); 


app.use(bodyParser.json());



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next(); 
});

app.post('/api/stuff', (req, res, next) => {
// Delete _id from frontend
    delete req.body._id;  
    const thing = new Thing({
       // L'opérateur spread ... est utilisé pour faire une copie de tous les éléments de req.body
        ...req.body
    });
    // save enregistre en db
    thing.save()
        .then(()=> res.status(200).json({message: 'Objet créé !'}))
        .catch(error => res.status(400).json({ error }));  
});

app.get('/api/stuff/:_id', (req, res, next) => {
    Thing.findOne({ _id: req.params._id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
});

app.put('/api/stuff/:_id', (req, res, next) => {
    Thing.updateOne({_id : req.params._id}, { ...req.body, _id:req.params._id})
      .then(() => res.status(200).json({message : 'Objet modifié !'}))
      .catch(error => res.status(400).json({error}));
  });

app.get('/api/stuff', (req, res, next) => {
    Thing.find()
        .then(things=>res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
});

  app.get('/api/stuff/:title', (req, res, next) => {
    Thing.findOne({ title: req.params.title })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  });

 

  app.delete('/api/stuff/:id'), (req, res, next)=>{
    Thing.deleteOne({_id:req.params.id})
    .then(()=> res.status(200).json({message : 'Objet supprimé !'}))
    .catch(error => res.status(400).json({error}))
  }

  module.exports=app;