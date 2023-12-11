"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LibrosController_1 = require("../controllers/LibrosController");
const auth_1 = require("../middleware/auth");
class LibrosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/buscarlibro/', auth_1.validarToken, LibrosController_1.librosController.searchBooks);
        this.router.get('/mostrarlibros/', auth_1.validarToken, LibrosController_1.librosController.showBooks);
        this.router.get('/mostrarlibrospopulares/', auth_1.validarToken, LibrosController_1.librosController.PopularBooks);
        this.router.get('/mostrarlibro_detalles_/:id', auth_1.validarToken, LibrosController_1.librosController.searchIdenBooks);
        this.router.get('/mostrarlistalectura/:id', auth_1.validarToken, LibrosController_1.librosController.readinglistBooks);
    }
}
const librosRoutes = new LibrosRoutes();
exports.default = librosRoutes.router;
