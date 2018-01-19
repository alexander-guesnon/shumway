module Shumway {
	import MapObject = Shumway.MapObject;
	import assert = Shumway.Debug.assert;
	import flash = AVMX.AS.flash;

	export class FlashContext {
		constructor() {

		}

		events = new FlashEvents(this);
		display = new FlashDisplay(this);
		loader = new FlashLoader(this);
		mouse = new FlashMouse(this);
		geom = new FlashGeom(this);
		filters = new FlashFilters(this);
		text = new FlashText(this);
		system = new FlashSystem(this);
		sec: ISecurityDomain;

		init(sec: ISecurityDomain) {
			this.sec = sec;
			this.display.init();
			this.mouse.init();
			this.geom.init();
			this.filters.init();
			this.text.init();
			this.system.init();
		}

		static get(sec: ISecurityDomain) {
			if (!sec) {
				return FlashContext._current;
			}
			if (!sec.context) {
				sec.context = new FlashContext();
				sec.context.init(sec);

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
