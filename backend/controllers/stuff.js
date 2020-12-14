const Thing = require('../models/Things')

    exports.creatThing = (req, res, next) => {
        const thingObject = JSON.parse(req.body.thing);
        // Delete _id from frontend
        delete thingObject._id;  
        const thing = new Thing({
           // L'opérateur spread ... est utilisé pour faire une copie de tous les éléments de req.body
            ...thingObject,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        });
        // save enregistre en db
        thing.save()
            .then(()=> res.status(200).json({message: 'Objet créé !'}))
            .catch(error => res.status(400).json({ error }));  
    }

    exports.getThingById = (req, res, next) => {
        Thing.findOne({ _id: req.params._id })
          .then(thing => res.status(200).json(thing))
          .catch(error => res.status(404).json({ error }));
    }

    exports.modifyThing= (req, res, next) => {
        Thing.updateOne({_id : req.params._id}, { ...req.body, _id:req.params._id})
          .then(() => res.status(200).json({message : 'Objet modifié !'}))
          .catch(error => res.status(400).json({error}));
    }

    exports.getAllThings= (req, res, next) => {
        Thing.find()
            .then(things=>res.status(200).json(things))
            .catch(error => res.status(400).json({ error }));
    }

    exports.getThingByTitle = (req, res, next) => {
        Thing.findOne({ title: req.params.title })
          .then(thing => res.status(200).json(thing))
          .catch(error => res.status(404).json({ error }));
    }

    exports.deleteThing = (req, res, next)=>{
        Thing.deleteOne({_id:req.params.id})
        .then(()=> res.status(200).json({message : 'Objet supprimé !'}))
        .catch(error => res.status(400).json({error}))
    }

