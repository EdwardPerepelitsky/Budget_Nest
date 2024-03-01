"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvelopeModule = void 0;
const common_1 = require("@nestjs/common");
const envelope_service_1 = require("./envelope.service");
const envelope_controller_1 = require("./envelope.controller");
const typeorm_1 = require("@nestjs/typeorm");
const envelope_entity_1 = require("./entities/envelope.entity");
const user_module_1 = require("../user/user.module");
const transaction_module_1 = require("../transaction/transaction.module");
let EnvelopeModule = class EnvelopeModule {
};
exports.EnvelopeModule = EnvelopeModule;
exports.EnvelopeModule = EnvelopeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([envelope_entity_1.Envelope]), (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => transaction_module_1.TransactionModule)],
        controllers: [envelope_controller_1.EnvelopeController],
        providers: [envelope_service_1.EnvelopeService],
        exports: [envelope_service_1.EnvelopeService]
    })
], EnvelopeModule);
//# sourceMappingURL=envelope.module.js.map