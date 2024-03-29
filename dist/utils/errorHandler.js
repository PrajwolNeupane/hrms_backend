"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHanlder({ res, e, title, message, code, }) {
    if (e) {
        console.log(`Error on : ${title}`);
        console.log(e);
    }
    return res.status(code).json({
        title,
        message,
        success: false,
    });
}
exports.default = errorHanlder;
//# sourceMappingURL=errorHandler.js.map