import express from 'express';
import helmet from 'helmet';
import minify from 'express-minify';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { authExtract } from './routes/middlewares/auth';
import path from 'path';


import config from './config';
import logger from './utils/logger';
import router from './routes/';
import { notFoundHandler } from './routes/middlewares/error';
import fileUpload from 'express-fileupload';

const app = express();

// Basic Configuration
app.set('view engine', 'ejs');  // set default view engine to ejs
app.set('views', path.join(__dirname,'..', '/views'));   // set views directory

// Basic Middlewares
app.use(helmet({
	contentSecurityPolicy: false,	// needed for font-awesome icons to load
}));  // obscure headers for security
app.use(minify());	// minifies css and js on the fly
app.use('/static', express.static(path.join(__dirname,'..','/public'))); // set static directory
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
	limits: { fileSize: 50 * 1024 * 1024 },	// 50 MB upload limit
}));
app.use(cookieParser());
app.use(authExtract);
app.use(router.v0); // use v0 routes

// Since this is the last non-error-handling
// middleware used, we assume 404, as nothing else
// responded.

app.use(notFoundHandler);

app.listen(config.PORT || 80,()=>{
	logger.info(`server online on port ${config.PORT}`);
});

process
	.on('unhandledRejection', (reason, p) => {
		logger.error(reason, 'Unhandled Rejection at Promise', p);
	})
	.on('uncaughtException', err => {
		logger.error(err, 'Uncaught Exception thrown');
	});