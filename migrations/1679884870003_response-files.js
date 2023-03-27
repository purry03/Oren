/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
	pgm.createTable('files',{
		id: 'id',
		user_id: {
			type: 'integer',
			notNull: true,
			references: '"users"',
		},
		data: {type: 'json', notNull: true},
		createdAt: {
			type: 'timestamp',
			notNull: true,
			default: pgm.func('current_timestamp'),
		},
	});
};

exports.down = pgm => {};
