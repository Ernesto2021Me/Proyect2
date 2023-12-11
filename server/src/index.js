"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LoginRoutes_1 = __importDefault(require("./routes/LoginRoutes"));
const PrestamosRoutes_1 = __importDefault(require("./routes/PrestamosRoutes"));
const ConfigurationRoutes_1 = __importDefault(require("./routes/ConfigurationRoutes"));
const ReviewRoutes_1 = __importDefault(require("./routes/ReviewRoutes"));
const AdministratorRoutes_1 = __importDefault(require("./routes/AdministratorRoutes"));
const LibrosRoutes_1 = __importDefault(require("./routes/LibrosRoutes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
        this.app.use('/documentacion', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/api/Login', LoginRoutes_1.default);
        this.app.use('/api/Libros', LibrosRoutes_1.default);
        this.app.use('/api/Prestamos', PrestamosRoutes_1.default);
        this.app.use('/api/Configuration', ConfigurationRoutes_1.default);
        this.app.use('/api/Review', ReviewRoutes_1.default);
        this.app.use('/api/Administrator', AdministratorRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('El servidor empleado es', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
