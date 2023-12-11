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
exports.versionController = void 0;
const database_1 = __importDefault(require("../database"));
class VersionController {
    createVersion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("INSERT INTO versioneslibro set ?", [req.body]);
            res.json(resp);
        });
    }
    showVersion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("SELECT versionID,libros.titulo,tipo_version,enlace FROM `versioneslibro` INNER JOIN libros on versioneslibro.libroID=libros.libroID");
            res.json(resp);
        });
    }
    searchBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Identificador } = req.body;
            const respuesta = `SELECT libros.libroID, titulo, autor, descripcion, versioneslibro.tipo_version,generos.nombre,disponible FROM Libros INNER JOIN versioneslibro ON libros.libroID = versioneslibro.libroID
         INNER JOIN generos ON libros.libroID = generos.libroID
        WHERE titulo LIKE ? OR autor LIKE ?
    `;
            const resp = yield database_1.default.query(respuesta, [`%${Identificador}%`, `%${Identificador}%`]);
            if (resp.length > 0) {
                res.json(resp);
            }
            else {
                res.status(403).json({ mensaje: 'Libro inexistente' });
            }
        });
    }
    PopularBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT Libros.libroID, Libros.titulo, COUNT(Reseñas.resenaID) AS cantidadReseñas FROM Libros LEFT JOIN Reseñas ON Libros.libroID = Reseñas.libroID GROUP BY Libros.libroID ORDER BY cantidadReseñas DESC');
            res.json(respuesta);
        });
    }
    RecomendBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('');
            res.json(respuesta);
        });
    }
    UpdatesVersion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query("UPDATE versioneslibro set ? WHERE versionID = ?", [req.body, id]);
            res.json(respuesta);
        });
    }
    DeleteVersion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query("DELETE FROM versioneslibro Where versionID=?", [id]);
            res.json(resp);
        });
    }
}
exports.versionController = new VersionController();
