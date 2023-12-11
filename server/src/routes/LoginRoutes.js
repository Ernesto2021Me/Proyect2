"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsuariosController_1 = require("../controllers/UsuariosController");
const AdministratorController_1 = require("../controllers/AdministratorController");
const auth_1 = require("../middleware/auth");
class LoginRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/crearUsuario/', auth_1.validarToken, UsuariosController_1.usuariosController.createUser);
        this.router.post('/validarUsuario/', auth_1.validarToken, UsuariosController_1.usuariosController.ValidateUsers);
        this.router.post('/validaradmministrador/', auth_1.validarToken, AdministratorController_1.administratorController.validateAdministrator);
    }
}
const loginRoutes = new LoginRoutes();
exports.default = loginRoutes.router;
