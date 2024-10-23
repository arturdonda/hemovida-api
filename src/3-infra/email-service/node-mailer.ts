import { EmailServiceProtocol } from '@application/protocols/infra';
import { createTransport, Transporter } from 'nodemailer';

export class NodemailerEmailService extends EmailServiceProtocol {
	private transporter: Transporter;

	constructor() {
		super();
		this.transporter = createTransport({
			service: 'Outlook',
			auth: {
				user: process.env.EMAIL_SERVICE_AUTH_USER,
				pass: process.env.EMAIL_SERVICE_AUTH_PASS,
			},
		});
	}
	send(params: EmailServiceProtocol.Send.Params): EmailServiceProtocol.Send.Result {
		return this.transporter.sendMail({
			from: process.env.EMAIL_SERVICE_AUTH_USER,
			to: params.to,
			cc: params.cc,
			bcc: params.bcc,
			subject: params.subject,
			html: params.body,
		});
	}
}
