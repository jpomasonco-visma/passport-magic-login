import { Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req) {
    return { message: 'Logged in!', user: req.user };
  }

  @Get('logout')
  logout(@Req() req) {
    req.logout(() => {});
    return { message: 'Logged out' };
  }

  @Get('status')
  status(@Req() req) {
    return req.user ? { loggedIn: true, user: req.user } : { loggedIn: false };
  }
}
