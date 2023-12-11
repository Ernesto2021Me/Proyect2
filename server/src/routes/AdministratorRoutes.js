"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsuariosController_1 = require("../controllers/UsuariosController");
const AdministratorController_1 = require("../controllers/AdministratorController");
const LibrosController_1 = require("../controllers/LibrosController");
const VersionController_1 = require("../controllers/VersionController");
const ReviewController_1 = require("../controllers/ReviewController");
const PrestamosController_1 = require("../controllers/PrestamosController");
const GenerosController_1 = require("../controllers/GenerosController");
const auth_1 = require("../middleware/auth");
class AdministratorRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/mostrarusuarios/', auth_1.validarToken, UsuariosController_1.usuariosController.ShowUsers);
        this.router.delete('/eliminarusuario/:id', auth_1.validarToken, UsuariosController_1.usuariosController.DeleteUsers);
        //Administradores
        this.router.get('/mostraradministradores/', auth_1.validarToken, AdministratorController_1.administratorController.showAdministrator);
        this.router.delete('/eliminaradministrador/:id', AdministratorController_1.administratorController.Deleteadministrator);
        //Libros 
        this.router.get('/mostrarlibros/', auth_1.validarToken, LibrosController_1.librosController.showBooks);
        this.router.get('/mostrarlibrosestado/', auth_1.validarToken, LibrosController_1.librosController.showBooks_not);
        this.router.post('/buscarlibro/', auth_1.validarToken, LibrosController_1.librosController.searchBooks);
        this.router.post('/agregarlibros/', auth_1.validarToken, LibrosController_1.librosController.createBooks);
        this.router.put('/modificarlibros/:id', auth_1.validarToken, LibrosController_1.librosController.UpdatesBooks);
        this.router.delete('/eliminarlibros/:id', auth_1.validarToken, LibrosController_1.librosController.DeleteBooks);
        //Reseñas
        this.router.get('/mostrarreviews_book/', auth_1.validarToken, ReviewController_1.reviewController.showsreviewsbook);
        this.router.delete('/eliminarreviews/:id', auth_1.validarToken, ReviewController_1.reviewController.Deletereviews);
        //Versiones
        this.router.get('/mostrarversiones/', auth_1.validarToken, VersionController_1.versionController.showVersion);
        this.router.post('/asignarversion/', auth_1.validarToken, VersionController_1.versionController.createVersion);
        this.router.delete('/eliminarversion/:id', auth_1.validarToken, VersionController_1.versionController.DeleteVersion);
        //Prestamos
        this.router.get('/tiempodisponible_prestamos/', auth_1.validarToken, PrestamosController_1.prestamosController.availabletimeloans_);
        this.router.put('/devolverprestamos/:id', auth_1.validarToken, PrestamosController_1.prestamosController.Updateloans);
        //Generos   
        this.router.get('/mostrargeneros/', auth_1.validarToken, GenerosController_1.generosController.showAGenders);
        this.router.get('/mostrargeneros_libros/', auth_1.validarToken, GenerosController_1.generosController.showAGendersBook);
        this.router.post('/asignargeneros/', auth_1.validarToken, GenerosController_1.generosController.createGenders);
        this.router.delete('/eliminarvgeneros/:id', auth_1.validarToken, GenerosController_1.generosController.DeleteGenders);
    }
}
const administratorRoutes = new AdministratorRoutes();
exports.default = administratorRoutes.router;
