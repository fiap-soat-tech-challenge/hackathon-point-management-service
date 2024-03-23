import { UserEntity } from '../entities/user.entity';
import { User } from '../../domain/model/user';

export class UserConverter {
  public static toUser(entity: UserEntity): User {
    return new User(
      entity.id.toString(),
      entity.nome,
      entity.username,
      entity.matricula,
      entity.email,
      entity.password,
    );
  }

  public static toEntity(user: User): UserEntity {
    return new UserEntity(
      user.nome,
      user.username,
      user.matricula,
      user.email,
      user.password,
    );
  }
}
