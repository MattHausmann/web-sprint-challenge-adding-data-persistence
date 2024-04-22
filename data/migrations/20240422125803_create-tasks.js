/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('tasks', tbl => {
        tbl.increments('task_id');
        tbl.text('task_description').notNullable();
        tbl.text('task_notes');
        tbl.boolean('task_completed').default(0);
        tbl.integer('project_id').notNullable().references('project');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('tasks');
  
};
