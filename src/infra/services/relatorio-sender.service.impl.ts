import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { RelatorioSenderService } from '../../domain/services/relatorio-sender.service';
import { Ponto } from '../../domain/model/ponto';
import { EmailHelper } from '../shared/email.helper';
import { User } from '../../domain/model/user';

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

  async send(user: User, relatorio: Array<Ponto>): Promise<void> {
    const html = EmailHelper.bodyEmail(user, relatorio);
    await this._sendMail(
      user.email,
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
