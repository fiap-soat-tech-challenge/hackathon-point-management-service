import { Ponto } from './Ponto';

describe('Ponto', () => {
  describe('constructor', () => {
    it('should create a Ponto object with provided values', () => {
      const registro = new Date();
      const ponto = new Ponto('1', registro);
      expect(ponto).toBeInstanceOf(Ponto);
      expect(ponto.funcionarioId).toBe('1');
      expect(ponto.registro).toBe(registro);
      expect(ponto.id).toBe(null);
    });

    it('should create a Ponto object with provided id', () => {
      const registro = new Date();
      const ponto = new Ponto('1', registro, '1');
      expect(ponto).toBeInstanceOf(Ponto);
      expect(ponto.id).toBe('1');
    });
  });

  describe('getters and setters', () => {
    let ponto: Ponto;
    const registroInicial = new Date();

    beforeEach(() => {
      ponto = new Ponto('1', registroInicial);
    });

    it('should get and set registro', () => {
      const novoRegistro = new Date('2024-03-20T12:00:00Z');
      ponto.registro = novoRegistro;
      expect(ponto.registro).toBe(novoRegistro);
    });

    it('should not allow setting id directly', () => {
      expect(() => {
        (ponto as any)._id = '2';
      }).toThrow();
    });

    it('should not allow setting funcionarioId directly', () => {
      expect(() => {
        (ponto as any)._funcionarioId = '2';
      }).toThrow();
    });
  });
});
