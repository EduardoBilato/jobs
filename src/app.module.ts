import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { CreateUserController } from './create-user/create-user.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { SendMailProducerService } from './jobs/sendMail-producer-service';
import { MAIL_QUEUE } from './constants/queueName';
import { SendMailConsumer } from './jobs/sendMail-consumer';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'cache',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: MAIL_QUEUE,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
    }),
  ],
  controllers: [CreateUserController],
  providers: [SendMailConsumer, SendMailProducerService], //tudo que tem @Injectable, é necessário estar declarado aqui no providers
})
export class AppModule {}
