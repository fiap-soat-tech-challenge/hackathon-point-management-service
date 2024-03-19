import { DomainException } from './domain.exception';

export class NotFoundException extends DomainException {
  constructor(message: string) {
    super(message, 404);
    this.name = 'NotFoundException';
  }
}
