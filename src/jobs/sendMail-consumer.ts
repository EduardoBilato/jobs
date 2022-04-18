import { MailerService } from '@nestjs-modules/mailer';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  OnQueueWaiting,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { MAIL_JOB } from 'src/constants/jobName';
import { MAIL_QUEUE } from 'src/constants/queueName';
import { CreateUserDto } from 'src/create-user/create-user.dto';

@Processor(MAIL_QUEUE)
class SendMailConsumer {
  constructor(private mailService: MailerService) {}

  @Process(MAIL_JOB)
  async sendMailJob(job: Job<CreateUserDto>) {
    const { data } = job;
    const { email, name } = data;

    await this.mailService.sendMail({
      to: email,
      from: 'Equipe<equipe@empresa.com.br>',
      subject: 'Seja bem vindo(a)!',
      text: `Olá ${name}, seu cadastro foi realizado com sucesso.`,
    });
  }

  @OnQueueActive()
  onActive(job: Job<CreateUserDto>) {
    console.log(`Enviando email para ${job.data.name}<${job.data.email}>`);
  }

  @OnQueueError()
  onError(job: Job<CreateUserDto>) {
    console.error(`Erro job:\n${job}`);
  }

  @OnQueueCompleted()
  onCompleted(job: Job<CreateUserDto>) {
    console.info(`Email enviado com sucesso!`);
  }
}

export { SendMailConsumer };
