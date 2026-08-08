import { DeviceCallback } from "./types";
export declare class Device {
    private readonly wsUrl;
    private readonly callback;
    private socket?;
    private connected;
    private connecting;
    constructor(wsUrl: string, callback: DeviceCallback);
    /**
     * Returns websocket connection state.
     */
    isConnected(): boolean;
    /**
     * Connect to websocket server.
     */
    connect(): Promise<void>;
    /**
     * Disconnect websocket.
     */
    disconnect(): void;
    /**
     * Send JSON payload.
     */
    private send;
    /**
     * Turn light on/off.
     */
    setLightStatus(status: boolean): void;
    /**
     * Set volume (0-100).
     */
    setVolume(volume: number): void;
    /**
     * Trigger vibration.
     */
    setHaptic(duration?: number): void;
    /**
     * Show notification.
     */
    setNotification(title: string, subject: string): void;
}
