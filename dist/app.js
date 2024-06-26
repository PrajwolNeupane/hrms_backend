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
const dbConnection_1 = __importDefault(require("./config/dbConnection"));
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const dash_1 = __importDefault(require("./routes/dash"));
const attendance_1 = __importDefault(require("./routes/attendance"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const port = 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [
        process.env.CLIENT_URL,
        process.env.ADMIN_URL,
        process.env.LOCAL_CLIENT_URL,
        process.env.LOCAL_ADMIN_URL,
    ],
    credentials: true,
}));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.send("Hello Prajwol");
});
app.use("/auth", auth_1.default);
app.use("/attendance", attendance_1.default);
app.use("/dash", dash_1.default);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("-------------------------------------");
    console.log(`Server is listening at ${port}`);
    yield dbConnection_1.default;
}));
exports.default = app;
//# sourceMappingURL=app.js.map