import { TrackingPayload } from "../interfaces/tracking-payload";
import AgentConfig from "../interfaces/agent-config";
import Coordinates from "../models/coordinates";
import { ActionTypes } from "../enums/action-types";

export class TrackingListeners {
  private readonly _payloadsBuffer: TrackingPayload[];
  private readonly config: AgentConfig;

  private clickListener: ((e: PointerEvent) => void) | null = null;
  private readonly postFunction: (payload: TrackingPayload, type: "BEACON" | "FETCH") => void;

  public constructor(config: AgentConfig, postFunction: (payload: TrackingPayload, type: "BEACON" | "FETCH") => void) {
    this._payloadsBuffer = [];
    this.config = config;
    this.postFunction = postFunction;
    this.hookEvents(config);
  }

  get payloadsBuffer(): TrackingPayload[] {
    return this._payloadsBuffer;
  }

  public removeListeners(): void {
    if (this.clickListener !== null) {
      document.removeEventListener("click", this.clickListener);
      this.clickListener = null;
    }
  }

  private hookEvents(config: AgentConfig): void {
    if (config.trackClicks) {
      this.clickListener = this.trackClick.bind(this);
      document.addEventListener("click", this.clickListener);
    }
  }

  private trackClick(event: PointerEvent): void {
    if (!this.config.trackClicks) return;

    const coords = Coordinates.fromClick(event);
    const trackingPayload: TrackingPayload = {
      actionType: ActionTypes.CLICK,
      coordinates: coords,
      timestamp: Date.now(),
      deviceType: "UNKNOWN",
      url: window.location.origin + window.location.pathname + window.location.search
    };

    this.postFunction(trackingPayload, "BEACON");
  }
}
