import log4js from 'log4js';
log4js.configure({
	appenders: {
		out: { type: 'stdout' },
		console: { type: 'console' },
		app: { type: 'file', filename: 'application.log',layout: {
			type: 'pattern',
			pattern: '[%d] [%p] - %m%n',}},
	},
	categories: {
		default: { appenders: ['app'], level: 'info' },
		console: { appenders: ['console'], level: 'error' },
		'console.file': { appenders: ['app'], level: 'trace' },
	},
});
const logger = log4js.getLogger('console.file');
logger.level = 'all';

export default logger;