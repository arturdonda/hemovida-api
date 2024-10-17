import { DataTypes, ModelAttributes } from 'sequelize';

export const INVITE_MODEL: ModelAttributes = {
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
		type: DataTypes.STRING(25),
		allowNull: false,
	},

	surname: {
		type: DataTypes.STRING(25),
		allowNull: false,
	},

	email: {
		type: DataTypes.STRING(50),
		allowNull: false,
		unique: true,
	},

	status: {
		type: DataTypes.ENUM('created', 'sent', 'accepted', 'expired', 'revoked'),
		allowNull: false,
		defaultValue: 'created',
	},

	created_by: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: 'users',
			key: 'id',
		},
	},

	sent_at: {
		type: DataTypes.DATE,
		allowNull: true,
	},

	sent_by: {
		type: DataTypes.UUID,
		allowNull: true,
	},

	revoked_at: {
		type: DataTypes.DATE,
		allowNull: true,
	},

	revoked_by: {
		type: DataTypes.UUID,
		allowNull: true,
	},

	expires_at: {
		type: DataTypes.DATE,
		allowNull: true,
	},
};
