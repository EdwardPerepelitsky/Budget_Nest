import { Envelope } from '../../envelope/entities/envelope.entity';
export declare class CreateUserDto {
    user_name: string;
    password: string;
    balance?: number;
    available_balance?: number;
    envelopes: Envelope[];
}
export declare class ChangePasswordDto {
    password: string;
    newPassword: string;
}
