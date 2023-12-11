"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsuariosController_1 = require("../controllers/UsuariosController");
const auth_1 = require("../middleware/auth");
class ConfigurationRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/mostrardatos/:id', auth_1.validarToken, UsuariosController_1.usuariosController.SearchUserpersonal);
        this.router.put('/modificardatos/:id', auth_1.validarToken, UsuariosController_1.usuariosController.UpdateUsers);
        this.router.delete('/eliminardatos/:id', auth_1.validarToken, UsuariosController_1.usuariosController.DeleteUsers);
    }
}
const configurationRoutes = new ConfigurationRoutes();
exports.default = configurationRoutes.router;
