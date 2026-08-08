"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = void 0;
const Device_1 = require("./Device");
const Session_1 = require("./Session");
const utils_1 = require("./utils");
class SDK {
    /**
     * Initialize SDK.
     * Can only be called once.
     */
    static initialize(sessionID) {
        Session_1.Session.initialize(sessionID);
    }
    /**
     * Creates a device instance.
     */
    static createDevice(address, callback) {
        if (!Session_1.Session.initialized) {
            throw new Error("SDK has not been initialized. Call SDK.initialize() first.");
        }
        if (!(0, utils_1.isLocalAddress)(address)) {
            throw new Error("Only local websocket addresses are allowed.");
        }
        const wsUrl = (0, utils_1.buildWebSocketURL)(address, Session_1.Session.sessionID);
        return new Device_1.Device(wsUrl, callback);
    }
}
exports.SDK = SDK;
//# sourceMappingURL=SDK.js.map