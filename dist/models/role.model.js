"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModel = void 0;
var mongoose_1 = require("mongoose");
var roleSchema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.Schema.Types.String,
        unique: true,
        required: true
    }
}, {
    versionKey: false,
    collection: "Roles"
});
exports.RoleModel = mongoose_1.default.model("Role", roleSchema);
//# sourceMappingURL=role.model.js.map