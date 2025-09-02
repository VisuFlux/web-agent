/**
 * Configuration options for the VisuFlux agent.
 * - apiURL: The API endpoint URL for sending tracking data.
 * - trackClicksOptions: Options for tracking click events.
 * - trackScrollOptions: Options for tracking scroll events.
 * - trackMovementsOptions: Options for tracking mouse movement events.
 * - debug: Whether to enable debug mode (sends more detailed payloads).
 */
export interface AgentConfig {
  /**
   * The API endpoint URL for sending tracking data.
   */
  apiURL: string;

  /**
   * Options for tracking click events.
   */
  trackClicksOptions: FeatureOptions;

  /**
   * Options for tracking scroll events.
   */
  trackScrollOptions: FeatureOptions;

  /**
   * Options for tracking mouse movement events.
   */
  trackMovementsOptions: FeatureOptions;

  debug: boolean;
}

/**
 * Options for enabling/disabling a feature and setting its throttle time.
 * - enabled: Whether the feature is enabled.
 * - throttleMs: The throttle time in milliseconds (optionaL).
 */
export interface FeatureOptions {
  /**
   * Whether the feature is enabled.
   */
  enabled: boolean,

  /**
   * The throttle time in milliseconds (optional).
   */
  throttleMs?: number
}

export function defaultAgentConfig(): AgentConfig {
  return {
    apiURL: "https://api.visuflux.com",
    trackClicksOptions: { enabled: true, throttleMs: 100 },
    trackScrollOptions: { enabled: true, throttleMs: 100 },
    trackMovementsOptions: { enabled: false, throttleMs: 100 },
    debug: false
  };
}