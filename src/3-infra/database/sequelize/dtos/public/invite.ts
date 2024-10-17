import { Invite } from '@domain/entities';
import { Model } from 'sequelize';

export class InviteDto {
	static map(model: Model): Invite {
		const databaseInvite = model.get();

		const invite = Invite.fromJSON({
			id: databaseInvite.id,
			createdAt: databaseInvite.created_at,
			updatedAt: databaseInvite.updated_at,
			firstName: databaseInvite.first_name,
			surname: databaseInvite.surname,
			email: databaseInvite.email,
			status: databaseInvite.status,
			createdBy: databaseInvite.created_by,
			sentAt: databaseInvite.sent_at,
			sentBy: databaseInvite.sent_by,
			revokedAt: databaseInvite.revoked_at,
			revokedBy: databaseInvite.revoked_by,
			expiresAt: databaseInvite.expires_at,
		});

		return invite;
	}
}
