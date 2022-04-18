import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { SendMailProducerService } from 'src/jobs/sendMail-producer-service';

@Controller('create-user')
export class CreateUserController {
  constructor(private mailService: SendMailProducerService) {}

  @Post('/')
  async createUser(@Body() createUser: CreateUserDto) {
    this.mailService.sendMail(createUser);
    return createUser;
  }
}
