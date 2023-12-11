"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prestamosController = void 0;
const database_1 = __importDefault(require("../database"));
class PrestamosController {
    createloans(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("INSERT INTO prestamos set ?", [req.body]);
            res.json(resp);
        });
    }
    searchloans(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT libros.libroID, titulo, autor, descripcion, versioneslibro.tipo_version,generos.nombre,disponible FROM Libros INNER JOIN versioneslibro ON libros.libroID = versioneslibro.libroID INNER JOIN generos ON libros.libroID = generos.libroID');
            res.json(respuesta);
        });
    }
    showloanspropios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT prestamoID, libros.titulo, libros.autor, estado,versioneslibro.enlace FROM `prestamos` INNER JOIN libros ON prestamos.libroID=libros.libroID INNER JOIN versioneslibro ON libros.libroID=versioneslibro.libroID where prestamos.libroID=libros.libroID and estado="No Devuelto" and prestamos.usuarioID=?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta);
                return;
            }
            res.status(403).json({ 'mensaje': 'No existen prestamos' });
        });
    }
    availabletimeloans(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query("SELECT prestamoID, libros.titulo, CASE WHEN DATEDIFF(prestamos.fechaRecibo, CURRENT_DATE()) <= 0 THEN 'Devuelto' ELSE prestamos.estado END AS estado, DATEDIFF(prestamos.fechaRecibo, CURRENT_DATE()) AS diasRestantes FROM prestamos INNER JOIN libros ON prestamos.libroID = libros.libroID WHERE prestamos.usuarioID =?", [id]);
            res.json(resp);
        });
    }
    availabletimeloans_(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("SELECT Prestamos.prestamoID, Libros.titulo AS titulo_libro, Usuarios.nombre AS nombre_solicitante, Prestamos.fechaExpedicion, Prestamos.fechaRecibo, DATEDIFF(Prestamos.fechaRecibo, CURRENT_DATE()) AS diasRestantes, Prestamos.estado FROM Prestamos INNER JOIN Libros ON Prestamos.libroID = Libros.libroID INNER JOIN Usuarios ON Prestamos.usuarioID = Usuarios.usuarioID");
            res.json(resp);
        });
    }
    Updateloans(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query("UPDATE prestamos SET estado = 'Devuelto' WHERE prestamoID =?", [id]);
            res.json(resp);
        });
    }
}
exports.prestamosController = new PrestamosController();
