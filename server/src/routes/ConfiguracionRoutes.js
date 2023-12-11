"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsuariosController_1 = require("../controllers/UsuariosController");
class ConfiguracionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    config() {
        this.router.get('/mostrardatos/:id', UsuariosController_1.usuariosController.SearchUserpersonal);
        this.router.put('/modificardatos/:id', UsuariosController_1.usuariosController.UpdateUsers);
        this.router.delete('/eliminarcuenta/:id', UsuariosController_1.usuariosController.DeleteUsers);
    }
}
const configuracionRoutes = new ConfiguracionRoutes();
exports.default = configuracionRoutes.router;
