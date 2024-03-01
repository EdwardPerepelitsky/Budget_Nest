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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const transaction_entity_1 = require("./entities/transaction.entity");
let TransactionService = class TransactionService {
    constructor(transactionRepository) {
        this.transactionRepository = transactionRepository;
    }
    createTransaction(createTransactionDto) {
        const transaction = new transaction_entity_1.Transaction();
        transaction.amount = createTransactionDto.amount ? createTransactionDto.amount : 0;
        transaction.tr_date = createTransactionDto.tr_date ?
            createTransactionDto.tr_date : new Date();
        transaction.description = createTransactionDto.description ?
            createTransactionDto.description : '';
        return this.transactionRepository.save(transaction);
    }
    findAllTransaction(findOptions) {
        return this.transactionRepository.find(findOptions);
    }
    viewTransaction(id) {
        return this.transactionRepository.findOneBy({ id });
    }
    updateTransaction(id, updateTransactionDto) {
        const transaction = new transaction_entity_1.Transaction();
        if (transaction.amount) {
            transaction.amount = updateTransactionDto.amount;
        }
        if (transaction.tr_date) {
            transaction.tr_date = updateTransactionDto.tr_date;
        }
        if (transaction.description) {
            transaction.description = updateTransactionDto.description;
        }
        transaction.id = id;
        return this.transactionRepository.save(transaction);
    }
    async removeTransaction(trn) {
        await this.transactionRepository.remove(trn);
    }
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TransactionService);
//# sourceMappingURL=transaction.service.js.map