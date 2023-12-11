"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class AutoresRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    config() {
    }
}
const autoresRoutes = new AutoresRoutes();
exports.default = autoresRoutes.router;
