import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { RelatorioSenderService } from '../../domain/services/relatorio-sender.service';
import { Ponto } from '../../domain/model/ponto';
import { Funcionario } from '../../domain/model/funcionario';
import { EmailHelper } from '../shared/email.helper';

@Injectable()
export class RelatorioSenderServiceImpl implements RelatorioSenderService {
  private readonly logger = new Logger(RelatorioSenderServiceImpl.name);

  private transporter: any;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: configService.get('MAIL_HOST'),
      port: parseInt(configService.get('MAIL_PORT')),
      auth: {
        user: configService.get('MAIL_USER'),
        pass: configService.get('MAIL_PASS'),
      },
    });
  }

  async send(funcionario: Funcionario, relatorio: Array<Ponto>): Promise<void> {
    const html = EmailHelper.bodyEmail(funcionario, relatorio);
    await this._sendMail(
      funcionario.email,
      'Relatório Mensal de Ponto',
      'teste0bklaakakaka',
      html,
    );
  }

  async _sendMail(
    to: string,
    subject: string,
    text: string,
    html: string,
  ): Promise<void> {
    this.logger.log(`Enviando notificação relatório mensal para o funcionário`);
    const mailOptions = {
      from: 'point-management-app@mail.com',
      to,
      subject,
      text,
      html,
    };
    await this.transporter.sendMail(mailOptions);
  }
}
