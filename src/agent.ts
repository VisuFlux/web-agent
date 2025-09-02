import { TrackingListeners } from "./listeners/tracking-listeners";
import { payloadToDebugPayload, TrackingPayload } from "./interfaces/tracking-payload";
import { getDeviceType } from "./utils/mobile-utils";
import { ActionTypes } from "./enums/action-types";
import { AgentConfig } from "./interfaces/agent-config";

export class VisuFluxAgent {
  private readonly agentConfig: AgentConfig;

  private sessionId: string | null;
  private listeners: TrackingListeners | null;


  /**
   * Create a new VisuFluxAgent instance with the given configuration
   * @param config The configuration for the agent
   */
  public constructor(config: AgentConfig) {
    this.agentConfig = config;
    this.sessionId = null;
    this.listeners = null;
  }

  /**
   * Initialize the tracking agent, start tracking and send a CONNECTED action
   * @throws Error if tracking is already enabled
   * @returns void
   */
  public initialize(): void {
    if (this.trackingIsEnabled()) throw new Error("Tracking is already enabled");

    this.sessionId = this.generateTrackingSessionId();
    const boundPostFunction = this.postTrackingPayload.bind(this);
    this.listeners = new TrackingListeners(this.agentConfig, boundPostFunction);
    this.postTrackingPayload({ actionType: ActionTypes.CONNECTED });
  }

  /**
   * Uninitialize the tracking agent, stop tracking and send a DISCONNECTED action
   * @throws Error if tracking is not enabled
   * @returns void
   */
  public uninitialize(): void {
    if (!this.trackingIsEnabled()) throw new Error("Tracking is not enabled");
    this.sessionId = null;
    if (this.listeners) {
      this.listeners.dispose();
      this.listeners = null;
    }
    this.postTrackingPayload({ actionType: ActionTypes.DISCONNECTED });
  }

  /**
   * Check if tracking is currently enabled
   * @returns True if tracking is enabled, false otherwise
   */
  public trackingIsEnabled(): boolean {
    return this.sessionId !== null || this.listeners !== null;
  }

  /**
   * Get the current agent configuration
   * @returns The current agent configuration (readonly)
   */
  public getConfig(): Readonly<AgentConfig> {
    return { ...this.agentConfig };
  }

  /**
   * @private Post the tracking payload to the tracking API using navigator.sendBeacon
   * @param payload The tracking payload to send
   * @return True if the payload was sent successfully, false otherwise
   */
  private postTrackingPayload(payload: TrackingPayload): boolean {
    payload.sessionId = this.sessionId!;
    payload.url = payload.url ?? window.location.origin + window.location.pathname;
    payload.deviceType = payload.deviceType ?? getDeviceType();
    const finalPayload: TrackingPayload = this.agentConfig.debug ? payloadToDebugPayload(payload) : payload;

    this.debug("Tracking payload prepared:", finalPayload);

    const sent: boolean = navigator.sendBeacon(this.agentConfig.apiURL + "/collect", JSON.stringify(finalPayload));
    this.debug("Debug payload was sent with sendBeacon. Success : " + sent);
    return sent;
  }

  /**
   * @private Generate a unique session ID for tracking
   * Combines the current timestamp in base36 and a random string in base36
   * Example: "k1z0v8:5g7j9l3h"
   * @returns A unique session ID
   */
  private generateTrackingSessionId(): string {
    return Date.now().toString(36) + ":" + Math.random().toString(36).substring(2);
  }

  private debug(message: string, data?: any): void {
    if (this.agentConfig.debug) {
      console.debug(`[VisuFluxAgent] ${message}`, data || "");
    }
  }
}
