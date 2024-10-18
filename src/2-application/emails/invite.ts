import { EmailServiceProtocol } from '@application/protocols/infra';
import { Invite } from '@domain/entities';

export function createInviteEmail(invite: Invite): EmailServiceProtocol.Send.Params {
	const to = invite.email;
	const subject = 'Convite para a plataforma Hemovida API';
	const body = `
    <p>Ol&aacute; ${invite.firstName} ${invite.surname},</p>
    <p>Voc&ecirc; foi convidado(a) para participar da plataforma Hemovida API.</p>
    <p><a href="${process.env.UI_HOST}/invite/${invite.id}">Clique aqui</a> para fazer o seu cadastro.</p>
    `;

	return { to, subject, body };
}
