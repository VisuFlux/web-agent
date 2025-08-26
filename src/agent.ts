import AgentConfig from "./interfaces/agent-config";
import {TrackingListeners} from "./listeners/tracking-listeners";

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
		this.listeners = new TrackingListeners(this.agentConfig);
	}

	public uninitialize(): void {
		if (!this.trackingIsEnabled()) throw new Error("Tracking is not enabled");
		this.sessionId = null;
		this.listeners!.removeListeners()
		this.listeners = null;
	}

	private generateTrackingSessionId(): string
	{
		return Date.now().toString(36) + ':' + Math.random().toString(36).substring(2);
	}

	public trackingIsEnabled(): boolean {
		return this.sessionId !== null || this.listeners !== null;
	}

}
