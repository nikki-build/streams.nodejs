"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = void 0;
const ws_1 = __importDefault(require("ws"));
const utils_1 = require("./utils");
class Device {
    constructor(wsUrl, callback) {
        this.wsUrl = wsUrl;
        this.callback = callback;
        this.connected = false;
        this.connecting = false;
    }
    /**
     * Returns websocket connection state.
     */
    isConnected() {
        return this.connected;
    }
    /**
     * Connect to websocket server.
     */
    connect() {
        if (this.connected) {
            return Promise.resolve();
        }
        if (this.connecting) {
            return Promise.reject(new Error("Connection already in progress."));
        }
        this.connecting = true;
        return new Promise((resolve, reject) => {
            this.socket = new ws_1.default(this.wsUrl);
            this.socket.once("open", () => {
                this.connected = true;
                this.connecting = false;
                this.callback({
                    type: "statusChange",
                    data: "connected"
                });
                resolve();
            });
            this.socket.on("message", (message) => {
                let data;
                try {
                    data = JSON.parse(message.toString());
                }
                catch {
                    data = message.toString();
                }
                this.callback({
                    type: "data",
                    data
                });
            });
            this.socket.on("close", () => {
                this.connected = false;
                this.connecting = false;
                this.callback({
                    type: "statusChange",
                    data: "disconnected"
                });
            });
            this.socket.once("error", (err) => {
                this.connected = false;
                this.connecting = false;
                this.callback({
                    type: "statusChange",
                    data: "disconnected",
                    error: err
                });
                reject(err);
            });
        });
    }
    /**
     * Disconnect websocket.
     */
    disconnect() {
        if (!this.socket)
            return;
        this.socket.close();
    }
    /**
     * Send JSON payload.
     */
    send(payload) {
        if (!this.socket) {
            throw new Error("Device is not connected.");
        }
        if (this.socket.readyState !== ws_1.default.OPEN) {
            throw new Error("WebSocket is not open.");
        }
        this.socket.send(JSON.stringify(payload));
    }
    /**
     * Turn light on/off.
     */
    setLightStatus(status) {
        this.send({
            light: status
        });
    }
    /**
     * Set volume (0-100).
     */
    setVolume(volume) {
        (0, utils_1.validateVolume)(volume);
        this.send({
            volume
        });
    }
    /**
     * Trigger vibration.
     */
    setHaptic(duration = 1000) {
        this.send({
            haptic: true,
            duration
        });
    }
    /**
     * Show notification.
     */
    setNotification(title, subject) {
        this.send({
            notification: {
                title,
                sub: subject
            }
        });
    }
}
exports.Device = Device;
//# sourceMappingURL=Device.js.map