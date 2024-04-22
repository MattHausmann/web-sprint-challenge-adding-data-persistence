// build your `/api/resources` router here
const router = require('express').Router();
const db = require('./model');

router.get('/', (req, res) => {
    db.get().then((resources) => {
        res.status(200).json(resources);
    });
})

router.get('/:id', (req, res) => {
    let id = req.params.id;
    db.get(id)
    .then((resource) => res.status(resource?200:404).json(resource?resource:null))
    .catch((err) => res.status(404));
})

router.post('/', (req, res) => {
    const {resource_name, resource_description} = req.body;
    if(!resource_name) {
        res.status(400).json({resource_name, resource_description});
    } else {
        db.insert({resource_name:resource_name, resource_description:resource_description})
        .then((result) =>res.status(200).json(result))
        .catch((err) => res.status(500).json(err));
    }

})

module.exports = router;