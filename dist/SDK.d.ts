import { Device } from "./Device";
import { DeviceCallback } from "./types";
export declare class SDK {
    /**
     * Initialize SDK.
     * Can only be called once.
     */
    static initialize(sessionID: string): void;
    /**
     * Creates a device instance.
     */
    static createDevice(address: string, callback: DeviceCallback): Device;
}
