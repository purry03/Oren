import {Pool} from 'pg';

import config from '../config';

const pool = new Pool({
	user: config.PGUSER,
	host: config.PGHOST,
	database: config.PGDATABASE,
	password: config.PGPASSWORD,
	port: parseInt(config.PGPORT!),
});

export default pool;