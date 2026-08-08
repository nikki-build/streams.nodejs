"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeAddress = normalizeAddress;
exports.stripProtocol = stripProtocol;
exports.getHost = getHost;
exports.isLocalAddress = isLocalAddress;
exports.buildWebSocketURL = buildWebSocketURL;
exports.validateVolume = validateVolume;
exports.validateSessionID = validateSessionID;
const os = __importStar(require("node:os"));
/**
 * Ensures the address starts with ws://
 */
function normalizeAddress(address) {
    address = address.trim();
    if (address.startsWith("ws://")) {
        return address;
    }
    if (address.startsWith("wss://")) {
        return address;
    }
    return `ws://${address}`;
}
/**
 * Removes ws:// or wss://
 */
function stripProtocol(address) {
    return address.replace(/^wss?:\/\//, "");
}
/**
 * Extract hostname from:
 * ws://192.168.1.100:3000
 * 192.168.1.100:3000
 * localhost:3000
 */
function getHost(address) {
    const cleaned = stripProtocol(address);
    return cleaned.split(":")[0];
}
/**
 * Returns true if address belongs to local machine
 *
 * Accepted:
 * localhost
 * 127.x.x.x
 * ::1
 * Any IPv4 assigned to this computer
 */
function isLocalAddress(address) {
    const host = getHost(address);
    if (host === "localhost")
        return true;
    if (host === "::1")
        return true;
    if (host.startsWith("127."))
        return true;
    if (host.startsWith("192."))
        return true;
    if (host.startsWith("172."))
        return true;
    if (host.startsWith("10."))
        return true;
    const interfaces = os.networkInterfaces();
    for (const iface of Object.values(interfaces)) {
        if (!iface)
            continue;
        for (const entry of iface) {
            if (entry.family !== "IPv4")
                continue;
            if (entry.address === host)
                return true;
        }
    }
    return false;
}
/**
 * Appends sessionID query parameter
 */
function buildWebSocketURL(address, sessionID) {
    const normalized = normalizeAddress(address);
    const url = new URL(normalized);
    url.searchParams.set("sessionID", sessionID);
    return url.toString();
}
/**
 * Validate volume range
 */
function validateVolume(volume) {
    if (!Number.isInteger(volume)) {
        throw new Error("Volume must be an integer.");
    }
    if (volume < 0 || volume > 100) {
        throw new Error("Volume must be between 0 and 100.");
    }
}
/**
 * Validate session ID
 */
function validateSessionID(sessionID) {
    if (typeof sessionID !== "string") {
        throw new Error("Session ID must be a string.");
    }
    if (!sessionID.trim()) {
        throw new Error("Session ID cannot be empty.");
    }
}
//# sourceMappingURL=utils.js.map