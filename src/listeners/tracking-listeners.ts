import { TrackingPayload } from "../interfaces/tracking-payload";
import AgentConfig from "../interfaces/agent-config";
import Coordinates from "../models/coordinates";
import { ActionTypes } from "../enums/action-types";
import { getDeviceType } from "../utils/mobile-utils";

export class TrackingListeners {
  private readonly _mousePayloadBuffer: TrackingPayload[];
  private readonly postFunction: (payload: TrackingPayload, type: "BEACON" | "FETCH") => void;

  private clickListener: ((e: PointerEvent) => void) | null = null;

  private scrollListener: ((e: Event) => void) | null = null;
  private lastKnownScrollY: number;
  private scrolling: boolean;

  private movementListener: ((e: MouseEvent) => void) | null = null;
  private moving: boolean;

  public constructor(config: AgentConfig, postFunction: (payload: TrackingPayload, type: "BEACON" | "FETCH") => void) {
    this._mousePayloadBuffer = [];
    this.postFunction = postFunction;
    this.lastKnownScrollY = 0;
    this.scrolling = false;
    this.moving = false;
    this.hookEvents(config);
  }

  get mousePayloadBuffer(): TrackingPayload[] {
    return this._mousePayloadBuffer;
  }

  public removeListeners(): void {
    if (this.clickListener !== null) {
      document.removeEventListener("click", this.clickListener);
      this.clickListener = null;
    }
    if (this.scrollListener !== null) {
      document.removeEventListener("scroll", this.scrollListener);
      this.scrollListener = null;
    }
    if (this.movementListener !== null) {
      document.removeEventListener("mousemove", this.movementListener);
      this.movementListener = null;
    }
  }

  private hookEvents(config: AgentConfig): void {
    if (config.trackClicks) {
      this.clickListener = this.trackClick.bind(this);
      document.addEventListener("click", this.clickListener);
    }
    if (config.trackScroll) {
      this.scrollListener = this.trackScroll.bind(this);
      document.addEventListener("scroll", this.scrollListener);
    }
    if (config.trackMovements) {
      this.movementListener = this.trackMoveMouse.bind(this);
      document.addEventListener("mousemove", this.movementListener);
    }
  }

  private trackClick(event: PointerEvent): void {
    const coords = Coordinates.fromClick(event);
    const trackingPayload: TrackingPayload = {
      actionType: ActionTypes.CLICK,
      coordinates: coords,
      deviceType: getDeviceType(),
      url: window.location.origin + window.location.pathname + window.location.search
    };

    this.postFunction(trackingPayload, "BEACON");
  }

  private trackScroll(_event: Event): void {
    if (!this.scrolling) {
      this.lastKnownScrollY = window.scrollY;
      this.scrolling = true;
      setTimeout(() => {
        const trackingPayload: TrackingPayload = {
          actionType: ActionTypes.SCROLL,
          deviceType: getDeviceType(),
          url: window.location.origin + window.location.pathname + window.location.search,
          data: { yOffset: this.lastKnownScrollY }
        };
        this.postFunction(trackingPayload, "BEACON");
        this.scrolling = false;
      }, 25);
    }
  }

  private trackMoveMouse(event: MouseEvent): void {
    if (!this.moving) {
      this.moving = true;
      setTimeout(() => {
        const trackingPayload: TrackingPayload = {
          actionType: ActionTypes.MOVE,
          deviceType: getDeviceType(),
          url: window.location.origin + window.location.pathname + window.location.search,
          coordinates: Coordinates.fromCoordinates(event.clientX, event.clientY)
        };
        this._mousePayloadBuffer.push(trackingPayload);
        this.moving = false;
      }, 100);
    }
  }
}
