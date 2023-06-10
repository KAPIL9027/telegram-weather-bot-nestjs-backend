
import { Controller, Get, Put, Param, Body } from "@nestjs/common";
import { ApiCredentialsService } from "./apicredentials.service";
import { UpdateBot } from "src/dto/settings.dto";


@Controller('bot')
export class ApiCredentialsController{

    constructor(private readonly apiCredentialsService: ApiCredentialsService){}

    @Get()
    getBotSettings(){
        return this.apiCredentialsService.getBotSettings();
    }

    @Put('/update/:id')
    updateBotSettings(@Param('id') id: string, @Body() updateBotDto: UpdateBot){
        this.apiCredentialsService.updateBotSettings(updateBotDto,id);
    }
}