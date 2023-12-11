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
exports.administratorController = void 0;
const database_1 = __importDefault(require("../database"));
class AdministratorController {
    validateAdministrator(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correoElectronico, contrasena } = req.body;
            const resp = yield database_1.default.query('SELECT * FROM administradores INNER JOIN usuarios on administradores.usuarioID=usuarios.usuarioID WHERE correoElectronico =? AND contrasena = ? AND administradores.usuarioID=usuarios.usuarioID ', [correoElectronico, contrasena]);
            if (resp.length > 0) {
                res.status(200).json({ mensaje: 'Acceso permitido' });
            }
            else {
                res.status(403).json({ mensaje: 'Administrador inexistente' });
            }
        });
    }
    showAdministrator(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT administradores.adminID,nombre, correoElectronico FROM `usuarios`INNER JOIN administradores ON usuarios.usuarioID=administradores.usuarioID where usuarios.usuarioID=administradores.usuarioID;');
            res.json(respuesta);
        });
    }
    showloanspropios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            ;
        });
    }
    UpdateAdministrator(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query("UPDATE administradores set ? WHERE admindID = ?", [req.body, id]);
            res.json(respuesta);
        });
    }
    Deleteadministrator(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query("DELETE FROM administradores WHERE adminID = ?", [id]);
            res.json(respuesta);
        });
    }
}
exports.administratorController = new AdministratorController();
