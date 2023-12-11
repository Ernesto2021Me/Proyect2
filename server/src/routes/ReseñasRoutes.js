"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Rese_asController_1 = require("../controllers/Rese\u00F1asController");
class ReseñasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    config() {
        this.router.post('/crearresenas/', Rese_asController_1.reseñaController.createReviews);
        this.router.get('/mostrarresenas/', Rese_asController_1.reseñaController.showReviews);
        this.router.get('/mostrarresenaspropias/:id', Rese_asController_1.reseñaController.showReviewspropias);
        this.router.put('/modificarresenas/:id', Rese_asController_1.reseñaController.UpdateReviews);
        this.router.post('/eliminarresenas/:id', Rese_asController_1.reseñaController.DeleteReviews);
    }
}
const reseñasRoutes = new ReseñasRoutes();
exports.default = reseñasRoutes.router;
