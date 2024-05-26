import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AppConfigService } from 'src/config/service';
import { Request } from 'express';
import { AuthService } from '../service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
        private readonly appConfig: AppConfigService
    ) {
        console.log(`>>>>>[${appConfig.getJwtConfig().secret}]<<<<`)
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    return request.cookies.Authentication;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: `${appConfig.getJwtConfig().secret}`,
        });
    }
    async validate(payload: any) {
        const user = await this.authService.validateJwtUser(payload);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}