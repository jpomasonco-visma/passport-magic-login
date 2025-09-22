import { Controller, Post, UseGuards, Req, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RequestMagicLinkDto } from './dto/RequestMagicLinkDto';

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

  @Post('magic')
  @UseGuards(AuthGuard('magic-link'))
  requestMagic(@Body() body: RequestMagicLinkDto) {
    return { message: `Magic link requested for ${body?.destination}` };
  }

  @Get('magic/callback')
  @UseGuards(AuthGuard('magic-link'))
  magicCallback(@Req() req) {
    return { message: 'Authenticated via magic link', user: req.user };
  }

}
