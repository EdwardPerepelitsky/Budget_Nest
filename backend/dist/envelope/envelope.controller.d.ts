import { EnvelopeService } from './envelope.service';
import { CreateEnvelopeDto, RemoveEnvelopeDto } from './dto/create-envelope.dto';
import { UpdateEnvelopeDto } from './dto/update-envelope.dto';
import { UserService } from '../user/user.service';
export declare class EnvelopeController {
    private readonly envelopeService;
    private readonly userService;
    constructor(envelopeService: EnvelopeService, userService: UserService);
    create(createEnvelopeDto: CreateEnvelopeDto, req: any): Promise<{
        available_balance: number;
        envId: number;
        access_token: any;
    }>;
    remove(removeEnvelopeDto: RemoveEnvelopeDto, req: any): Promise<{
        available_balance: number;
        balance: number;
        access_token: any;
    }>;
    update(updateEnvelopeDto: UpdateEnvelopeDto, req: any): Promise<{
        available_balance: number;
        envBudget: number;
        envSpent: number;
        access_token: any;
    }>;
}
