import { TrackingPayload } from "../interfaces/tracking-payload";
import Coordinates from "../models/coordinates";
import { ActionTypes } from "../enums/action-types";
import { AgentConfig } from "../interfaces/agent-config";

export class TrackingListeners {

  private readonly config: AgentConfig;
  private readonly postFunction: (payload: TrackingPayload) => boolean;

  private clickListener: ((e: MouseEvent) => void) | null = null;
  private lastClickTime: number = 0;

  private scrollListener: ((e: Event) => void) | null = null;
  private lastKnownScrollY: number;
  private scrolling: boolean;

  private movementListener: ((e: MouseEvent) => void) | null = null;
  private moving: boolean;

  public constructor(config: AgentConfig, postFunction: (payload: TrackingPayload) => boolean) {
    this.config = config;
    this.postFunction = postFunction;
    this.lastKnownScrollY = 0;
    this.scrolling = false;
    this.moving = false;
    this.registerListeners();
  }

  private registerListeners(): void {
    if (this.config.trackClicksOptions.enabled) {
      this.clickListener = this.trackClick.bind(this);
      document.addEventListener("click", this.clickListener);
    }

    if (this.config.trackScrollOptions.enabled) {
      this.scrollListener = this.trackScroll.bind(this);
      document.addEventListener("scroll", this.scrollListener);
    }

    if (this.config.trackMovementsOptions.enabled) {
      this.movementListener = this.trackMoveMouse.bind(this);
      document.addEventListener("mousemove", this.movementListener);
    }
  }

  private unregisterListeners(): void {
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

  public dispose(): void {
    this.unregisterListeners();
  }

  private trackClick(event: MouseEvent): void {
    if (this.lastClickTime !== 0) {
      const cooldown: number = this.getOrDefaultConfigValue(this.config.trackClicksOptions.throttleMs, 100);
      if (Date.now() - this.lastClickTime < cooldown) return;
    }

    try {
      const coords: Coordinates = Coordinates.fromCoordinates(event.x, event.y);
      const trackingPayload: TrackingPayload = { actionType: ActionTypes.CLICK, coordinates: coords };
      if (this.postFunction(trackingPayload))
        this.lastClickTime = Date.now();
    } catch (error) {
      console.error("[VisuFluxAgent] Error while tracking click:", error);
    }
  }

  private trackScroll(_event: Event): void {
    if (this.scrolling) return;

    this.scrolling = true;
    setTimeout(() => {
      const scrollPosition: number = window.scrollY;
      const totalHeight: number = document.body.scrollHeight;
      const windowHeight: number = window.innerHeight;

      if (totalHeight > windowHeight) this.lastKnownScrollY = (scrollPosition / (totalHeight - windowHeight)) * 100;
      else this.lastKnownScrollY = 0;

      const trackingPayload: TrackingPayload = {
        actionType: ActionTypes.SCROLL,
        extraData: { yOffset: this.lastKnownScrollY }
      };

      this.postFunction(trackingPayload);
      this.scrolling = false;
    }, this.getOrDefaultConfigValue(this.config.trackScrollOptions.throttleMs, 100));
  }

  /**
   * @private Track mouse movements with throttling
   * @param event The mouse event
   */
  private trackMoveMouse(event: MouseEvent): void {
    if (this.moving) return;

    this.moving = true;
    setTimeout(() => {
      try {
        const payload: TrackingPayload = {
          actionType: ActionTypes.MOVE,
          coordinates: Coordinates.fromCoordinates(event.clientX, event.clientY)
        };
        this.postFunction(payload);
      } catch (error) {
        console.error("[VisuFluxAgent] Error while mouse move: ", error);
      }
      finally {
        this.moving = false;
      }
    }, this.getOrDefaultConfigValue(this.config.trackMovementsOptions.throttleMs, 100));
  }

  /**
   * @private Get the value of a property or return a default value if it's undefined
   * @param prop The property to check
   * @param defaultValue The default value to return if prop is undefined
   * @returns The value of prop or defaultValue
   */
  private getOrDefaultConfigValue(prop: number | undefined, defaultValue: number): number {
    return typeof prop === "undefined" ? defaultValue : prop;
  }
}
