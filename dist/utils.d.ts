/**
 * Ensures the address starts with ws://
 */
export declare function normalizeAddress(address: string): string;
/**
 * Removes ws:// or wss://
 */
export declare function stripProtocol(address: string): string;
/**
 * Extract hostname from:
 * ws://192.168.1.100:3000
 * 192.168.1.100:3000
 * localhost:3000
 */
export declare function getHost(address: string): string;
/**
 * Returns true if address belongs to local machine
 *
 * Accepted:
 * localhost
 * 127.x.x.x
 * ::1
 * Any IPv4 assigned to this computer
 */
export declare function isLocalAddress(address: string): boolean;
/**
 * Appends sessionID query parameter
 */
export declare function buildWebSocketURL(address: string, sessionID: string): string;
/**
 * Validate volume range
 */
export declare function validateVolume(volume: number): void;
/**
 * Validate session ID
 */
export declare function validateSessionID(sessionID: string): void;
