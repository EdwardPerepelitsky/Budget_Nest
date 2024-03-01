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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const envelope_service_1 = require("../envelope/envelope.service");
const auth_guard_1 = require("../auth/auth.guard");
const bcrypt_1 = require("bcrypt");
let UserController = class UserController {
    constructor(userService, envelopeService) {
        this.userService = userService;
        this.envelopeService = envelopeService;
    }
    async create(createUserDto) {
        let depositDto = {
            category: 'deposit',
            budget: 0,
            spent: 0,
            transactions: []
        };
        let withdrawDto = {
            category: 'withdraw',
            budget: 0,
            spent: 0,
            transactions: []
        };
        let depositEnv;
        let withdrawEnv;
        try {
            depositEnv = await this.envelopeService.createEnvelope(depositDto);
            withdrawEnv = await this.envelopeService.createEnvelope(withdrawDto);
            createUserDto.envelopes = [];
            createUserDto.envelopes.push(depositEnv);
            createUserDto.envelopes.push(withdrawEnv);
            await this.userService.createUser(createUserDto);
        }
        catch (error) {
            try {
                await this.envelopeService.removeEnvelope(depositEnv);
                await this.envelopeService.removeEnvelope(withdrawEnv);
            }
            catch (error) {
                console.log(error);
            }
            if (error.detail && error.detail.includes('Key (user_name)=')) {
                throw new common_1.HttpException('Email already exists. Please pick a different email.', common_1.HttpStatus.CONFLICT);
            }
            console.log(error);
            return;
        }
        return { 'user_name': createUserDto['user_name'] };
    }
    getAccount(req) {
        return this.userService.viewUser(req.user.userId)
            .then((result) => { result['access_token'] = req['access_token']; return result; });
    }
    getEnvelopes(req) {
        return this.userService.viewUserEnvelopes(req.user.userId)
            .then((result) => { return { envelopes: result, access_token: req['access_token'] }; });
    }
    getTransactions(req) {
        return this.userService.viewUserTransactions(req.user.userId)
            .then((result) => { return { transactions: result, access_token: req['access_token'] }; });
    }
    async changePassword(req, changePasswordDto) {
        const userId = req.user.userId;
        const password = changePasswordDto.password;
        const newPassword = changePasswordDto.newPassword;
        let user = await this.userService.viewUser(userId);
        if (!user) {
            throw new common_1.HttpException('Email not found.', common_1.HttpStatus.NOT_FOUND);
        }
        const hashedPass = user.password;
        const comparison = await (0, bcrypt_1.compare)(password, hashedPass);
        if (comparison === false) {
            throw new common_1.UnauthorizedException('Wrong password.');
        }
        const hashedNewPass = await (0, bcrypt_1.hash)(newPassword, 10);
        let updateUserDto;
        let id;
        ({ id: id, ...updateUserDto } = user);
        updateUserDto.password = hashedNewPass;
        await this.userService.updateUser(id, updateUserDto);
        return {
            message: 'You have successfully changed your password.',
            access_token: req['access_token']
        };
    }
    checkLogin(req) {
        return {
            message: 'Logged in',
            access_token: req['access_token']
        };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('account'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAccount", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('envelopeinfo'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getEnvelopes", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('transactioninfo'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getTransactions", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('password'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('checkLogin'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "checkLogin", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        envelope_service_1.EnvelopeService])
], UserController);
//# sourceMappingURL=user.controller.js.map