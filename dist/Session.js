"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const utils_1 = require("./utils");
class Session {
    static { this._sessionID = null; }
    // Prevent instantiation
    constructor() { }
    /**
     * Initialize the session.
     * Can only be called once.
     */
    static initialize(sessionID) {
        (0, utils_1.validateSessionID)(sessionID);
        if (this._sessionID !== null) {
            throw new Error("Session has already been initialized.");
        }
        this._sessionID = sessionID;
    }
    /**
     * Returns true if initialized.
     */
    static get initialized() {
        return this._sessionID !== null;
    }
    /**
     * Returns the current session ID.
     */
    static get sessionID() {
        if (this._sessionID === null) {
            throw new Error("Session has not been initialized.");
        }
        return this._sessionID;
    }
}
exports.Session = Session;
//# sourceMappingURL=Session.js.map