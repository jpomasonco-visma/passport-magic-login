import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/user.schema';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async validateUser(email: string, password: string): Promise<User | null> {
        return this.usersService.validateUser(email, password);
    }

    async validateUserEmailOrPhone(value: string) {
        return this.usersService.findByEmailOrPhone(value);
    }
}
