import { HashServiceProtocol } from '@application/protocols/infra';
import bcrypt from 'bcryptjs';

export class BcryptHashService extends HashServiceProtocol {
	hash(text: HashServiceProtocol.Hash.Params): HashServiceProtocol.Hash.Result {
		const salt = bcrypt.genSaltSync();

		return bcrypt.hashSync(text, salt);
	}

	verify({ text, hash }: HashServiceProtocol.Verify.Params): HashServiceProtocol.Verify.Result {
		return bcrypt.compareSync(text, hash);
	}
}
