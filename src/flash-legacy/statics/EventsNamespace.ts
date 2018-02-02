module Shumway.flash.system {
	import assert = Shumway.Debug.assert;
	import Event = events.Event;

	export class EventsNamespace extends LegacyNamespace {
		constructor() {
			super();
		}

		Event = new LegacyClass<Event>(Event);
		ErrorEvent = new LegacyClass<events.ErrorEvent>(events.ErrorEvent);
		AsyncErrorEvent = new LegacyClass<events.AsyncErrorEvent>(events.AsyncErrorEvent);
		ProgressEvent = new LegacyClass<events.ProgressEvent>(events.ProgressEvent);
		StatusEvent = new LegacyClass<events.StatusEvent>(events.StatusEvent);
		GestureEvent = new LegacyClass<events.GestureEvent>(events.GestureEvent);
		KeyboardEvent = new LegacyClass<events.KeyboardEvent>(events.KeyboardEvent);
		TextEvent = new LegacyClass<events.KeyboardEvent>(events.TextEvent);
		TimerEvent = new LegacyClass<events.KeyboardEvent>(events.TimerEvent);
		TouchEvent = new LegacyClass<events.TouchEvent>(events.TouchEvent);
		// UncaughtErrorEvent = new LegacyClass<events.UncaughtErrorEvent>(events.UncaughtErrorEvent);
		NetStatusEvent = new LegacyClass<events.NetStatusEvent>(events.NetStatusEvent);
		HTTPStatusEvent = new LegacyClass<events.HTTPStatusEvent>(events.HTTPStatusEvent);
		IOErrorEvent = new LegacyClass<events.IOErrorEvent>(events.IOErrorEvent);

		_instances = ObjectUtilities.createMap<Event>();

		getInstance(type: string, bubbles: boolean = false, cancelable: boolean = false): Event {
			let instance = this._instances[type];
			if (!instance) {
				instance = this.Event.create([type, bubbles, cancelable]);
				this._instances[type] = instance;
			}
			instance._bubbles = bubbles;
			instance._cancelable = cancelable;
			return instance;
		}

		getBroadcastInstance(type: string, bubbles: boolean = false, cancelable: boolean = false): Event {
			let instance = this._instances[type];
			if (!instance) {
				instance = this.Event.create([type, bubbles, cancelable]);
				this._instances[type] = instance;
				// Some events are documented as broadcast event in the AS3 docs. We can't set |_isBroadcastEvent| flag in the
				// constructor because if you create custom events with these types they do capture and bubble.
				release || assert(Event.isBroadcastEventType(type));
			}
			instance._isBroadcastEvent = true;
			instance._bubbles = bubbles;
			instance._cancelable = cancelable;
			return instance;
		}

		broadcastEventDispatchQueue = new flash.events.BroadcastEventDispatchQueue();
	}
}
