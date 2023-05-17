"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CenterModel = void 0;
var mongoose_1 = require("mongoose");
var centerSchema = new mongoose_1.Schema({
    address: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    telephone: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    mail: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    wastes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Waste",
            required: true
        }
    ]
}, {
    versionKey: false,
    collection: "centers"
});
exports.CenterModel = mongoose_1.default.model("Center", centerSchema);
//# sourceMappingURL=centers.model.js.map