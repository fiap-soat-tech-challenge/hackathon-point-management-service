import { UserRepository } from '../domain/repositories/user.repository';
import { User } from '../domain/model/user';

export class UserUseCases {
  constructor(private readonly repository: UserRepository) {}

  async findByUsername(username: string): Promise<User | null> {
    return await this.repository.findByUsername(username);
  }

  async findByMatricula(matricula: string): Promise<User | null> {
    return await this.repository.findByMatricula(matricula);
  }

  async findById(id: string): Promise<User | null> {
    return await this.repository.findById(id);
  }

  async addUser(user: User): Promise<User> {
    return await this.repository.save(user);
  }
}
