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
exports.TransactionController = void 0;
const common_1 = require("@nestjs/common");
const transaction_service_1 = require("./transaction.service");
const create_transaction_dto_1 = require("./dto/create-transaction.dto");
const envelope_service_1 = require("../envelope/envelope.service");
const auth_guard_1 = require("../auth/auth.guard");
const user_service_1 = require("../user/user.service");
let TransactionController = class TransactionController {
    constructor(transactionService, envelopeService, userService) {
        this.transactionService = transactionService;
        this.envelopeService = envelopeService;
        this.userService = userService;
    }
    async create(createTransactionDto, req) {
        const userId = req.user.userId;
        const eId = Number(createTransactionDto.eId);
        const typeTr = createTransactionDto.typeTr;
        const amount = Number(createTransactionDto.amount);
        let user = await this.userService.viewUser(userId);
        let balance = Number(user.balance);
        let availableBalance = Number(user.available_balance);
        let envelope = await this.envelopeService.viewEnvelope(eId);
        let updateEnvelopeDto;
        let id;
        ({ id: id, ...updateEnvelopeDto } = envelope);
        await this.envelopeService.viewEnvelopeTransactions(eId)
            .then((result) => updateEnvelopeDto.transactions = result);
        let updateUserDto;
        let uid;
        ({ id: uid, ...updateUserDto } = user);
        let trn;
        if (typeTr === 'deposit') {
            try {
                balance = balance + amount;
                availableBalance = availableBalance + amount;
                updateUserDto.balance = balance;
                updateUserDto.available_balance = availableBalance;
                trn = await this.transactionService.createTransaction(createTransactionDto);
                updateEnvelopeDto.transactions.push(trn);
                await this.envelopeService.updateEnvelope(eId, updateEnvelopeDto);
                await this.userService.updateUser(userId, updateUserDto);
            }
            catch (error) {
                try {
                    await this.transactionService.removeTransaction(trn);
                }
                catch (error) {
                    console.log(error);
                }
                console.log(error);
                return;
            }
            return {
                balance: balance,
                availableBalance: availableBalance,
                access_token: req['access_token']
            };
        }
        if (typeTr === 'withdraw') {
            if (amount > availableBalance) {
                throw new common_1.HttpException("You can't withdraw more money than available.", common_1.HttpStatus.CONFLICT);
            }
            try {
                balance = balance - amount;
                availableBalance = availableBalance - amount;
                updateUserDto.balance = balance;
                updateUserDto.available_balance = availableBalance;
                trn = await this.transactionService.createTransaction(createTransactionDto);
                updateEnvelopeDto.transactions.push(trn);
                await this.envelopeService.updateEnvelope(eId, updateEnvelopeDto);
                await this.userService.updateUser(userId, updateUserDto);
            }
            catch (error) {
                try {
                    await this.transactionService.removeTransaction(trn);
                }
                catch (error) {
                    console.log(error);
                }
                console.log(error);
                return;
            }
            return {
                balance: balance,
                availableBalance: availableBalance,
                access_token: req['access_token']
            };
        }
        let envelopeBalance = Number(envelope.budget);
        let envelopeSpent = Number(envelope.spent);
        if (amount > envelopeBalance) {
            throw new common_1.HttpException("You can't spend more money than allocated for this category.", common_1.HttpStatus.CONFLICT);
        }
        try {
            envelopeBalance = envelopeBalance - amount;
            envelopeSpent = envelopeSpent + amount;
            balance = balance - amount;
            updateUserDto.balance = balance;
            updateUserDto.available_balance = availableBalance;
            trn = await this.transactionService.createTransaction(createTransactionDto);
            updateEnvelopeDto.transactions.push(trn);
            updateEnvelopeDto.budget = envelopeBalance;
            updateEnvelopeDto.spent = envelopeSpent;
            await this.envelopeService.updateEnvelope(eId, updateEnvelopeDto);
            await this.userService.updateUser(userId, updateUserDto);
        }
        catch (error) {
            try {
                await this.transactionService.removeTransaction(trn);
            }
            catch (error) {
                console.log(error);
            }
            console.log(error);
            return;
        }
        return {
            envBudget: envelopeBalance,
            envSpent: envelopeSpent,
            balance: balance,
            access_token: req['access_token']
        };
    }
};
exports.TransactionController = TransactionController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('addtransaction'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transaction_dto_1.CreateTransactionDto, Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "create", null);
exports.TransactionController = TransactionController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService,
        envelope_service_1.EnvelopeService,
        user_service_1.UserService])
], TransactionController);
//# sourceMappingURL=transaction.controller.js.map