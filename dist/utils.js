"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeAddress = normalizeAddress;
exports.stripProtocol = stripProtocol;
exports.getHost = getHost;
exports.isLocalAddress = isLocalAddress;
exports.buildWebSocketURL = buildWebSocketURL;
exports.validateVolume = validateVolume;
exports.validateSessionID = validateSessionID;
const node_os_1 = __importDefault(require("node:os"));
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
    const interfaces = node_os_1.default.networkInterfaces();
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