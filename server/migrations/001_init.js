exports.up = async (knex) => {
  await knex.schema.createTable('users', (t) => {
    t.increments('id');
    t.string('email').notNullable().unique();
    t.string('password').notNullable();
    t.timestamps(true, true);
  });

  await knex.schema.createTable('templates', (t) => {
    t.increments('id');
    t.string('name').notNullable();
    t.text('description');
    t.string('thumbnail_url');
    t.string('category');
  });

  await knex.schema.createTable('favorites', (t) => {
    t.increments('id');
    t.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
    t.integer('template_id').references('id').inTable('templates').onDelete('CASCADE');
    t.unique(['user_id', 'template_id']);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('favorites');
  await knex.schema.dropTableIfExists('templates');
  await knex.schema.dropTableIfExists('users');
};
