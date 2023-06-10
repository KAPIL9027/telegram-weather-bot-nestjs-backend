import {Module} from '@nestjs/common'
import { TelegramBotService } from './telegrambot.service';
import {MongooseModule} from '@nestjs/mongoose'
import { Settings,settingsSchema } from 'src/schemas/settings.schema';
import { Subscription, subscriptionSchema } from 'src/schemas/subscription.schema';

@Module({
    imports: [MongooseModule.forFeature([{name: Settings.name, schema: settingsSchema},{name: Subscription.name, schema: subscriptionSchema}])],
    controllers: [],
    providers: [TelegramBotService]
})
export class TelegramModule{

}