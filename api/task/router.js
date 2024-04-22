// build your `/api/tasks` router here
const router = require('express').Router();
const db = require('./model');
const projectDb = require('../project/model');

let fixCompleted = function(task) {
    task.task_completed = task.task_completed?true:false;
    return projectDb.get(task.project_id).then((project) => {
        task.project_name=project.project_name;
        task.project_description = project.project_description;
    });
}


router.post('/', (req, res) => {
    const {task_description, task_notes, task_completed, project_id} = req.body;

    if(!task_description || !project_id) {
        res.status(400).json();
        return;
    }

    let task = {
        task_description:task_description,
        task_notes:task_notes,
        task_completed:task_completed,
        project_id:project_id
    }

    projectDb.get(project_id).then((project) => {
        if(!project) {
            res.status(400);
            return;
        } else {
            db.insert(task).then((result) =>{ 
                result.task_completed=result.task_completed?true:false;
                res.status(200).json(result)
            });
        }

    }).catch((err) => {
        res.status(500).json(err);
        return;
    })


});

router.get('/', (req, res) => {
    Promise.all([db.get(), projectDb.get()]).then((values) => {
        const [tasks, projects] = values;
        let project_map = {}
        projects.map((project) => project_map[project.project_id]=project);
        tasks.map((task) => {
            task.task_completed=task.task_completed?true:false;
            let project = project_map[task.project_id];
            if(project) {
                task.project_name = project.project_name;
                task.project_description = project.project_description;
            }
        });
        res.status(200).json(tasks);
    })
});

module.exports = router;