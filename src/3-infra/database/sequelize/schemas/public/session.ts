import { DataTypes, ModelAttributes } from 'sequelize';

export const SESSION_MODEL: ModelAttributes = {
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

	user_id: {
		type: DataTypes.UUID,
		allowNull: false,
		references: { model: 'users', key: 'id' },
	},

	refresh_token: {
		type: DataTypes.UUID,
		allowNull: false,
		unique: true,
	},

	csrf_token: {
		type: DataTypes.UUID,
		allowNull: false,
		unique: true,
	},

	ip_address: {
		type: DataTypes.INET,
		allowNull: false,
	},

	user_agent: {
		type: DataTypes.TEXT,
		allowNull: false,
	},

	expires_at: {
		type: DataTypes.DATE,
		allowNull: false,
	},

	last_used_at: {
		type: DataTypes.DATE,
		allowNull: false,
	},

	is_revoked: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
};
