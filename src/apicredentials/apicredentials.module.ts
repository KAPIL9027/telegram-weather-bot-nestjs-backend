import { Module } from "@nestjs/common/decorators";
import { ApiCredentialsController } from "./apicredentials.controller";
import {MongooseModule} from '@nestjs/mongoose'
import { Settings, settingsSchema } from "src/schemas/settings.schema";
import { ApiCredentialsService } from "./apicredentials.service";
@Module({
    imports: [MongooseModule.forFeature([{name: Settings.name, schema: settingsSchema}])],
    controllers: [ApiCredentialsController],
    providers: [ApiCredentialsService]
})
export class ApiCredentialsModule {
    
}