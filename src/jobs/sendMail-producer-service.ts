import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { MAIL_JOB } from 'src/constants/jobName';
import { MAIL_QUEUE } from 'src/constants/queueName';
import { CreateUserDto } from 'src/create-user/create-user.dto';

@Injectable()
class SendMailProducerService {
  constructor(
    @InjectQueue(MAIL_QUEUE)
    private fila: Queue,
  ) {}

  async sendMail(createUserDto: CreateUserDto) {
    await this.fila.add(MAIL_JOB, createUserDto);
  }
}

export { SendMailProducerService };
