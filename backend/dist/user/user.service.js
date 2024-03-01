"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const transaction_service_1 = require("../transaction/transaction.service");
const bcrypt_1 = require("bcrypt");
const envelope_service_1 = require("../envelope/envelope.service");
let UserService = class UserService {
    constructor(userRepository, transactionService, envelopeService) {
        this.userRepository = userRepository;
        this.transactionService = transactionService;
        this.envelopeService = envelopeService;
    }
    async createUser(createUserDto) {
        const user = new user_entity_1.User();
        user.user_name = createUserDto.user_name;
        user.password = await (0, bcrypt_1.hash)(createUserDto.password, 10);
        user.balance = createUserDto.balance ? createUserDto.balance : 0;
        user.available_balance = createUserDto.available_balance ?
            createUserDto.available_balance : 0;
        user.envelopes = createUserDto.envelopes ? createUserDto.envelopes : [];
        return this.userRepository.save(user);
    }
    findAllUser() {
        return this.userRepository.find();
    }
    viewUser(id) {
        return this.userRepository.findOneBy({ id });
    }
    viewUserByName(user_name) {
        return this.userRepository.findOneBy({ user_name });
    }
    async viewUserEnvelopes(id) {
        return this.envelopeService.findAllEnvelope({
            relations: {
                user: true
            },
            where: {
                user: { id: id }
            },
            order: {
                id: "ASC"
            }
        });
    }
    async viewUserTransactions(id) {
        return this.transactionService.findAllTransaction({
            relations: {
                envelope: {
                    user: true
                }
            },
            where: {
                envelope: {
                    user: {
                        id: id
                    }
                },
            },
            order: {
                tr_date: "DESC",
                id: "DESC"
            }
        });
    }
    updateUser(id, updateUserDto) {
        const user = new user_entity_1.User();
        if (updateUserDto.user_name) {
            user.user_name = updateUserDto.user_name;
        }
        if (updateUserDto.password) {
            user.password = updateUserDto.password;
        }
        if (updateUserDto.balance) {
            user.balance = updateUserDto.balance;
        }
        if (updateUserDto.available_balance) {
            user.available_balance = updateUserDto.available_balance;
        }
        if (updateUserDto.envelopes) {
            user.envelopes = updateUserDto.envelopes;
        }
        user.id = id;
        return this.userRepository.save(user);
    }
    removeUser(id) {
        return this.userRepository.delete(id);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        transaction_service_1.TransactionService,
        envelope_service_1.EnvelopeService])
], UserService);
//# sourceMappingURL=user.service.js.map