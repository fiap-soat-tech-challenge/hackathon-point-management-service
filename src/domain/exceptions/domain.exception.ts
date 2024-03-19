export abstract class DomainException extends Error {
  private readonly status: number;

  protected constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }

  getStatus(): number {
    return this.status;
  }
}
