
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose'


@Schema()
export class Settings{

    @Prop({required: true})
    telbotApiKey: string

    @Prop({required: true})
    weatherApiKey: string
}

export const settingsSchema = SchemaFactory.createForClass(Settings);