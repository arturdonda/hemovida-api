import { DataTypes, ModelAttributes } from 'sequelize';

export const USER_MODEL: ModelAttributes = {
	id: {
		type: DataTypes.UUID,
		allowNull: false,
		primaryKey: true,
	},

	created_at: {
		type: DataTypes.DATE,
		allowNull: false,
	},

	updated_at: {
		type: DataTypes.DATE,
		allowNull: false,
	},

	first_name: {
		type: DataTypes.STRING(50),
		allowNull: false,
	},

	surname: {
		type: DataTypes.STRING(50),
		allowNull: false,
	},

	preferred_name: {
		type: DataTypes.STRING(100),
		allowNull: true,
	},

	email: {
		type: DataTypes.STRING(50),
		allowNull: false,
		unique: true,
	},

	phone: {
		type: DataTypes.STRING(11),
		allowNull: false,
		unique: true,
	},

	cpf: {
		type: DataTypes.STRING(11),
		allowNull: false,
		unique: true,
	},

	birthday: {
		type: DataTypes.DATEONLY,
		allowNull: false,
	},

	status: {
		type: DataTypes.ENUM('active', 'pending', 'inactive'),
		allowNull: false,
		defaultValue: 'pending',
	},

	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
};
