import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity({ name: 'users' })
export class UserEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  nome: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  matricula: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  constructor(
    nome: string,
    username: string,
    matricula: string,
    email: string,
    password: string,
  ) {
    this.nome = nome;
    this.username = username;
    this.matricula = matricula;
    this.email = email;
    this.password = password;
  }

  get id(): ObjectId {
    return this._id;
  }

  set id(id: ObjectId) {
    this._id = id;
  }
}
