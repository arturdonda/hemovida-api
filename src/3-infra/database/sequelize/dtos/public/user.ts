import { User } from '@domain/entities';
import { Model } from 'sequelize';

export class UserDto {
	static map(model: Model): User {
		const databaseUser = model.get();

		const user = User.fromJSON({
			id: databaseUser.id,
			createdAt: databaseUser.created_at,
			updatedAt: databaseUser.updated_at,
			firstName: databaseUser.first_name,
			surname: databaseUser.surname,
			preferredName: databaseUser.preferred_name,
			email: databaseUser.email,
			phone: databaseUser.phone,
			cpf: databaseUser.cpf,
			birthday: databaseUser.birthday,
			status: databaseUser.status,
			password: databaseUser.password,
		});

		return user;
	}
}
