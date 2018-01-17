module Shumway {
	import MapObject = Shumway.MapObject;
	import assert = Shumway.Debug.assert;
	import flash = AVMX.AS.flash;

	export class FlashContext {
		constructor() {

		}

		events = new FlashEvents(this);
		sec: ISecurityDomain;

		static get(sec: ISecurityDomain) {
			if (!sec) {
				return FlashContext._current;
			}
			if (!sec.context) {
				sec.context = new FlashContext();
				sec.context.sec = sec;

				FlashContext._current = sec.context;
			}
			return sec.context;
		}

		static _current: FlashContext = null;
		static _stack: Array<FlashContext> = [];

		static current() {
			return FlashContext._current;
		}


		_broadcastFrameEvent(type: string): void {
			let event = this.events.getBroadcastInstance(type);
			this.events.broadcastEventDispatchQueue.dispatchEvent(event);
		}
	}
}
