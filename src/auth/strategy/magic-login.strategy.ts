import { Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";
import MagicLoginStrategy from "passport-magic-login";
import * as passport from 'passport';
import { error } from "console";

@Injectable()
export class MagicLoginStrategyProvider {
    constructor(private authService: AuthService) {
        const strategy = new MagicLoginStrategy({
            secret: 'default-secret',
            callbackUrl: '/auth/magic/callback',
            jwtOptions: {
                expiresIn: '10m',
            },
            sendMagicLink: async (destination: string, href: string) => {
                console.log('Magic Link:', href);
            },
            verify: async (payload, done) => {
                console.log('payload: ', payload);
                try {
                    const user = this.authService.validateUserEmailOrPhone(payload);
                    done(null, user);
                } catch(error) {
                    done(error);
                }
            },
        });

        passport.use('magic-link', strategy);
    }
}

