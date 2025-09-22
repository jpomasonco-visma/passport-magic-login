import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAll() {
    return this.usersService.findAll();
  }

@Post()
async create(@Body() body: { email: string; password: string; name?: string; phone?: string }) {
  const user = await this.usersService.create(body.email, body.password, body.name, body.phone);
  return user;
}

}