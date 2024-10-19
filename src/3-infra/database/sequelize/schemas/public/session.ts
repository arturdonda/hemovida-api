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

	status: {
		type: DataTypes.ENUM('active', 'expired', 'revoked'),
		allowNull: false,
		defaultValue: 'active',
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

	expires_at: {
		type: DataTypes.DATE,
		allowNull: false,
	},

	metadata: {
		type: DataTypes.JSONB,
		allowNull: false,
	},
};
