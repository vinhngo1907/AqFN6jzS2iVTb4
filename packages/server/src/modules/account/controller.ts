import { Body, Controller, Get, Logger, Param, Patch } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AccountService } from "./service";
import { AccountDTO } from "./dto/account";

@ApiTags('Accounts')
@Controller('accounts')
export class AccountController {
    constructor(
        private readonly accountService: AccountService,
        private readonly logger: Logger,
    ) { }

    @Get("/:id")
    async findById(@Param('id') id: string): Promise<AccountDTO> {
        return this.accountService.findById(id);
    }

    @Get()
    async getAll(): Promise<AccountDTO[]> {
        return await this.accountService.findAll();
    }

    // Update Account by Id
    @Patch("/:id")
    async update(@Body() data) {

    }
}