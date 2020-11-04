
exports.up = function(knex) {
  return knex.schema.createTable('files', function(table) {
    table.increments('id').primary().comment('Auto-generated id');
    table.string('hash_name').notNullable().unique();
    table.string('name').notNullable();
    table.string('mimetype').notNullable();
    table.integer('size').notNullable();
    table.string('url').notNullable();
    table.integer('user_id').defaultTo(null).references('id').inTable('users');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('files');
};
