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
exports.reviewController = void 0;
const database_1 = __importDefault(require("../database"));
class ReviewController {
    createReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('INSERT INTO reseñas SET ?', [req.body]);
            res.json(respuesta);
        });
    }
    showsreviewsbook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT libros.libroID,libros.titulo,usuarios.nombre,comentario,calificacion FROM reseñas INNER JOIN usuarios ON reseñas.usuarioID=usuarios.usuarioID INNER JOIN libros ON reseñas.libroID=libros.libroID;');
            if (respuesta.length > 0) {
                res.json(respuesta);
                return;
            }
            res.status(403).json({ mensaje: 'No existen reseñas' });
        });
    }
    showreviewspropios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT resenaID, libros.titulo,comentario,calificacion FROM reseñas INNER JOIN libros ON reseñas.libroID=libros.libroID INNER JOIN usuarios on reseñas.usuarioID=usuarios.usuarioID WHERE reseñas.usuarioID=?;', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta);
                return;
            }
            res.status(403).json({ mensaje: 'No existen reseñas' });
        });
    }
    availabletimeloans(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query("SELECT prestamoID, libros.titulo, CASE WHEN DATEDIFF(prestamos.fechaRecibo, CURRENT_DATE()) <= 0 THEN 'Devuelto' ELSE prestamos.estado END AS estado, DATEDIFF(prestamos.fechaRecibo, CURRENT_DATE()) AS diasRestantes FROM prestamos INNER JOIN libros ON prestamos.libroID = libros.libroID WHERE prestamos.usuarioID =?", [id]);
            res.json(resp);
        });
    }
    Updatereviews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query("UPDATE reseñas set ? WHERE resenaID = ?", [req.body, id]);
            res.json(respuesta);
        });
    }
    Deletereviews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM reseñas WHERE resenaID = ${id}`);
            res.json(resp);
        });
    }
}
exports.reviewController = new ReviewController();
