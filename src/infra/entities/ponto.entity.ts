import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity({ name: 'pontos' })
export class PontoEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  userId: ObjectId;

  @Column()
  data: Date;

  @Column()
  entrada: Date;

  @Column({
    array: true,
  })
  intervalos: Array<any>;

  @Column()
  saida: Date;

  @Column()
  totalHorasTrabalhadas: string;

  constructor(
    userId: ObjectId,
    data: Date,
    entrada: Date,
    intervalos: Array<any>,
    saida: Date,
    totalHorasTrabalhadas: string,
  ) {
    this.userId = userId;
    this.data = data;
    this.entrada = entrada;
    this.intervalos = intervalos;
    this.saida = saida;
    this.totalHorasTrabalhadas = totalHorasTrabalhadas;
  }

  get id(): ObjectId {
    return this._id;
  }

  set id(id: ObjectId) {
    this._id = id;
  }
}
