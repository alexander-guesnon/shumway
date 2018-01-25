module Shumway.flash.statics {
	export class EventsNamespace extends LegacyNamespace {
		constructor() {
			super();
		}

		Event = new LegacyClass<flash.events.Event>(flash.events.Event);
	}
}
