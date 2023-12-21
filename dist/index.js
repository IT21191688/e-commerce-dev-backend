"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const common_config_1 = require("./common/common.config");
//import { sendAppointmentReminders } from "./util/cronJob";
const error_middleware_1 = __importDefault(require("./error/error.middleware"));
require("express-async-errors");
const NotFoundError_1 = __importDefault(require("./error/error.classes/NotFoundError"));
const mapping_1 = __importDefault(require("./mapping"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"], // Include the PATCH method here
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.use(express_1.default.json());
//api router Mappings
(0, mapping_1.default)(app);
//error handler middleware
app.use(error_middleware_1.default);
//404 not found route
app.all("*", async (req, res) => {
    throw new NotFoundError_1.default("API endpoint not found!");
});
//setup cron jobs
//sendAppointmentReminders();
const start = async () => {
    const port = process.env.PORT || 5000;
    try {
        app.listen(port, () => {
            console.log(`SERVER IS LISTENING ON PORT ${port}..!`);
            (0, common_config_1.connectDB)();
        });
    }
    catch (e) {
        console.log(e);
    }
};
start();
