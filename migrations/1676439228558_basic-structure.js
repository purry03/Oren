/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
	pgm.createTable('users',{
		id: 'id',
		name: { type: 'varchar(50)', notNull: true, unique: true },
		password: {type: 'varchar(100)', notNull: true},
		createdAt: {
			type: 'timestamp',
			notNull: true,
			default: pgm.func('current_timestamp'),
		},
	});
	pgm.createTable('questions',{
		id: 'id',
		type: { type: 'varchar(50)', notNull: true },
		data: {type: 'json', notNull: true},
		createdAt: {
			type: 'timestamp',
			notNull: true,
			default: pgm.func('current_timestamp'),
		},
	});
};

exports.down = pgm => {};
