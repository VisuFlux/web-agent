import { ActionTypes } from "../enums/action-types";
import Coordinates from "../models/coordinates";

/**
 * Represent the payload sent to the tracking API
 * @interface TrackingPayload
 * @property {string} [url] - URL of the page where the action occurred (optional, will be filled automatically)
 * @property {0 | 1 | 2 | 3} [deviceType]
 * @property {ActionTypes} actionType - Type of action performed
 * @property {Coordinates} [coordinates] - Coordinates of the action (if applicable, optional
 *
 */
export interface TrackingPayload {

  /**
   * URL of the page where the action occurred
   * @type {string}
   * @optional - will be filled automatically
   */
  url?: string;

  /**
   * Device type:
   * 0 = Desktop
   * 1 = Mobile
   * 2 = Tablet
   * 3 = Other
   */
  deviceType?: 0 | 1 | 2 | 3;

  /**
   * Coordinates of the action (if applicable)
   * @type {Coordinates}
   * @optional
   */
  coordinates?: Coordinates;

  /**
   * Type of action performed
   * @type {ActionTypes}
   * @required
   */
  actionType: ActionTypes;

  /**
   * Session ID to group actions within the same session
   * @type {string}
   * @required - will be filled automatically
   */
  sessionId?: string;

  /**
   * Additional data to include in the payload
   * @type {Record<string, unknown>}
   * @optional
   */
  extraData?: Record<string, unknown>;
}

export function payloadToDebugPayload(payload: TrackingPayload): TrackingPayload {
  payload.extraData = {
    ...payload.extraData,
    _debugInfo: {
      userAgent: navigator.userAgent,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      viewportX: window.innerWidth,
      viewportY: window.innerHeight
    }
  };
  return payload;
}
