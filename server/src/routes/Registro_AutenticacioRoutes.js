"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class RegistroAutenticacionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //this.router.get('/',(req,res) => res.send('probando usuarios'));
        this.router.get('/crearUsuario/', registro_AutenticacionContoller.createUsuario);
    }
}
const registro_AutenticacionRoutes = new Registro_AutenticacioRoutes();
exports.default = RegistroAutenticacion.router;
