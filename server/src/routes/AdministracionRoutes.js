"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AdministracionController_1 = require("../controllers/AdministracionController");
const UsuariosController_1 = require("../controllers/UsuariosController");
class AdministracionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    config() {
        //Usuarios
        this.router.get('/mostrarusuarios/', UsuariosController_1.usuariosController.ShowUsers);
        this.router.get('/mostrardatos_usuario_/:id', UsuariosController_1.usuariosController.SearchUser);
        this.router.delete('/eliminarcuenta_usuario_/:id', UsuariosController_1.usuariosController.DeleteUsers);
        //Administradores
        this.router.get('/mostraradministradores/', AdministracionController_1.admininistracionController.ShowAdministrators);
        this.router.get('/mostrardatos/:id', AdministracionController_1.admininistracionController.SearchAdministratorspersonal);
        this.router.get('/mostrardatos_administrador_/:id', AdministracionController_1.admininistracionController.SearchAdministrators);
        this.router.put('/modificardatos_administrador_/:id', AdministracionController_1.admininistracionController.UpdateAdministrators);
        this.router.delete('/eliminarcuenta_administrador_/:id', AdministracionController_1.admininistracionController.DeleteAdministrators);
    }
}
const administracionRoutes = new AdministracionRoutes();
exports.default = administracionRoutes.router;
