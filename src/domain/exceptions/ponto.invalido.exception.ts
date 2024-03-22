import { DomainException } from './domain.exception';

export class PontoInvalidoException extends DomainException {
  constructor(message: string) {
    super(message, 400);
    this.name = 'PontoInvalidoException';
  }
}
