import { Funcionario } from '../../domain/model/funcionario';
import { Ponto } from '../../domain/model/ponto';
import { PontoPresenter } from '../apis/rest/presenters/ponto.presenter';

export class EmailHelper {
  public static bodyEmail(
    funcionario: Funcionario,
    relatorio: Array<Ponto>,
  ): string {
    const relatorioPresenter = relatorio.map(
      (ponto) => new PontoPresenter(ponto, true),
    );

    return `
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório Mensal de Ponto</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            padding: 20px;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
        }
        h1 {
            color: #333;
        }
        p {
            color: #666;
            line-height: 1.6;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            padding: 10px;
            border: 1px solid #ddd;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Relatório Mensal de Pontos do colaborador(a) ${funcionario.nome}</h1>
        <p>Segue abaixo o relatório de ponto:</p>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Data</th>
                    <th>Entrada</th>
                    <th>Intervalos</th>
                    <th>Saída</th>
                    <th>Total de Horas</th>
                </tr>
            </thead>
            <tbody>
                ${relatorioPresenter
                  .map(
                    (relatorio, index) => `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${relatorio.data}</td>
                        <td>${relatorio.entrada.data} ${relatorio.entrada.hora}</td>
                        <td>
                            <ul>
                                ${relatorio.intervalos
                                  .map(
                                    (intervalo) => `
                                    <li>${intervalo.dataHoraInicio.data} ${intervalo.dataHoraInicio.hora} - ${intervalo.dataHoraFim.data} ${intervalo.dataHoraFim.hora} (${intervalo.tempoDoIntervalo})</li>
                                `,
                                  )
                                  .join('')}
                            </ul>
                        </td>
                        <td>${relatorio.saida.data} ${relatorio.saida.hora}</td>
                        <td>${relatorio.totalHorasTrabalhadas}</td>
                    </tr>
                `,
                  )
                  .join('')}
            </tbody>
        </table>
    </div>
</body>
</html>
`;
  }
}
