// build your `Project` model here
const db = require('../../data/dbConfig');

function get(id) {
    let query = db("projects as p");
    if(id) {
        return query.where("p.project_id", id).first();
    } else {
        return query;
    }
}

function insert(project) {
    return db("projects")
        .insert(project)
        .then(([id]) => get(id));
}

module.exports={get,insert}