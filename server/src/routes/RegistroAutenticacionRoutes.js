"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class RegistroAutenticacionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
    }
}
const registroAutenticacionRoutes = new RegistroAutenticacionRoutes();
exports.default = registroAutenticacionRoutes.router;
