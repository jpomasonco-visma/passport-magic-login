import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private usersService: UsersService) {
    super();
  }

    serializeUser(user: User, done: (err: Error | null, user: any) => void) {
    done(null, user.id);
    }


    async deserializeUser(userId: number, done: (err: Error | null, user: any) => void) {
    const user = await this.usersService.findAll().then(users =>
        users.find(u => u.id === userId),
    );
    done(null, user);
    }
}
