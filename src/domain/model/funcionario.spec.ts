import { Funcionario } from './funcionario';

describe('Funcionario', () => {
  describe('constructor', () => {
    it('should create a Funcionario object with provided values', () => {
      const funcionario = new Funcionario('12345678900', 'João da Silva');
      expect(funcionario).toBeInstanceOf(Funcionario);
      expect(funcionario.cpf).toBe('12345678900');
      expect(funcionario.nome).toBe('João da Silva');
      expect(funcionario.id).toBe(null);
    });

    it('should create a Funcionario object with provided id', () => {
      const funcionario = new Funcionario('12345678900', 'João da Silva', '1');
      expect(funcionario).toBeInstanceOf(Funcionario);
      expect(funcionario.id).toBe('1');
    });
  });

  describe('getters and setters', () => {
    let funcionario: Funcionario;

    beforeEach(() => {
      funcionario = new Funcionario('12345678900', 'João da Silva');
    });

    it('should get and set CPF', () => {
      funcionario.cpf = '98765432100';
      expect(funcionario.cpf).toBe('98765432100');
    });

    it('should get and set nome', () => {
      funcionario.nome = 'Maria Souza';
      expect(funcionario.nome).toBe('Maria Souza');
    });

    it('should not allow setting id directly', () => {
      expect(() => {
        (funcionario as any)._id = '2';
      }).toThrow();
    });
  });
});
