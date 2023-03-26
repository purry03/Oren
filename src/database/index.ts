import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import config from '../config';
import logger from '../utils/logger';

const sequelize = new Sequelize(`postgres://${config.PGUSER}:${config.PGPASSWORD}@${config.PGHOST}:${config.PGPORT!}/${config.PGDATABASE}`,{
	logging: msg => logger.debug(msg),
}); // Example for postgres

async function connect() {
	try {
		await sequelize.authenticate();
		logger.info('Connection to the database has been established successfully.');
	} catch (error) {
		logger.error('Unable to connect to the database:', error);
		process.exit();
	}
}

connect();


export type UserAttributes = {
	id: number,
	name: string,
	password?: string,
};

export interface UserInput extends Optional<UserAttributes, 'id'> {};

export class User extends Model<UserAttributes, UserInput> implements UserAttributes {
	public id!: number;
	public name!: string;
	public password!: string;
	// timestamps!
	public readonly createdAt!: Date;
}

User.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password:{
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	}
}, {
	timestamps: true,
	updatedAt: false,
	deletedAt: false,
	sequelize: sequelize,
	paranoid: false,
	modelName: 'user'
});

export type QuestionAttributes = {
	id: number,
	data: object,
	inputType: string,
	title: string|null,
};

export interface QuestionInput extends Optional<QuestionAttributes, 'id'> {};

export class Question extends Model<QuestionAttributes, QuestionInput> implements QuestionAttributes {
	public id!: number;
	public data!: object;
	public inputType!: string;
	public title!: string | null;
	// timestamps!
	public readonly createdAt!: Date;
}


Question.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	data: {
		type: DataTypes.JSON,
		allowNull: false,
	},
	inputType:{
		type: DataTypes.STRING,
		allowNull: true,
	},
	title:{
		type: DataTypes.STRING,
		allowNull: true,
		unique: true,
	}
}, {
	timestamps: true,
	updatedAt: false,
	deletedAt: false,
	sequelize: sequelize,
	paranoid: false,
	modelName: 'question'
});

export type ResponseAttributes = {
	id: number,
	user_id: number,
	data: object,
};

export interface ResponseInput extends Optional<ResponseAttributes, 'id'> {};

export class Response extends Model<ResponseAttributes, ResponseInput> implements ResponseAttributes {
	public id!: number;
	public user_id!: number;
	public data!: object;
	// timestamps!
	public readonly createdAt!: Date;
}

Response.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	user_id: {
		type: DataTypes.NUMBER,
		allowNull: false,
		unique: true,
	},
	data:{
		type: DataTypes.JSON,
		allowNull: false,
	}
}, {
	timestamps: true,
	updatedAt: false,
	deletedAt: false,
	sequelize: sequelize,
	paranoid: false,
	modelName: 'response'
});

