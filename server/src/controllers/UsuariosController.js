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
exports.usuariosController = void 0;
const database_1 = __importDefault(require("../database"));
class UsuariosController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("INSERT INTO usuarios set ?", [req.body]);
            res.json(resp);
        });
    }
    ShowUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT usuarioID, nombre, correoElectronico FROM usuarios WHERE NOT EXISTS ( SELECT 1 FROM administradores WHERE administradores.usuarioID = usuarios.usuarioID );');
            res.json(respuesta);
        });
    }
    SearchUserpersonal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query("SELECT usuarioID, nombre ,correoElectronico ,contrasena FROM Usuarios WHERE  usuarioID NOT IN (SELECT usuarioID FROM Administradores) and  usuarioID =?", [id]);
            res.json(respuesta);
        });
    }
    SearchUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query("SELECT usuarioID, nombre ,correoElectronico  FROM Usuarios WHERE  usuarioID NOT IN (SELECT usuarioID FROM Administradores) and  usuarioID =?", [id]);
            res.json(respuesta);
        });
    }
    ValidateUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correoElectronico, contrasena } = req.body;
            const resp = yield database_1.default.query('SELECT * FROM usuarios WHERE correoElectronico = ? AND contrasena = ?', [correoElectronico, contrasena]);
            if (resp.length > 0) {
                res.status(200).json({ mensaje: 'Acceso concedido' });
            }
            else {
                res.status(403).json({ mensaje: 'Usuario inexistente' });
            }
        });
    }
    UpdateUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query("UPDATE usuarios set ? WHERE usuarioID = ?", [req.body, id]);
            res.json(respuesta);
        });
    }
    DeleteUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query("DELETE FROM usuarios WHERE usuarioID = ?", [id]);
            res.json(respuesta);
        });
    }
}
exports.usuariosController = new UsuariosController();
