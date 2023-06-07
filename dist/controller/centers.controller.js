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
exports.CenterController = void 0;
var express = require("express");
var models_1 = require("../models");
var CenterController = /** @class */ (function () {
    function CenterController() {
        this.path = '/center';
        this.model = models_1.CenterModel;
    }
    ;
    CenterController.prototype.getAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var centers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.model.find().populate({ path: "wastes" }).exec()];
                    case 1:
                        centers = _a.sent();
                        res.json(centers);
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    CenterController.prototype.createCenter = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var center;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.model.create({
                            address: req.body.address,
                            telephone: req.body.telephone,
                            mail: req.body.mail,
                            wastes: req.body.wastes
                        })];
                    case 1:
                        center = _a.sent();
                        res.json(center);
                        return [2 /*return*/];
                }
            });
        });
    };
    CenterController.prototype.addWaste = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var waste, center, newCenter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.WasteModel.findOne({
                            name: req.params.name
                        })];
                    case 1:
                        waste = _a.sent();
                        return [4 /*yield*/, this.model.findOneAndUpdate({
                                _id: req.body.id
                            }, {
                                $push: { wastes: waste }
                            }).exec()];
                    case 2:
                        center = _a.sent();
                        return [4 /*yield*/, this.model.findOne({
                                _id: req.body.id
                            }).populate({
                                path: "wastes"
                            }).exec()];
                    case 3:
                        newCenter = _a.sent();
                        res.json(newCenter);
                        return [2 /*return*/];
                }
            });
        });
    };
    CenterController.prototype.deleteWaste = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var waste, center, newCenter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.WasteModel.findOne({
                            name: req.params.name
                        })];
                    case 1:
                        waste = _a.sent();
                        return [4 /*yield*/, this.model.findOneAndUpdate({
                                _id: req.body.id
                            }, {
                                "$pull": {
                                    "wastes": waste._id
                                }
                            })];
                    case 2:
                        center = _a.sent();
                        return [4 /*yield*/, this.model.findOne({
                                _id: req.body.id
                            })];
                    case 3:
                        newCenter = _a.sent();
                        res.json(newCenter);
                        return [2 /*return*/];
                }
            });
        });
    };
    //A REFAIRE
    /*async centerWithWaste(req:Request, res:Response){
        const tab:string[] = req.body.tab
        const request:{wastes:string}[] = []
        for(let i = 0; i < tab.length; i++){
            request.push({wastes:`${tab[i]}`})
        }
        const center = await this.model.find({
            //requete pour plusieurs dechets
            //$and:tableau de {waste:string}

            //requetes pour les centre contenant au moins un des déchets sélectionnés
            $or:request
        })
        res.send(center)
    }*/
    CenterController.prototype.centerWithWaste = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var tab, request, _a, _b, _c, _i, i, name_1, waste, centers;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        tab = req.body.tab;
                        request = [];
                        _a = tab;
                        _b = [];
                        for (_c in _a)
                            _b.push(_c);
                        _i = 0;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _b.length)) return [3 /*break*/, 4];
                        _c = _b[_i];
                        if (!(_c in _a)) return [3 /*break*/, 3];
                        i = _c;
                        name_1 = tab[i];
                        return [4 /*yield*/, models_1.WasteModel.findOne({
                                name: name_1
                            })];
                    case 2:
                        waste = _d.sent();
                        request.push({ wastes: waste._id });
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, this.model.find({
                            $or: request
                        }).populate({
                            path: "wastes"
                        }).exec()];
                    case 5:
                        centers = _d.sent();
                        res.json(centers);
                        return [2 /*return*/];
                }
            });
        });
    };
    CenterController.prototype.deleteCenter = function (req, res) {
        //const mail = "mail"
        var center = this.model.deleteOne({
            mail: req.params.mail
        }).exec();
        center.then(function (c) {
            if (c.deletedCount === 0) {
                res.status(404);
                res.send("This center doesn't exist");
            }
            else {
                res.status(200);
                res.json(c);
            }
        });
    };
    /*async patchCenter(req:Request, res:Response){
    }*/
    CenterController.prototype.buildRoutes = function () {
        var router = express.Router();
        router.get('/all', this.getAll.bind(this));
        router.get('/:waste', express.json(), this.centerWithWaste.bind(this));
        router.post('/', express.json(), this.createCenter.bind(this));
        router.patch('/add/:name', express.json(), this.addWaste.bind(this));
        router.patch('/del/:name', express.json(), this.deleteWaste.bind(this));
        router.delete('/:mail', this.deleteCenter.bind(this));
        return router;
    };
    return CenterController;
}());
exports.CenterController = CenterController;
//# sourceMappingURL=centers.controller.js.map