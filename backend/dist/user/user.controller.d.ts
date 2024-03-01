import { UserService } from './user.service';
import { CreateUserDto, ChangePasswordDto } from './dto/create-user.dto';
import { EnvelopeService } from '../envelope/envelope.service';
import { Envelope } from '../envelope/entities/envelope.entity';
export declare class UserController {
    private readonly userService;
    private readonly envelopeService;
    constructor(userService: UserService, envelopeService: EnvelopeService);
    create(createUserDto: CreateUserDto): Promise<{
        user_name: string;
    }>;
    getAccount(req: any): Promise<import("./entities/user.entity").User>;
    getEnvelopes(req: any): Promise<{
        envelopes: Envelope[];
        access_token: any;
    }>;
    getTransactions(req: any): Promise<{
        transactions: import("../transaction/entities/transaction.entity").Transaction[];
        access_token: any;
    }>;
    changePassword(req: any, changePasswordDto: ChangePasswordDto): Promise<{
        message: string;
        access_token: any;
    }>;
    checkLogin(req: any): {
        message: string;
        access_token: any;
    };
}
