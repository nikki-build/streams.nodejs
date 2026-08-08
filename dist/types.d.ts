export type DeviceStatus = "connected" | "disconnected";
export type CallbackType = "statusChange" | "data";
export interface CallbackPayload {
    type: CallbackType;
    data: any;
    error?: unknown;
}
export type DeviceCallback = (payload: CallbackPayload) => void;
export interface NotificationPayload {
    "notification": {
        title: string;
        sub: string;
    };
}
export interface HapticPayload {
    haptic: true;
    duration: number;
}
export interface LightPayload {
    light: boolean;
}
export interface VolumePayload {
    volume: number;
}
export type DevicePayload = NotificationPayload | HapticPayload | LightPayload | VolumePayload;
