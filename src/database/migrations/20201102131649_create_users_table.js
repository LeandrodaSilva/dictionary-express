
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary().comment('Auto-generated id');
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
