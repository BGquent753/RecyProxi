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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var express = require("express");
var models_1 = require("../models");
var security_utils_1 = require("../utils/security.utils");
var session_model_1 = require("../models/session.model");
var role_model_1 = require("../models/role.model");
var user_middleware_1 = require("../middlewares/user.middleware");
var role_middleware_1 = require("../middlewares/role.middleware");
var UserController = /** @class */ (function () {
    function UserController() {
        this.path = '/user';
        this.model = models_1.UserModel;
        this.guestRole = null;
    }
    ;
    UserController.prototype.getAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.model.find().populate({
                            path: "roles"
                        }).exec()];
                    case 1:
                        users = _a.sent();
                        res.json(users);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.model.findOne({
                            login: req.params.login
                        })];
                    case 1:
                        user = _a.sent();
                        res.send(user);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.loadGuestRole = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.guestRole) {
                            return [2 /*return*/];
                        }
                        _a = this;
                        return [4 /*yield*/, role_model_1.RoleModel.findOne({ name: "guest" }).exec()];
                    case 1:
                        _a.guestRole = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.subscribe = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var login, password, user, err_1, me;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!req.body) {
                            res.status(400).end();
                            return [2 /*return*/];
                        }
                        if (typeof req.body.login !== 'string' || req.body.login.length < 4) {
                            res.status(400).send("Error in login, thanks to follow these rules:\n- minimum 4 caracters\n- only string");
                            return [2 /*return*/];
                        }
                        if (typeof req.body.password !== 'string' || req.body.password.length < 8) {
                            res.status(400).send("Error in password, thanks to follow these rules:\n- minimum 8 caracters\n- only string");
                            return [2 /*return*/];
                        }
                        login = req.body.login;
                        password = req.body.password;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.loadGuestRole()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, models_1.UserModel.create({
                                name: req.body.name,
                                firstName: req.body.firstName,
                                birthDate: req.body.birthDate,
                                address: req.body.address,
                                mail: req.body.mail,
                                login: login,
                                password: security_utils_1.SecurityUtils.toSHA512(password),
                                roles: [this.guestRole]
                            })];
                    case 3:
                        user = _a.sent();
                        res.send(user);
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        me = err_1;
                        if (me["name"] === "MongoServerError" && me["code"] === 11000) {
                            res.status(409).send("this login already exists, choose another one");
                        }
                        else {
                            res.status(500).send(me);
                        }
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, platform, session;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!req.body || typeof req.body.login !== 'string' || typeof req.body.password !== 'string') {
                            res.status(400).end();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, models_1.UserModel.findOne({
                                login: req.body.login,
                                password: security_utils_1.SecurityUtils.toSHA512(req.body.password)
                            })];
                    case 1:
                        user = _a.sent();
                        platform = req.headers['user-agent'];
                        return [4 /*yield*/, session_model_1.SessionModel.create({
                                user: user,
                                platform: platform
                            })];
                    case 2:
                        session = _a.sent();
                        res.json({
                            token: session._id
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.me = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.json(req.user);
                return [2 /*return*/];
            });
        });
    };
    UserController.prototype.buildRoutes = function () {
        var router = express.Router();
        router.get('/all', this.getAll.bind(this));
        router.get('/:login', this.getUser.bind(this));
        router.get('/me', (0, user_middleware_1.checkUserToken)(), this.me.bind(this));
        router.get('/admin', (0, user_middleware_1.checkUserToken)(), (0, role_middleware_1.checkUserRole)("admin"), this.me.bind(this));
        router.post('/subscribe', express.json(), this.subscribe.bind(this));
        router.post('/login', express.json(), this.login.bind(this));
        return router;
    };
    ;
    return UserController;
}());
exports.UserController = UserController;
function userNotEmpty(user) {
    return user !== "null";
}
//# sourceMappingURL=users.controller.js.map