// build your `Resource` model here
const db = require('../../data/dbConfig');

function get(id) {
    let query = db("resources as r");

    if(id) {
        return query.where("r.resource_id", id)
            .first();
    } else {
        return query;
    }
}

function insert(resource) {
    for(let key in resource) {
        console.log(`${key}:${resource[key]}`);
    }
    console.log(`inserting ${resource}`);
    return db("resources")
        .insert(resource)
        .then(([id]) => get(id));
}

module.exports = {get,insert};