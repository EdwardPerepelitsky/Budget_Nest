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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Envelope = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const transaction_entity_1 = require("../../transaction/entities/transaction.entity");
let Envelope = class Envelope {
};
exports.Envelope = Envelope;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Envelope.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 32 }),
    __metadata("design:type", String)
], Envelope.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', default: 0 }),
    __metadata("design:type", Number)
], Envelope.prototype, "budget", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', default: 0 }),
    __metadata("design:type", Number)
], Envelope.prototype, "spent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_entity_1.User, user => user.envelopes),
    __metadata("design:type", user_entity_1.User)
], Envelope.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => transaction_entity_1.Transaction, transaction => transaction.envelope, { onDelete: "CASCADE" }),
    __metadata("design:type", Array)
], Envelope.prototype, "transactions", void 0);
exports.Envelope = Envelope = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)(["user", "category"], { unique: true })
], Envelope);
//# sourceMappingURL=envelope.entity.js.map