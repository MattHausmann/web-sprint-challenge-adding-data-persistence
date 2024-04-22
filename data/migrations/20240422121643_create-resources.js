/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('resources', tbl => {
        tbl.increments('resource_id');
        tbl.string('resource_name',128).notNullable().unique();
        tbl.text('resource_description');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('resources');  
};
