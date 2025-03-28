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
const user_model_1 = __importDefault(require("../models/user.model"));
/**
 * Get all users
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 */
const getUsers = (req, res) => {
    const users = user_model_1.default.findAll();
    if (!users) {
        res.status(500).json({
            message: "No users",
        });
    }
    res.status(200).json(users);
};
/**
 * Add new User
 *
 * @param {Request<{id: string}>} req
 * @param {Response} res
 * @returns {void}
 */
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send("Username and Password are required");
    }
    const user = yield user_model_1.default.createUser({ username, password });
    if (!user) {
        res.status(400).send("Username already exists");
        return;
    }
    res.status(201).send(user);
});
/**
 * Login User
 *
 * @param {Request<{}, {}, Omit<User, 'id' | "rate">>} req
 * @param {Response} res
 * @returns {void}
 */
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(500).json({
            error: "Username/password is wrong"
        });
        return;
    }
    const user = yield user_model_1.default.checkUserPass(username, password);
    if (!user) {
        res.status(500).json({
            error: "Login infomation is wrong"
        });
        return;
    }
    if (req.session) {
        req.session.isLoggedIn = true;
        req.session.username = user.username;
    }
    res.status(200).send("You Logged in");
});
const getUserById = (req, res) => {
    const { id } = req.params;
    const user = user_model_1.default.findById(id);
    if (!user) {
        res.status(404).send("User not found");
        return;
    }
    res.status(200).json(user);
};
/**
 * Edit user by ID
 *
 * @param {Request<{id: string}, {}, Partial<User>>} req
 * @param {Response} res
 * @returns {void}
 */
const editUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { username, password, favorite } = req.body;
    try {
        const user = yield user_model_1.default.editUserById(id, { username, password, favorite });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({
            message: "Server error"
        });
    }
});
/**
 * Logouted user
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Redirect to signup
 */
const logoutUser = (req, res) => {
    req.session = null;
    res.status(200).json({
        content: "Session cookie cleared!",
    });
};
exports.default = {
    getUsers,
    getUserById,
    createUser,
    loginUser,
    editUserById,
    logoutUser
};
