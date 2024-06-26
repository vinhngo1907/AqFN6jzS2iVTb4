import { Body, Controller, Get, HttpCode, Injectable, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { AuthService } from "./service";
import RequestWithAccount from "./interfaces/RequestWithAccount";
import { Response } from 'express';
import { LoginPayload, RegisterPayload } from "./types";
import { Public } from "./decorator";
import { LocalAuthGuard } from "./guards/local";

@Injectable()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    // @HttpCode(200)
    // @ApiBody(
    //     type:LoginPayload
    // )
    // @Public()
    @UseGuards(LocalAuthGuard)
    @Post("login")
    async login(
        @Req() req: RequestWithAccount,
        @Res() res: Response) {
        const { cookie, user: paredUser } = await this.authService.login(req.user);
        res.setHeader('Set-cookie', cookie);
        return res.send(paredUser)
    };

    @Get("isLoggedIn")
    isLoggedIn(@Res() res: Response) {
        return res.send(true);
    }

    @HttpCode(200)
    @Get('logout')
    logout(@Res() res: Response) {
        const emptyCookie = this.authService.getEmptyCookie();
        res.setHeader('Set-cookie', emptyCookie);
        return res.send();
    }

    // @HttpCode(200)
    // @ApiBody({
    //     type: RegisterPayload,
    // })
    // @Public()
    @Post("register")
    async register(
        @Body() registerPayload,
        @Res() res: Response
    ): Promise<any> {
        const { cookie, user } = await this.authService.register(registerPayload);
        res.setHeader('Set-header', cookie);
        return res.send(user);
    }

    @Get("profile")
    async getProfile(@Req() req, @Res() res: Response) {
        return res.send(req.user)
    }
}
