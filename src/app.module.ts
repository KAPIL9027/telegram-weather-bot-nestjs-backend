import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import {ConfigModule} from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ApiCredentialsModule } from './apicredentials/apicredentials.module';
import { TelegramModule } from './telegrambot/telegram.module';


@Module({
  imports: [ConfigModule.forRoot(),ApiCredentialsModule,TelegramModule,UserModule,MongooseModule.forRoot(process.env.DB_URL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
