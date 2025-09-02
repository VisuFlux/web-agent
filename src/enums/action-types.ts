/**
 * Enum representing different types of user actions.
 * @enum {number}
 * @property CLICK 0 - Represents a click action.
 * @property MOVE 1 - Represents a mouse movement action.
 * @property SCROLL 2 - Represents a scroll action.
 * @property CONNECTED 3 - Represents a VisuFluxAgent init.
 * @property DISCONNECTED 4 - Represents a VisuFluxAgent disconnection.
 */
export enum ActionTypes {
  CLICK,
  MOVE,
  SCROLL,
  CONNECTED,
  DISCONNECTED
}
