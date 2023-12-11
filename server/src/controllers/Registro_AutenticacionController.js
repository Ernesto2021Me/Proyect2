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
exports.registro_AutenticacionContoller = void 0;
//import jwt from 'jsonwebtoken';
const database_1 = __importDefault(require("../database"));
class Registro_AutenticacionContoller {
    createUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.body)
            const resp = yield database_1.default.query("INSERT INTO usuarios set ?", [req.body]);
            res.json(resp);
            //res.json(null);
        });
    }
    validarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correoElectronico, contrasena } = req.body;
            const resp = yield database_1.default.query('SELECT * FROM usuarios WHERE correoElectronico = ? AND contrasena = ?', [correoElectronico, contrasena]);
            if (resp.length > 0) {
                res.status(400).json({ mensaje: 'Acceso concedido' });
                //res.json(resp);
            }
            else {
                res.status(401).json({ mensaje: 'Usuario inexistente' });
            }
            //    res.json(resp);
        });
    }
}
exports.registro_AutenticacionContoller = new Registro_AutenticacionContoller();
