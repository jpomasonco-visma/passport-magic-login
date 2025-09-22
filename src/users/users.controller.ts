import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // Obtener todos los usuarios (sin exponer contraseñas)
  @Get()
  async getAll() {
    const users = await this.usersService.findAll();
    return users.map(({ password, ...rest }) => rest);
  }

  // Crear usuario con email y contraseña
  @Post()
  async create(@Body() body: { email: string; password: string; name?: string }) {
    const user = await this.usersService.create(body.email, body.password, body.name);
    // No devolvemos la contraseña en la respuesta
    const { password, ...result } = user;
    return result;
  }
}
