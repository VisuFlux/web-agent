import AgentConfig from "./interfaces/agent-config";
import { TrackingListeners } from "./listeners/tracking-listeners";
import { DebugTrackingPayload, payloadToDebugPayload, TrackingPayload } from "./interfaces/tracking-payload";

export default class HeatmapAgent {
  private readonly agentConfig: AgentConfig;

  private sessionId: string | null;
  private listeners: TrackingListeners | null;

  public constructor(config: AgentConfig) {
    this.agentConfig = config;
    this.sessionId = null;
    this.listeners = null;
  }

  public initialize(): void {
    if (this.trackingIsEnabled()) throw new Error("Tracking is already enabled");

    this.sessionId = this.generateTrackingSessionId();
    this.listeners = new TrackingListeners(this.agentConfig, this.postTrackingPayload);
  }

  public uninitialize(): void {
    if (!this.trackingIsEnabled()) throw new Error("Tracking is not enabled");
    this.sessionId = null;
    this.listeners!.removeListeners();
    this.listeners = null;
  }

  public trackingIsEnabled(): boolean {
    return this.sessionId !== null || this.listeners !== null;
  }

  private postTrackingPayload(payload: TrackingPayload, type: "BEACON" | "FETCH"): void {
    let finalPayload: TrackingPayload | DebugTrackingPayload = this.agentConfig.debug
      ? payloadToDebugPayload(payload)
      : payload;

    if (this.agentConfig.debug) console.log("[HeatmapAgent] Click tracked:", finalPayload);

    if (type === "BEACON") {
      const sent: boolean = navigator.sendBeacon(this.agentConfig.apiURL, JSON.stringify(finalPayload));
      if (this.agentConfig.debug)
        console.log(`[HeatmapAgent] Debug payload was sent with sendBeacon. Success : ${sent} `);
      return;
    }
    fetch(this.agentConfig.apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then((response) => {
        if (this.agentConfig.debug)
          console.log(`[HeatmapAgent] payload sent with fetch. Success: ${response.status === 200}`);
      })
      .catch((error) => {
        if (this.agentConfig.debug) console.error("[HeatmapAgent] Error sending debug payload with fetch:", error);
      });
  }

  private generateTrackingSessionId(): string {
    return Date.now().toString(36) + ":" + Math.random().toString(36).substring(2);
  }
}
