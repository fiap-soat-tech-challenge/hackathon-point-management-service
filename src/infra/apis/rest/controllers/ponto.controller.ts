import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { PontoUseCases } from '../../../../usecases/ponto.use.cases';
import { Ponto } from '../../../../domain/model/ponto';
import { PontoPresenter } from '../presenters/ponto.presenter';
import { PontoDto } from '../dtos/ponto.dto';
import { RelatorioDto } from '../dtos/relatorio.dto';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { UserUseCases } from '../../../../usecases/user.use.cases';

@ApiTags('Ponto')
@ApiResponse({ status: '5XX', description: 'Erro interno do sistema' })
@ApiBearerAuth()
@Controller('/api/ponto')
export class PontoController {
  private readonly logger = new Logger(PontoController.name);

  constructor(
    private pontoUseCases: PontoUseCases,
    private userUseCases: UserUseCases,
  ) {}

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
  @UseGuards(JwtAuthGuard)
  @Post()
  async registro(
    @Req() req: any,
    @Body() pontoDto: PontoDto,
  ): Promise<PontoPresenter> {
    const ponto = await this.pontoUseCases.addPonto(
      req.user.id,
      pontoDto.evento,
    );
    this.logger.log(`[Novo registro] ${pontoDto.evento} salvo com sucesso`);
    return new PontoPresenter(ponto, true);
  }

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
  @UseGuards(JwtAuthGuard)
  @Get(':data')
  async visualiza(
    @Req() req: any,
    @Param('data') data: string,
  ): Promise<Array<PontoPresenter>> {
    const pontos: Array<Ponto> = await this.pontoUseCases.getAllPontosByData(
      data,
      req.user.id,
    );
    return pontos.map((ponto) => new PontoPresenter(ponto, true));
  }

  @ApiOperation({
    summary: 'Gera e envia o relatório de registro de ponto mensal',
    description:
      'Gera relatório de registros de pontos realizados no mês e ano selecionado e envia por e-mail ao solicitante',
  })
  @ApiOkResponse({
    description: 'Relatório de registro de ponto gerado e enviado com sucesso',
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos ou incorretos',
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('relatorio')
  async relatorio(
    @Req() req: any,
    @Body() relatorioDto: RelatorioDto,
  ): Promise<void> {
    await this.pontoUseCases.relatorioMensal(
      req.user.id,
      relatorioDto.mes,
      relatorioDto.ano,
    );
  }
}
