import * as dotenv from 'dotenv';
import path from 'node:path';

const pathToConfig = path.join(__dirname,'..','..','.env');

dotenv.config({path: pathToConfig});

const config = {...process.env};

export default config;