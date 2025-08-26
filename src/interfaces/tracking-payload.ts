import { ActionTypes } from "../enums/action-types";
import Coordinates from "../models/coordinates";

export interface TrackingPayload {
  url: string;
  deviceType: "COMPUTER" | "SMARTPHONE" | "TABLET" | "UNKNOWN";
  coordinates: Coordinates;
  actionType: ActionTypes;
  timestamp: number;
}

export interface DebugTrackingPayload extends TrackingPayload {
  screenWidth: number;
  screenHeight: number;

  viewportX: number;
  viewportY: number;
}
