"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AController_1 = require("../controllers/AController");
class ARoutes {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    config() {
        this.router.post('/crear/', AController_1.aController.createReviews);
        this.router.get('/mostrarresenas/', AController_1.aController.showReviews);
        this.router.get('/mostrarresenaspropias/:id', AController_1.aController.showReviewspropias);
        this.router.put('/modificarresenas/:id', AController_1.aController.UpdateReviews);
        this.router.post('/eliminarresenas/:id', AController_1.aController.DeleteReviews);
    }
}
const aRoutes = new ARoutes();
exports.default = aRoutes.router;
