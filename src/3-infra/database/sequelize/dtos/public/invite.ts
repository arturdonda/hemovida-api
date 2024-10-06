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
			invitedBy: databaseInvite.invited_by,
			expiresAt: databaseInvite.expires_at,
		});

		return invite;
	}
}
