// build your `/api/projects` router here
const router = require('express').Router();
const db = require('./model');

function fixCompleted(project) {
    project.project_completed = project.project_completed?true:false;
}

router.post('/', (req, res) => {
    const {project_name,project_description,project_completed} = req.body;
    let project = {
        project_name:project_name,
        project_description:project_description,
        project_completed:project_completed
    }
    db.insert(project)
        .then((result) => {
            fixCompleted(result);
            res.status(200).json(result);
        })
        .catch((err) => res.status(400).json(err));
})

router.get('/', (req, res) => {
    db.get().then((result) => {
        result.map((obj) => fixCompleted(obj));
        res.status(200).json(result)
    });
});

router.get('/:id', (req, res) => {
    db.get(req.params.id).then((result) => {
        fixCompleted(result);
        res.status(200).json(result);
    });
});

module.exports = router;