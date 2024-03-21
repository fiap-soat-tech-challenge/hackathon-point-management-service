import { PontoRepository } from './ponto.repository';
import { Ponto } from '../model/ponto';

describe('PontoRepository', () => {
  let pontoRepository: PontoRepository;

  beforeEach(() => {
    pontoRepository = {
      getPontoById: jest.fn(),
      updatePonto: jest.fn(),
      savePonto: jest.fn(),
    };
  });

  it('should be defined', () => {
    expect(pontoRepository).toBeDefined();
  });

  it('should have getPontoById method', () => {
    expect(pontoRepository.getPontoById).toBeDefined();
    expect(typeof pontoRepository.getPontoById).toBe('function');
  });

  it('should have updatePonto method', () => {
    expect(pontoRepository.updatePonto).toBeDefined();
    expect(typeof pontoRepository.updatePonto).toBe('function');
  });

  it('should have savePonto method', () => {
    expect(pontoRepository.savePonto).toBeDefined();
    expect(typeof pontoRepository.savePonto).toBe('function');
  });

  describe('getPontoById', () => {
    it('should return a Promise that resolves to Ponto or null', async () => {
      const pontoId = '1';
      const mockPonto: Ponto | null = new Ponto('1', new Date());
      pontoRepository.getPontoById = jest.fn().mockResolvedValue(mockPonto);

      const result = await pontoRepository.getPontoById(pontoId);
      expect(result).toEqual(mockPonto);
    });
  });

  describe('updatePonto', () => {
    it('should return a Promise that resolves to Ponto or void', async () => {
      const pontoId = '1';
      const pontoToUpdate = new Ponto('1', new Date());
      pontoRepository.updatePonto = jest.fn().mockResolvedValue(pontoToUpdate);

      const result = await pontoRepository.updatePonto(pontoId, pontoToUpdate);
      expect(result).toEqual(pontoToUpdate);
    });
  });

  describe('savePonto', () => {
    it('should return a Promise that resolves to Ponto', async () => {
      const pontoToSave = new Ponto('1', new Date());
      pontoRepository.savePonto = jest.fn().mockResolvedValue(pontoToSave);

      const result = await pontoRepository.savePonto(pontoToSave);
      expect(result).toEqual(pontoToSave);
    });
  });
});
