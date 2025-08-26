export default interface AgentConfig {
  apiURL: string;

  trackClicks: boolean;
  trackScroll: boolean;
  trackMovements: boolean;
  debug: boolean;
}

export const DefaultAgentConfig: AgentConfig = {
  apiURL: "https://api.example.com/track",

  trackClicks: true,
  trackScroll: false,
  trackMovements: false,
  debug: false
};
