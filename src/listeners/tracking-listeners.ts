import {TrackingPayload} from "../interfaces/tracking-payload";
import AgentConfig from "../interfaces/agent-config";
import Coordinates from "../models/coordinates";
import {ActionTypes} from "../enums/action-types";

export class TrackingListeners {

	private readonly _payloadsBuffer: TrackingPayload[];

	private clickListener: ((e: PointerEvent) => void) | null = null;

	public constructor(config: AgentConfig) {
		this._payloadsBuffer = [];
		this.hookEvents(config)
	}

	private hookEvents(config: AgentConfig): void {
		if (config.trackClicks) {
			this.clickListener = this.trackClick.bind(this);
			document.addEventListener('click', this.clickListener);
		}
	}

	public removeListeners(): void {
		if (this.clickListener !== null) {
			this.clickListener = null;
			document.removeEventListener('click', this.clickListener);
		}
	}

	private trackClick(event: PointerEvent): void {
		const coords = Coordinates.fromClick(event)
		this._payloadsBuffer.push({
			actionType: ActionTypes.CLICK,
			coordinates: coords,
			timestamp: Date.now(),
			deviceType: "UNKNOWN",
			url: window.location.origin + window.location.pathname + window.location.search,
		});
	}


	get payloadsBuffer(): TrackingPayload[] {
		return this._payloadsBuffer;
	}
}