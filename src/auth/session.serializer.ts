import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/user.schema';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private usersService: UsersService) {
    super();
  }

    serializeUser(user: User, done: (err: Error | null, user: any) => void) {
    done(null, user.id);
    }


    async deserializeUser(userId: string, done: (err: any, user: any) => void) {
    const user = await this.usersService.findById(userId);
    done(null, user);
    }

}
