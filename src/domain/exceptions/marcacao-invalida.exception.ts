import { DomainException } from './domain.exception';

export class MarcacaoInvalidaException extends DomainException {
  constructor(message: string) {
    super(message, 400);
    this.name = 'MarcacaoInvalidaException';
  }
}
