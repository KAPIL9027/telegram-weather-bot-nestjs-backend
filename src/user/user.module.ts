import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Subscription, subscriptionSchema } from 'src/schemas/subscription.schema';


@Module({
  imports: [MongooseModule.forFeature([{name: Subscription.name, schema: subscriptionSchema}])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}