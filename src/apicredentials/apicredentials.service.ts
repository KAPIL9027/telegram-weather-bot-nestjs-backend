import { Injectable } from "@nestjs/common";
import { Settings } from "src/schemas/settings.schema";
import {Model} from 'mongoose'
import {InjectModel} from '@nestjs/mongoose'
import { UpdateBot } from "src/dto/settings.dto";

@Injectable()
export class ApiCredentialsService{
    constructor(@InjectModel(Settings.name) private settingsModel: Model<Settings>)
    {

    }

    async getBotSettings(): Promise<Settings>{
        const settings = await this.settingsModel.findOne({});
        return settings
    }

    async updateBotSettings(updateBotDto: UpdateBot,id: string): Promise<string>{
        console.log(updateBotDto);
        const {telbotApiKey,weatherApiKey} = await this.settingsModel.findById({_id: id});
        const updated = await this.settingsModel.updateOne({telbotApiKey,weatherApiKey},updateBotDto);
        console.log(updated);
        return 'successful'
    }
}