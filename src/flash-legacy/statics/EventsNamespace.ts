module Shumway.flash.statics {
	export class EventsNamespace extends LegacyNamespace {
		constructor() {
			super();
		}

		Event = new LegacyClass<events.Event>(events.Event);
		ProgressEvent = new LegacyClass<events.ProgressEvent>(events.ProgressEvent);
	}
}
