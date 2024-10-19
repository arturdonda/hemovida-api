import { Session } from '@domain/entities';
import { Model } from 'sequelize';

export class SessionDto {
	static map(model: Model): Session {
		const databaseSession = model.get();

		const session = Session.fromJSON({
			id: databaseSession.id,
			createdAt: databaseSession.created_at,
			updatedAt: databaseSession.updated_at,
			userId: databaseSession.user_id,
			status: databaseSession.status,
			refreshToken: databaseSession.refresh_token,
			csrfToken: databaseSession.csrf_token,
			ipAddress: databaseSession.ip_address,
			expiresAt: databaseSession.expires_at,
			metadata: databaseSession.metadata,
		});

		return session;
	}
}
