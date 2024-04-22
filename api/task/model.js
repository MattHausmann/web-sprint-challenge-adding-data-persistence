// build your `Task` model here
const db = require('../../data/dbConfig');

function get(id) {
    let query = db("tasks as t");
    if(id) {
        return query.where("t.task_id", id).first();
    } else {
        return query;
    }
}

function insert(task) {
    return db("tasks")
        .insert(task)
        .then(([id]) => get(id));
}

module.exports={get,insert}