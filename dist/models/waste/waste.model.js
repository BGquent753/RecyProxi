"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WasteModel = void 0;
var mongoose_1 = require("mongoose");
var wasteSchema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    price: {
        type: mongoose_1.Schema.Types.String,
        required: true
    }
}, {
    versionKey: false,
    collection: "waste"
});
;
exports.WasteModel = mongoose_1.default.model("Waste", wasteSchema);
//# sourceMappingURL=waste.model.js.map