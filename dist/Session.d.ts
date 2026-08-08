export declare class Session {
    private static _sessionID;
    private constructor();
    /**
     * Initialize the session.
     * Can only be called once.
     */
    static initialize(sessionID: string): void;
    /**
     * Returns true if initialized.
     */
    static get initialized(): boolean;
    /**
     * Returns the current session ID.
     */
    static get sessionID(): string;
}
