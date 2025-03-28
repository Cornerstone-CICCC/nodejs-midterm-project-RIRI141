"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const cors_1 = __importDefault(require("cors"));
const page_routes_1 = __importDefault(require("./routes/page.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const quiz_route_1 = __importDefault(require("./routes/quiz.route"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true
}));
const SIGN_KEY = process.env.COOKIE_SIGN_KEY;
const ENCRYPT_KEY = process.env.COOKIE_ENCRYPT_KEY;
if (!SIGN_KEY || !ENCRYPT_KEY) {
    throw new Error("Missing Cookie Keys");
}
app.use(express_1.default.json());
app.use((0, cookie_session_1.default)({
    name: "session",
    keys: [
        SIGN_KEY,
        ENCRYPT_KEY
    ],
    maxAge: 24 * 60 * 60 * 1000
}));
app.use("/api", quiz_route_1.default);
app.use("/", page_routes_1.default);
app.use("/", user_routes_1.default);
app.use((req, res) => {
    res.status(404).send("Page not found");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});
