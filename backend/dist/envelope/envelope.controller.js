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
exports.EnvelopeController = void 0;
const common_1 = require("@nestjs/common");
const envelope_service_1 = require("./envelope.service");
const create_envelope_dto_1 = require("./dto/create-envelope.dto");
const update_envelope_dto_1 = require("./dto/update-envelope.dto");
const user_service_1 = require("../user/user.service");
const auth_guard_1 = require("../auth/auth.guard");
let EnvelopeController = class EnvelopeController {
    constructor(envelopeService, userService) {
        this.envelopeService = envelopeService;
        this.userService = userService;
    }
    async create(createEnvelopeDto, req) {
        const budget = Number(createEnvelopeDto.budget);
        const userId = req.user.userId;
        let user = await this.userService.viewUser(userId);
        let availableBalance = Number(user.available_balance);
        if (budget > availableBalance) {
            throw new common_1.HttpException("You can't allocate more money than your available balance.", common_1.HttpStatus.CONFLICT);
        }
        availableBalance = availableBalance - budget;
        let Env;
        let envId;
        try {
            Env = await this.envelopeService.createEnvelope(createEnvelopeDto)
                .then((result) => { envId = result.id; return result; });
            let updateUserDto;
            let id;
            ({ id: id, ...updateUserDto } = user);
            updateUserDto.available_balance = availableBalance;
            await this.userService.viewUserEnvelopes(userId)
                .then((result) => updateUserDto.envelopes = result);
            updateUserDto.envelopes.push(Env);
            await this.userService.updateUser(id, updateUserDto);
        }
        catch (error) {
            try {
                await this.envelopeService.removeEnvelope(Env);
            }
            catch (error) {
                console.log(error);
            }
            console.log(error);
            return;
        }
        return {
            available_balance: availableBalance,
            envId: envId,
            access_token: req['access_token']
        };
    }
    async remove(removeEnvelopeDto, req) {
        const userId = req.user.userId;
        const eId = Number(removeEnvelopeDto.eId);
        const budget = Number(removeEnvelopeDto.budget);
        const spent = Number(removeEnvelopeDto.spent);
        let user = await this.userService.viewUser(userId);
        let availableBalance = Number(user.available_balance);
        let balance = Number(user.balance);
        availableBalance = availableBalance + budget + spent;
        balance = balance + spent;
        let updateUserDto;
        let id;
        ({ id: id, ...updateUserDto } = user);
        updateUserDto.available_balance = availableBalance;
        updateUserDto.balance = balance;
        try {
            await this.envelopeService.removeEnvelopeId(eId);
            await this.userService.updateUser(userId, updateUserDto);
        }
        catch (error) {
            console.log(error);
        }
        return {
            available_balance: availableBalance,
            balance: balance,
            access_token: req['access_token']
        };
    }
    async update(updateEnvelopeDto, req) {
        const userId = req.user.userId;
        const eId = Number(updateEnvelopeDto.eId);
        const deltaBudget = Number(updateEnvelopeDto.deltaBudget);
        let envBudget = Number(updateEnvelopeDto.budget);
        const envSpent = Number(updateEnvelopeDto.spent);
        let user = await this.userService.viewUser(userId);
        let availableBalance = Number(user.available_balance);
        if (deltaBudget > availableBalance) {
            throw new common_1.HttpException("You can't allocate more money than your available balance.", common_1.HttpStatus.CONFLICT);
        }
        if (deltaBudget < -envBudget) {
            throw new common_1.HttpException("You can't lower envelope budget below 0.", common_1.HttpStatus.CONFLICT);
        }
        envBudget = envBudget + deltaBudget;
        availableBalance = availableBalance - deltaBudget;
        let updateUserDto;
        let id;
        ({ id: id, ...updateUserDto } = user);
        updateUserDto.available_balance = availableBalance;
        updateEnvelopeDto.budget = envBudget;
        try {
            await this.envelopeService.updateEnvelope(eId, updateEnvelopeDto);
            await this.userService.updateUser(userId, updateUserDto);
        }
        catch (error) {
            console.log(error);
        }
        return {
            available_balance: availableBalance,
            envBudget: envBudget,
            envSpent: envSpent,
            access_token: req['access_token']
        };
    }
};
exports.EnvelopeController = EnvelopeController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('addenvelope'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_envelope_dto_1.CreateEnvelopeDto, Object]),
    __metadata("design:returntype", Promise)
], EnvelopeController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('removeenvelope'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_envelope_dto_1.RemoveEnvelopeDto, Object]),
    __metadata("design:returntype", Promise)
], EnvelopeController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('updateenvelope'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_envelope_dto_1.UpdateEnvelopeDto, Object]),
    __metadata("design:returntype", Promise)
], EnvelopeController.prototype, "update", null);
exports.EnvelopeController = EnvelopeController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [envelope_service_1.EnvelopeService,
        user_service_1.UserService])
], EnvelopeController);
//# sourceMappingURL=envelope.controller.js.map