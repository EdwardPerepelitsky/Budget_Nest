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
exports.EnvelopeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const envelope_entity_1 = require("./entities/envelope.entity");
const transaction_service_1 = require("../transaction/transaction.service");
let EnvelopeService = class EnvelopeService {
    constructor(envelopeRepository, transactionService) {
        this.envelopeRepository = envelopeRepository;
        this.transactionService = transactionService;
    }
    createEnvelope(createEnvelopeDto) {
        const envelope = new envelope_entity_1.Envelope();
        envelope.category = createEnvelopeDto.category;
        envelope.budget = createEnvelopeDto.budget ? createEnvelopeDto.budget : 0;
        envelope.spent = createEnvelopeDto.spent ? createEnvelopeDto.spent : 0;
        envelope.transactions = createEnvelopeDto.transactions ?
            createEnvelopeDto.transactions : [];
        return this.envelopeRepository.save(envelope);
    }
    findAllEnvelope(findOptions) {
        return this.envelopeRepository.find(findOptions);
    }
    viewEnvelope(id) {
        return this.envelopeRepository.findOneBy({ id });
    }
    viewEnvelopeTransactions(id) {
        return this.transactionService.findAllTransaction({
            relations: {
                envelope: true
            },
            where: {
                envelope: {
                    id: id
                }
            },
            order: {
                id: "ASC"
            }
        });
    }
    updateEnvelope(id, updateEnvelopeDto) {
        const envelope = new envelope_entity_1.Envelope();
        if (updateEnvelopeDto.category) {
            envelope.category = updateEnvelopeDto.category;
        }
        if (updateEnvelopeDto.budget) {
            envelope.budget = updateEnvelopeDto.budget;
        }
        if (updateEnvelopeDto.spent) {
            envelope.spent = updateEnvelopeDto.spent;
        }
        if (updateEnvelopeDto.transactions) {
            envelope.transactions = updateEnvelopeDto.transactions;
        }
        envelope.id = id;
        return this.envelopeRepository.save(envelope);
    }
    async removeEnvelope(envelope) {
        await this.envelopeRepository.remove(envelope);
    }
    removeEnvelopeId(id) {
        return this.envelopeRepository.delete(id);
    }
};
exports.EnvelopeService = EnvelopeService;
exports.EnvelopeService = EnvelopeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(envelope_entity_1.Envelope)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        transaction_service_1.TransactionService])
], EnvelopeService);
//# sourceMappingURL=envelope.service.js.map