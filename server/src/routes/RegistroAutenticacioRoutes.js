"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RegistroAutenticacionController_1 = require("../controllers/RegistroAutenticacionController");
class RegistroAutenticacionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //this.router.get('/',(req,res) => res.send('probando usuarios'));
        this.router.get('/crearUsuario/', RegistroAutenticacionController_1.registroAutenticacionController.createUsuario);
    }
}
const registroAutenticacionRoutes = new RegistroAutenticacionRoutes();
exports.default = registroAutenticacionRoutes.router;
