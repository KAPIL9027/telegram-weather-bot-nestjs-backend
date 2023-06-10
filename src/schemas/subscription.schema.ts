import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose'

@Schema()
export class Subscription{
        
        @Prop({required: true})
        name: string;
        
        @Prop({required: true})
        chatId: string;

        @Prop({required: true})
        city: string

        @Prop({required: true})
        subscription: string

} 

export const subscriptionSchema = SchemaFactory.createForClass(Subscription)