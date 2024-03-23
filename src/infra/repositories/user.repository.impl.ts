import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserEntity } from '../entities/user.entity';
import { User } from '../../domain/model/user';
import { UserConverter } from '../shared/user.converter';
import { ObjectId } from 'mongodb';

export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async findByUsername(username: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({
      where: { username: username },
    });

    if (userEntity === null) return null;
    return UserConverter.toUser(userEntity);
  }

  async findByMatricula(matricula: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({
      where: { matricula: matricula },
    });

    if (userEntity === null) return null;
    return UserConverter.toUser(userEntity);
  }

  async findById(id: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({
      where: { _id: new ObjectId(id) },
    });

    if (userEntity === null) return null;
    return UserConverter.toUser(userEntity);
  }

  async save(user: User): Promise<User> {
    const userEntity = await this.repository.save(UserConverter.toEntity(user));
    return UserConverter.toUser(userEntity);
  }
}
