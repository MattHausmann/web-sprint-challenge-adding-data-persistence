// build your `/api/projects` router here
const router = require('express').Router();
const db = require('./model');

router.post('/', (req, res) => {
    const {project_name, project_description, project_completed} = req.body;
    
});
