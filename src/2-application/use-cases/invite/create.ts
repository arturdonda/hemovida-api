import { Tracer } from '@domain/app';
import { Invite, User } from '@domain/entities';
import { DatabaseProtocol, EmailServiceProtocol } from '@application/protocols/infra';
import { CreateInviteUsecaseProtocol } from '@application/protocols/use-cases/invite';
import { AlreadyRegisteredError } from '@application/errors';

export class CreateInviteUsecase extends CreateInviteUsecaseProtocol {
	constructor(
		tracer: Tracer,
		private readonly inviteRepository: DatabaseProtocol.Repositories.Public.Invite,
		private readonly userRepository: DatabaseProtocol.Repositories.Public.User,
		private readonly emailService: EmailServiceProtocol
	) {
		super(tracer);
	}

	protected validateParams({ inviter, ...params }: CreateInviteUsecaseProtocol.Params): void {
		return Invite.validate({ ...params, invitedBy: inviter.id });
	}

	protected async main({ inviter, ...params }: CreateInviteUsecaseProtocol.Params): Promise<CreateInviteUsecaseProtocol.Result> {
		const user = await this.userRepository.getOne({ email: params.email });

		if (user !== null) throw new AlreadyRegisteredError(User, 'email');

		const inviteExists = await this.inviteRepository.getOne({ email: params.email });

		if (inviteExists !== null) throw new AlreadyRegisteredError(Invite, 'email');

		const invite = new Invite({ ...params, invitedBy: inviter.id });

		await this.sendInviteEmail(invite);

		invite.status = Invite.Status.Sent;

		return this.inviteRepository.create(invite);
	}

	private sendInviteEmail(invite: Invite) {
		const to = invite.email;
		const subject = 'Convite para a plataforma Hemovida API';
		const body = `
		<p>Ol&aacute; ${invite.firstName} ${invite.surname},</p>
		<p>Voc&ecirc; foi convidado(a) para participar da plataforma Hemovida API.</p>
		<p><a href="${process.env.UI_HOST}/invite/${invite.id}">Clique aqui</a> para fazer o seu cadastro.</p>
		`;

		return this.emailService.send({ to, subject, body });
	}
}
