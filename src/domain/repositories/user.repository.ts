import { User } from '../model/user';

export interface UserRepository {
  findByUsername(username: string): Promise<User | null>;
  findByMatricula(matricula: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<User>;
}
