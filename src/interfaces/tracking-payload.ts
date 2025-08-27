import { ActionTypes } from "../enums/action-types";
import Coordinates from "../models/coordinates";

export interface TrackingPayload {
  url: string;
  deviceType: 0 | 1 | 2 | 3; // 0 = Desktop, 1 = Mobile, 2 = Tablet, 3 = Other
  coordinates?: Coordinates;
  actionType: ActionTypes;
  data?: Record<string, unknown>;
}

export interface DebugTrackingPayload extends TrackingPayload {
  screenWidth: number;
  screenHeight: number;

  viewportX: number;
  viewportY: number;
}

export function payloadToDebugPayload(payload: TrackingPayload): DebugTrackingPayload {
  return {
    ...payload,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    viewportX: window.innerWidth,
    viewportY: window.innerHeight
  };
}
