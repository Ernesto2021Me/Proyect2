"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PrestamosController_1 = require("../controllers/PrestamosController");
const auth_1 = require("../middleware/auth");
class PrestamosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/solicitarprestamos/', auth_1.validarToken, PrestamosController_1.prestamosController.createloans);
        this.router.get('/mostrarprestamos_propios/:id', auth_1.validarToken, PrestamosController_1.prestamosController.showloanspropios);
        this.router.get('/tiempodisponible_prestamo/:id', auth_1.validarToken, PrestamosController_1.prestamosController.availabletimeloans);
        this.router.put('/devolverprestamos/:id', auth_1.validarToken, PrestamosController_1.prestamosController.Updateloans);
    }
}
const prestamosRoutes = new PrestamosRoutes();
exports.default = prestamosRoutes.router;
