const Animal = require('../models/animal')
module.exports= {
    index:  (req, res) => {
        Animal.find()
            .then(data => res.json({mongooses: data}))
            .catch(err =>{
                res.json({errors: err.errors})
            })
    },

    show: (req, res) => {
        Animal.findOne({_id: req.params.id})
        .then(animals => res.json({mongoose : animals}))
        .catch(err => res.json({errors: err.errors}));
    },

    new: (req,res) => {
        res.render('new')
    },

    create: (req,res) => {
        Animal.create(req.body)
            .then(newAnimal => {
                res.redirect('/')
            })
            .catch(err => res.json(err));
    },

    edit: (req,res) => {
        Animal.findOne({_id: req.params.id})
            .then(animal => res.render('edit', {mongoose: animal}))
            .catch(err => res.json(err));
    },

    update: (req,res) => {
        Animal.findOneAndUpdate({_id: req.params.id}, req.body,{useFindAndModify: false})
            .then(animal => res.redirect(`/mongoose/${animal._id}`))
            .catch(err=> res.json(err));
    },

    destroy: (req,res) => {
        Animal.deleteOne({_id: req.params.id})
            .then (result => res.redirect('/'))
            .catch(err => res.json(err))
    }


}