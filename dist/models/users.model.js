"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    firstName: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    birthDate: {
        type: mongoose_1.Schema.Types.Date
    },
    address: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    userName: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    password: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    mail: {
        type: mongoose_1.Schema.Types.String,
        required: true
    }
}, {
    versionKey: false,
    collection: "users"
});
;
exports.UserModel = mongoose_1.default.model("User", userSchema);
//# sourceMappingURL=users.model.js.map