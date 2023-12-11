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
exports.librosController = void 0;
const database_1 = __importDefault(require("../database"));
class LibrosController {
    createBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("INSERT INTO libros set ?", [req.body]);
            res.json(resp);
        });
    }
    searchIdenBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT libros.libroID, titulo, autor, descripcion, versioneslibro.tipo_version,generos.nombre,disponible FROM Libros INNER JOIN versioneslibro ON libros.libroID = versioneslibro.libroID INNER JOIN generos ON libros.libroID = generos.libroID where libro.libroID=?', [id]);
            res.json(respuesta);
        });
    }
    readinglistBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT listaID, libros.titulo, libros.autor, libros.descripcion, generos.nombre FROM `listaslectura` INNER JOIN libros ON listaslectura.libroID=libros.libroID INNER JOIN generos ON libros.libroID = generos.libroID where listaslectura.usuarioID=?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta);
                return;
            }
            res.status(403).json({ mensaje: 'No existe lista de lectura' });
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
    showBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT libros.libroID, titulo, autor, descripcion, versioneslibro.tipo_version,generos.nombre,disponible FROM Libros INNER JOIN versioneslibro ON libros.libroID = versioneslibro.libroID INNER JOIN generos ON libros.libroID = generos.libroID');
            res.json(respuesta);
        });
    }
    showBooks_not(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT libros.libroID, libros.titulo, libros.autor, ' +
                'CASE ' +
                'WHEN libros.disponible = 0 THEN "No disponible (atributo disponible=0)" ' +
                'WHEN versioneslibro.libroID IS NULL THEN "No disponible (no registrado en versioneslibro)" ' +
                'WHEN generos.libroID IS NULL THEN "No disponible (no registrado en generos)" ' +
                'ELSE "Disponible" ' +
                'END AS estado ' +
                'FROM libros ' +
                'LEFT JOIN versioneslibro ON libros.libroID = versioneslibro.libroID ' +
                'LEFT JOIN generos ON libros.libroID = generos.libroID;');
            res.json(respuesta);
        });
    }
    PopularBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT Libros.libroID, Libros.titulo, COUNT(Reseñas.resenaID) AS cantidadReseñas FROM Libros LEFT JOIN Reseñas ON Libros.libroID = Reseñas.libroID GROUP BY Libros.libroID ORDER BY cantidadReseñas DESC');
            res.json(respuesta);
        });
    }
    UpdatesBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query("UPDATE libros set ? WHERE libroID = ?", [req.body, id]);
            res.json(respuesta);
        });
    }
    DeleteBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query("DELETE FROM libros  WHERE libroID = ?", [id]);
            res.json(respuesta);
        });
    }
}
exports.librosController = new LibrosController();
