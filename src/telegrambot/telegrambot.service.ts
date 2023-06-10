
import { InjectModel } from '@nestjs/mongoose';

import {Settings} from '../schemas/settings.schema'
import { Injectable } from '@nestjs/common';
import {Model} from 'mongoose'
import { Subscription } from 'src/schemas/subscription.schema';
@Injectable()
export class TelegramBotService{
    constructor(@InjectModel(Settings.name) private settingsModel: Model<Settings>,@InjectModel(Subscription.name) private subscriptionModel: Model<Subscription>){
        const TelegramBot = require('node-telegram-bot-api')
        const axios = require('axios')
        const cron = require('node-cron');

        let token = "";
        let apiKey = "";
    this.getCredentials().then(async (data)=>{
        token = data.telbotApiKey;
        apiKey = data.weatherApiKey;
        const bot = new TelegramBot(token, {polling: true});

        this.cronScheduler(bot,cron,axios,apiKey);
        bot.onText(/\/subscribe (.+)/, async (msg:any, match:any) => {
            const resp = match[1]; // the captured "whatever"
            console.log(msg);
            const chatId = msg.chat.id;
            const name = msg.chat.first_name;
            try{
            console.log(resp);
            this.getWeatherData(axios,resp,apiKey).then((data)=>{
                console.log(data);
            bot.sendMessage(chatId, `City: ${data?.name}\nCountry: ${data.sys.country}\nCondition: ${data?.weather[0].main}\nTemperature: ${data?.main?.temp}°C\nFeels Like: ${data?.main?.feels_like}°C\nMinimum Temp: ${data?.main?.temp_min}°C\nMaximum Temp: ${data?.main?.temp_max}°C\n`);
            }).catch((e)=>{console.log(e.message)});
            const currentUser = await this.subscriptionModel.findOne({chatId});
            console.log(currentUser);
            if(!currentUser){
            const user = await this.subscriptionModel.create({name,chatId,city: resp,subscription: "active"});
            console.log(user);
            }
            else{
            const updateUser = await this.subscriptionModel.updateOne({chatId: currentUser.chatId},{city:resp});
            console.log(updateUser);
            }
            }
            catch(e){
            console.log(e.message);
            bot.sendMessage(chatId,'Please write the command in the format of /subscribe [cityname]')}
            });





            bot.onText(/\/weather (.+)/, async (msg:any, match:any) => {

                const resp = match[1]; 
                const chatId = msg.chat.id;
                try{
                console.log(resp);
                this.getWeatherData(axios,resp,apiKey).then((data)=>{
                    console.log(data);
                bot.sendMessage(chatId, `City: ${data?.name}\nCountry: ${data.sys.country}\nCondition: ${data?.weather[0].main}\nTemperature: ${data?.main?.temp}°C\nFeels Like: ${data?.main?.feels_like}°C\nMinimum Temp: ${data?.main?.temp_min}°C\nMaximum Temp: ${data?.main?.temp_max}°C\n`);
                }).catch((e)=>{console.log(e.message)});
                
                }
                catch(e)
                {
                console.log(e.message);
                bot.sendMessage(chatId,'Please write the command in the format of /weather [cityname]')
                    
                }
            });
        console.log(data);
    })
    .catch((e)=>{
        console.log(e);
    })

// Create a bot that uses 'polling' to fetch new updates

}
    async getCredentials(): Promise<Settings>{
        const arr = await this.settingsModel.find();
        const {telbotApiKey,weatherApiKey} = arr[0];
        return {telbotApiKey,weatherApiKey};
    }

    async cronScheduler(bot,cron,axios,apiKey){

        cron.schedule('0 9 * * *', async ()=>{
            console.log('cron job started');
            
          const subscribers = await this.subscriptionModel.find({subscription: "active"});
          subscribers.forEach(async (subscriber)=>{
          this.getWeatherData(axios,subscriber.city,apiKey).then((data)=>{
            bot.sendMessage(subscriber.chatId, `Your Daily Weather Update is here:\nCity: ${data?.name}\nCountry: ${data.sys.country}\nCondition: ${data?.weather[0].main}\nTemperature: ${data?.main?.temp}°C\nFeels Like: ${data?.main?.feels_like}°C\nMinimum Temp: ${data?.main?.temp_min}°C\nMaximum Temp: ${data?.main?.temp_max}°C\n`);
          })
          .catch((e)=>{
            console.log(e.message);
          })
          
          })
          
          },{timezone: "Asia/Kolkata"});
    }

    async getWeatherData(axios:any,city:any,apiKey:any): Promise<any>{
        const res = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = res.data;
        return data
    }
}