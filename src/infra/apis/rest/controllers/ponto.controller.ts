import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth, ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { PontoUseCases } from '../../../../usecases/ponto.use.cases';
import { Ponto } from '../../../../domain/model/ponto';
import { PontoPresenter } from '../presenters/ponto.presenter';
import { PontoDto } from '../dtos/ponto.dto';
import { Marcacao } from '../../../../domain/model/marcacao';

@ApiTags('Ponto')
@ApiResponse({ status: '5XX', description: 'Erro interno do sistema' })
@ApiBearerAuth()
@Controller('/api/ponto')
export class PontoController {
  private readonly logger = new Logger(PontoController.name);
  private FUNCIONARIO_ID = '65fcb34a3746a1a6bbe927ea';
  constructor(private pontoUseCases: PontoUseCases) {}

  /*
  Registro de Ponto: O sistema deve permitir que os usuários registrem o horário
  de entrada, intervalos e saída do trabalho. Isso deve incluir a data e a hora
  exatas do registro.
  O usuário apenas registra o evento, e o sistema obtém o horário do momento do
  registro.
   */
  @ApiOperation({
    summary: 'Registra um novo ponto',
    description: 'Salva um novo registro de ponto no sistema',
  })
  @ApiCreatedResponse({
    type: PontoPresenter,
    description: 'Registro de ponto salvo com sucesso',
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos ou incorretos',
  })
  @Post()
  async registro(@Body() pontoDto: PontoDto): Promise<PontoPresenter> {
    const ponto = await this.pontoUseCases.addPonto(
      this.FUNCIONARIO_ID,
      pontoDto.evento,
    );
    this.logger.log(`[Point Registration] Novo ponto salvo`);
    return new PontoPresenter(ponto);
  }

  /*
  Visualização de Registros: O sistema deve permitir que os usuários visualizem
  seus registros de ponto. Isso deve incluir todos os detalhes, como data, hora
  de entrada, intervalos e saída, e total de horas trabalhadas no dia.
   */
  @ApiOperation({
    summary: 'Visualiza os pontos registrados',
    description: 'Visualiza os pontos registrados no sistema',
  })
  @ApiOkResponse({
    type: PontoPresenter,
    description: 'Registros de ponto visualizados com sucesso',
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos ou incorretos',
  })
  @Get(':data')
  async visualiza(@Param('data') data: string): Promise<Array<PontoPresenter>> {
    const pontos: Array<Ponto> = await this.pontoUseCases.getAllPontosByData(data, this.FUNCIONARIO_ID);
    return pontos.map((ponto) => new PontoPresenter(ponto));
  }

  /*
  Relatórios: O sistema deve ser capaz de gerar o espelho de ponto mensal com
  base nos registros de ponto do mês fechado (anterior) e
  enviar esse relatório por e-mail ao solicitante.
  (Listagem das datas, batimentos de ponto e total de horas trabalhadas)
   */
  // @ApiOperation({
  //   summary: 'Gera relatório de registro de ponto',
  //   description: 'Gera relatório de registros de pontos realizados',
  // })
  // @ApiOkResponse({
  //   type: PontoPresenter,
  //   description: 'Relatório de registro de ponto gerado com sucesso',
  // })
  // @ApiBadRequestResponse({
  //   description: 'Dados inválidos ou incorretos',
  // })
  // @Get('relatorio')
  // async relatorio(): Promise<PontoPresenter[]> {
  //   const pontos: Ponto[] = await this.pontoUseCases.getPontos();
  //   this.logger.log(`[Point Report] Relatório de ponto gerado`);
  //   return pontos.map((ponto) => new PontoPresenter(ponto));
  // }
}
