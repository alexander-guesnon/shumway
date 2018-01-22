module Shumway.AVMX.AS.flash.statics {
	import MapObject = Shumway.MapObject;
	import assert = Shumway.Debug.assert;
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
		utils = new FlashUtils(this);
		sec: ISecurityDomain;

		init(sec: ISecurityDomain) {
			this.sec = sec;
			this.display.init();
			this.mouse.init();
			this.geom.init();
			this.filters.init();
			this.text.init();
			this.system.init();
			this.utils.init();
		}

		_broadcastFrameEvent(type: string): void {
			let event = this.events.getBroadcastInstance(type);
			this.events.broadcastEventDispatchQueue.dispatchEvent(event);
		}
	}
}

module Shumway.Flash {
	import FlashContext = AVMX.AS.flash.statics.FlashContext;

	export function get(sec: ISecurityDomain) {
		if (!sec) {
			return _current;
		}
		if (!sec.context) {
			sec.context = new FlashContext();
			sec.context.init(sec);

			_current = sec.context;
		}
		return sec.context;
	}

	let _current: FlashContext = null;
	let _stack: Array<FlashContext> = [];

	export function current() {
		return _current;
	}
}
