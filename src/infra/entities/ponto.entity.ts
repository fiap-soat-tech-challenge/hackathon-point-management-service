import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity({ name: 'pontos' })
export class PontoEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  funcionarioId: ObjectId;

  @Column()
  data: Date;

  @Column({
    array: true,
  })
  marcacoes: Array<any>;

  @Column()
  totalHorasTrabalhadas: string;

  constructor(
    funcionarioId: ObjectId,
    data: Date,
    marcacoes: Array<any>,
    totalHorasTrabalhadas: string,
  ) {
    this.funcionarioId = funcionarioId;
    this.data = data;
    this.marcacoes = marcacoes;
    this.totalHorasTrabalhadas = totalHorasTrabalhadas;
  }

  get id(): ObjectId {
    return this._id;
  }

  set id(id: ObjectId) {
    this._id = id;
  }
}
