import AgentConfig from "./interfaces/agent-config";
import { TrackingListeners } from "./listeners/tracking-listeners";
import { DebugTrackingPayload, payloadToDebugPayload, TrackingPayload } from "./interfaces/tracking-payload";
import { getDeviceType } from "./utils/mobile-utils";
import { ActionTypes } from "./enums/action-types";

export default class HeatmapAgent {
  private readonly agentConfig: AgentConfig;

  private sessionId: string | null;
  private listeners: TrackingListeners | null;
  private bufferFlushInterval: number | null;

  public constructor(config: AgentConfig) {
    this.agentConfig = config;
    this.sessionId = null;
    this.listeners = null;
    this.bufferFlushInterval = null;
  }

  public initialize(): void {
    if (this.trackingIsEnabled()) throw new Error("Tracking is already enabled");

    this.sessionId = this.generateTrackingSessionId();
    this.listeners = new TrackingListeners(this.agentConfig, this.postTrackingPayload);
    this.bufferFlushInterval = setInterval(() => {
      if (this.listeners && this.listeners.mousePayloadBuffer.length > 0)
        this.postBigTrackingPayload(JSON.stringify(this.listeners.mousePayloadBuffer));
    });
    this.postTrackingPayload(
      {
        url: window.location.origin + window.location.pathname + window.location.search,
        deviceType: getDeviceType(),
        actionType: ActionTypes.CONNECTED
      },
      "BEACON"
    );
  }

  public uninitialize(): void {
    if (!this.trackingIsEnabled()) throw new Error("Tracking is not enabled");
    this.sessionId = null;
    this.listeners!.removeListeners();
    this.listeners = null;
    if (this.bufferFlushInterval !== null) clearInterval(this.bufferFlushInterval);
    this.postTrackingPayload(
      {
        url: window.location.origin + window.location.pathname + window.location.search,
        deviceType: getDeviceType(),
        actionType: ActionTypes.DISCONNECTED
      },
      "BEACON"
    );
  }

  public trackingIsEnabled(): boolean {
    return this.sessionId !== null || this.listeners !== null;
  }

  private postTrackingPayload(payload: TrackingPayload, type: "BEACON" | "FETCH"): void {
    let finalPayload: TrackingPayload | DebugTrackingPayload = this.agentConfig.debug
      ? payloadToDebugPayload(payload)
      : payload;

    if (this.agentConfig.debug) console.log("[HeatmapAgent] Action tracked:", finalPayload);

    if (type === "BEACON") {
      const sent: boolean = navigator.sendBeacon(this.agentConfig.apiURL, JSON.stringify(finalPayload));
      if (this.agentConfig.debug)
        console.log(`[HeatmapAgent] Debug payload was sent with sendBeacon. Success : ${sent} `);
      return;
    }
    this.postBigTrackingPayload(JSON.stringify(payload));
  }

  private postBigTrackingPayload(payload: string): void {
    if (this.agentConfig.debug) console.log("[HeatmapAgent] Action(s) tracked:", payload);
    fetch(this.agentConfig.apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: payload
    })
      .then((response) => {
        if (this.agentConfig.debug) console.log(`[HeatmapAgent] payload sent with fetch. Success: ${response.ok}`);
      })
      .catch((error) => {
        if (this.agentConfig.debug) console.error("[HeatmapAgent] Error sending debug payload with fetch:", error);
      });
  }

  private generateTrackingSessionId(): string {
    return Date.now().toString(36) + ":" + Math.random().toString(36).substring(2);
  }
}
