import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose'
import { Subscription } from 'src/schemas/subscription.schema';


@Injectable()
export class UserService {
    constructor(@InjectModel(Subscription.name) private subscriptionModel: Model<Subscription>){}

    async getUsers() : Promise<Subscription[]> {
    const users = await this.subscriptionModel.find({});
    return users;
    }

    async blockUser(id: string): Promise<String>{
        
        const user = await this.subscriptionModel.findById({_id: id});
        user.subscription  = user.subscription === 'active' ? 'blocked' : 'active';
        await user.save();
        console.log(user);
        return 'success'
    }

    async deleteUser(id: string): Promise<String>{
        
        await this.subscriptionModel.deleteOne({_id: id});
        return "Succesfully deleted!!!";
    }
}