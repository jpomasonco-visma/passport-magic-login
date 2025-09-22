import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async findAll(): Promise<User[]> {
        return this.userModel.find().lean<User[]>().exec();
    }

    async create(email: string, password: string, name?: string, phone?:string): Promise<User> {
        const createdUser = new this.userModel({ email, password, name, phone });
        return createdUser.save();
    }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userModel.findOne({ email }).exec();
        if (user && user.password === password) {
            return user;
        }
        return null;
    }

    async findById(id: string): Promise<User | null> {
        return this.userModel.findById(id).exec();
    }

    async findByEmailOrPhone(value: string) {
        return this.userModel.findOne({
            $or: [{ email: value }, { phone: value }]
        }).exec();
    }

}
